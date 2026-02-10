import config from "@config/config";
import { updateConfig } from "@config/config.service";
import { basePrisma, prisma } from "@initialization/index";
import { PrismaClient } from "@prisma/client";
import { getAllJobs } from "@repositories/jobs";
import { NewNotificationService } from "@typesDef/models/notificationService";
import { extractedServiceConfiguration } from "@typesDef/notifications";
import { APIError } from "@utils/ErrorHandler";
import { deletePublicImage, resolveFilePath } from "@utils/fileUtils";
import { findFiles } from "@utils/jobUtils";
import logger from "@utils/loggers";
import { parseJsDoc } from "@utils/typeUtils";
import { join } from "path";
import ts from "typescript";
import { z } from "zod";

export const REPO_NAME = "Notification services";
export const getAllNotificationServices = async ({
  limit,
  offset,
  searchQuery,
}: {
  limit?: number;
  offset?: number;
  searchQuery?: string;
}) => {
  const [data, count] = await Promise.all([
    basePrisma.notificationServices.findMany({
      take: limit,
      skip: offset,
      where: {
        ...(searchQuery && {
          OR: [
            {
              name: { contains: searchQuery },
            },
            {
              description: { contains: searchQuery },
            },
          ],
        }),
      },
    }),
    basePrisma.notificationServices.count({
      where: {
        ...(searchQuery && {
          OR: [
            {
              name: { contains: searchQuery },
            },
            {
              description: { contains: searchQuery },
            },
          ],
        }),
      },
    }),
  ]);
  return {
    data,
    total: count,
  };
};

export const getNotificationService = (id: number, name?: string) => {
  const searchObject = name ? { name } : { id };
  return basePrisma.notificationServices.findUnique({
    where: searchObject,
  });
};

export const addNotificationService = async (
  { name, description, entryPoint, image }: NewNotificationService,
  prismaClient?: PrismaClient,
) => {
  const client = prismaClient ?? basePrisma;
  return client.notificationServices.create({
    data: {
      name,
      description,
      entryPoint,
      image,
    },
  });
};

export const updateNotificationService = async ({
  id,
  ...rest
}: NewNotificationService & { id: number }) => {
  return basePrisma.notificationServices.update({
    where: {
      id,
    },
    data: {
      ...rest,
    },
  });
};

export const deleteNotificationService = async (id: number) => {
  const targetService = await getNotificationService(Number(id));
  if (targetService?.image) {
    await deletePublicImage({
      filename: targetService.image,
    });
  }
  return basePrisma.notificationServices.delete({
    where: {
      id,
    },
  });
};

export const getAvailableExternalServices = async () => {
  const targetPath = join("src/external/userPlugins");
  return findFiles(
    targetPath,
    config.get("jobs.jobsFileExtensions").split(","),
  );
};

export const attachAServiceToJob = async (
  jobId: number | number[],
  serviceId: number | number[],
  basePrismaClient?: PrismaClient,
) => {
  const jobsArray = Array.isArray(jobId) ? jobId : [jobId];
  const jobs = await prisma.schedule_job.findMany({
    where: {
      job_id: {
        in: jobsArray,
      },
    },
  });
  if (!jobs.length) throw new Error("Jobs not found");
  const serviceArray = Array.isArray(serviceId) ? serviceId : [serviceId];
  const existingServices = await (
    basePrismaClient ?? basePrisma
  ).notificationServices.findMany({
    where: {
      id: {
        in: serviceArray,
      },
    },
  });
  if (!existingServices.length) throw new Error("No services found");
  await Promise.all(
    jobs.map((job) => {
      const jobParams = {
        ...JSON.parse(job.job_param || "{}"),
      };
      const notificationServicesArray = [
        ...(jobParams.notificationServices || []),
      ];
      serviceArray.forEach((newServiceId) => {
        if (!notificationServicesArray.includes(newServiceId)) {
          notificationServicesArray.push(newServiceId);
        }
      });
      jobParams.notificationServices = notificationServicesArray;
      return prisma.schedule_job.update({
        where: {
          job_id: job.job_id,
        },
        data: {
          job_param: JSON.stringify(jobParams),
        },
      });
    }),
  );
};

export const detachServiceFromAllJobs = async (serviceId: number) => {
  const allJobs = await getAllJobsForAService(serviceId);
  return await Promise.all(
    allJobs.map((job) => {
      const parsedParams = JSON.parse(job.param || "{}");
      parsedParams.notificationServices =
        parsedParams.notificationServices.filter(
          (e: string) => e !== serviceId.toString(),
        );
      return prisma.schedule_job.update({
        where: {
          job_id: job.id,
        },
        data: {
          job_param: JSON.stringify(parsedParams),
        },
      });
    }),
  ).then((data) => {
    logger.info(`Detached ${serviceId} from ${data.length} jobs`);
    return data;
  });
};
export const getAllJobsForAService = async (serviceId: number) => {
  const jobs = await prisma.schedule_job.findMany();
  const attachedJobs = jobs
    .map((j) => {
      try {
        return {
          notificationServices: JSON.parse(j.job_param || "{}")
            ?.notificationServices,
          job_id: j.job_id,
        };
      } catch (err) {
        logger.error(err);
        return { notificationServices: [], job_id: j.job_id };
      }
    })
    .filter((e) => e?.notificationServices?.includes(serviceId))
    .map((e) => Number(e.job_id));
  const fullJobsList = await getAllJobs({
    jobIds: attachedJobs,
    status: ["STARTED", "STOPPED"],
    sort: [],
    offset: 0,
    limit: 999999,
    name: "",
  });
  return fullJobsList;
};

export const extractServiceType = (entryPoint: string) => {
  const fullPath = resolveFilePath(join("..", entryPoint));
  const typeName = "InitConfigType";

  const program = ts.createProgram([fullPath], {
    target: ts.ScriptTarget.ESNext,
    module: ts.ModuleKind.CommonJS,
    strict: true,
  });
  program.getTypeChecker();
  const source = program.getSourceFile(fullPath);

  if (!source) {
    throw new APIError(`Could not find source file ${fullPath}`, REPO_NAME);
  }
  let targetNode: ts.TypeAliasDeclaration | undefined;

  ts.forEachChild(source, (node) => {
    if (ts.isTypeAliasDeclaration(node) && node.name.text === typeName) {
      targetNode = node;
    }
  });

  if (!targetNode)
    throw new APIError(
      `Type ${typeName} not found in the specified entry point`,
      REPO_NAME,
    );

  const result: extractedServiceConfiguration = {};

  const findPropertySignatures = (inputNode: ts.Node) => {
    if (ts.isPropertySignature(inputNode)) {
      const propName = inputNode.name.getText();
      const propType = inputNode.type?.getText() || "unknown";
      const jsDocComments = ts.getJSDocCommentsAndTags(inputNode);
      const jsDocText = jsDocComments
        .map((tag: ts.JSDoc | ts.JSDocTag) =>
          tag.comment && typeof tag.comment === "string"
            ? tag.comment.trim()
            : "",
        )
        .filter((text: string) => text)
        .join("\n");
      result[propName] = {
        type: propType,
        ...parseJsDoc(jsDocText),
      };
    }
    ts.forEachChild(inputNode, findPropertySignatures);
  };
  findPropertySignatures(targetNode.type);

  return result;
};

export const safeUpdateServiceConfig = async (
  inputConfig: extractedServiceConfiguration,
  name: string,
  userId: number,
  skipExistingEntries: boolean = true,
) => {
  const updated = [],
    skipped = [];
  for (const [key, value] of Object.entries(inputConfig)) {
    if (
      skipExistingEntries
        ? !config.get<any>(`notifications.${name}.${key}`)
        : true
    ) {
      const updateRes = await updateConfig(
        `notifications.${name}.${key}`,
        value.value ?? "",
        userId,
        value.meta?.sensitive,
      );
      if (updateRes) updated.push(key);
    } else {
      skipped.push(key);
      logger.warn(`Config ${key} already exists for service ${name}, skipping`);
    }
  }

  return {
    updated,
    skipped,
  };
};

export const InitializeServiceConfig = async (
  name: string,
  entryPoint: string,
  userId: number,
) => {
  const existingConfig = config.safeGet(`notifications.${name}`, null);
  if (existingConfig) {
    throw new APIError(
      `Service ${name} already exists choose a different name or delete the existing config`,
      REPO_NAME,
    );
  }
  const typeConfig = extractServiceType(entryPoint);

  return await safeUpdateServiceConfig(typeConfig, name, userId, true);
};

export const validateInputConfigAgainstSchema = (
  entryPoint: string,
  inputConfig: any,
  serviceName: string,
) => {
  const typeConfig = extractServiceType(entryPoint);
  const zodSchema = z
    .object(
      Object.fromEntries(
        Object.keys(typeConfig).map((key) => [
          key,
          z
            .object({
              value: z.string(),
            })
            .strict()
            .nullable()
            .optional(),
        ]),
      ),
    )
    .strict();
  const validationResult = zodSchema.safeParse(inputConfig);
  logger.info(
    `Validating config for service ${serviceName} ${validationResult.success ? "passed" : "failed"}`,
  );
  if (validationResult.success) {
    Object.keys(inputConfig).forEach((key) => {
      inputConfig[key].meta = typeConfig[key].meta;
    });
  } else {
    logger.debug(z.treeifyError(validationResult.error));
  }

  return validationResult;
};
