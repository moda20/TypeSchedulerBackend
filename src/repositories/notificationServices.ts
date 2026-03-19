import config from "@config/config";
import {
  removeConfig,
  updateConfig,
  updateObjectConfig,
} from "@config/config.service";
import { basePrisma, prisma } from "@initialization/index";
import { PrismaClient } from "@prisma/client";
import { getAllJobs, isJobRunning, updateJobConfig } from "@repositories/jobs";
import { jobUpdateConfig } from "@typesDef/models/job";
import { NewNotificationService } from "@typesDef/models/notificationService";
import {
  extractedServiceConfiguration,
  JobEventNotificationConfigAPISchemaType,
} from "@typesDef/notifications";
import { APIError } from "@utils/ErrorHandler";
import {
  deletePublicImage,
  resolveFilePath,
  savePublicImage,
} from "@utils/fileUtils";
import { findFiles } from "@utils/jobUtils";
import logger from "@utils/loggers";
import { forceToArray } from "@utils/socketUtils";
import { parseJsDoc } from "@utils/typeUtils";
import { join, parse } from "path";
import safe from "safe-regex";
import { ScheduleJobManager } from "schedule-manager";
import ts from "typescript";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

export const REPO_NAME = "Notification services";
export const getAllNotificationServices = async ({
  limit,
  offset,
  searchQuery,
  inputIds,
}: {
  limit?: number;
  offset?: number;
  searchQuery?: string;
  inputIds?: number[];
}) => {
  const searchConfig: any = {};

  if (searchQuery) {
    searchConfig.OR = [
      {
        name: { contains: searchQuery },
      },
      {
        description: { contains: searchQuery },
      },
    ];
  }
  if (inputIds) {
    searchConfig.id = {
      in: inputIds,
    };
  }
  const [data, count] = await Promise.all([
    basePrisma.notificationServices.findMany({
      take: limit,
      skip: offset,
      where: searchConfig,
    }),
    basePrisma.notificationServices.count({
      where: searchConfig,
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

export const verifyIfNotificationServiceCanBeDeleted = async (id: number) => {
  const targetService = await getNotificationService(Number(id));
  if (!targetService) throw new APIError("Service not found", REPO_NAME);
  const defaultService = config.get("notifications.defaultService");
  if (targetService.name === defaultService)
    throw new APIError(
      "Cannot delete default service. Change the default service via the config API",
      REPO_NAME,
    );
  return true;
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
  const runningJobs = await Promise.all(
    allJobs.map(async (j) => await isJobRunning(j.id!)),
  );
  if (runningJobs.some((e) => e)) {
    throw new APIError(
      "Cannot detach service while some attached jobs are running",
      REPO_NAME,
    );
  }
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
        ? !config.safeGet(`notifications.${name}.${key}`, null)
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

export const cloneNotificationService = async (
  serviceId: number,
  name: string,
  userId: number,
) => {
  const existingService = await getNotificationService(serviceId);
  if (!existingService) {
    throw new APIError(`Service ${serviceId} not found`, REPO_NAME);
  }
  const safeName = name.replace(/\s/g, "-");
  return basePrisma.$transaction(async (tx) => {
    let newImagePath = existingService.image || undefined;

    if (existingService.image) {
      const existingImage = Bun.file(
        resolveFilePath(join("..", existingService.image)),
      );
      newImagePath = await savePublicImage({
        filename: `${safeName}_${parse(existingService.image).base}`,
        data: await existingImage.arrayBuffer(),
        unique: true,
      });
    }

    return addNotificationService(
      {
        name: safeName,
        description: existingService.description,
        entryPoint: existingService.entryPoint,
        image: newImagePath,
      },
      tx,
    ).then((newService) => {
      return InitializeServiceConfig(
        safeName,
        existingService.entryPoint,
        Number(userId),
      ).then(() => newService);
    });
  });
};

export const addOrUpdateJobEventHandler = async ({
  jobId,
  handler,
}: {
  handler: JobEventNotificationConfigAPISchemaType;
  jobId: number;
}) => {
  const { job } = await ScheduleJobManager.getJobById(jobId);
  if (!job) {
    throw new APIError("Job not found", REPO_NAME);
  }
  const service = await getNotificationService(handler.notification_service_id);
  if (!service) {
    throw new APIError("Service not found", REPO_NAME);
  }
  if (handler.regex) {
    if (!safe(handler.regex)) {
      throw new APIError("Provided RegEx is not valid or not safe", REPO_NAME);
    }
  }
  const jobParams = JSON.parse(job.param || "{}");
  if (typeof jobParams !== "object") {
    throw new APIError(
      "Job param is not an object, update the params first to be an object in order to save event handlers",
      REPO_NAME,
    );
  }
  if (handler.config_id) {
    const existingService = jobParams.eventHandlers?.findIndex(
      (e: any) => String(e.config_id) === String(handler.config_id),
    );
    if (existingService === undefined || existingService === -1) {
      throw new APIError("Event handler not found", REPO_NAME);
    } else {
      jobParams.eventHandlers[existingService] = handler;
    }
  } else {
    handler.config_id = uuidv4();
    if (jobParams.eventHandlers) {
      jobParams.eventHandlers.push(handler);
    } else {
      jobParams.eventHandlers = [handler];
    }
  }

  return updateJobConfig(String(job.id), {
    param: JSON.stringify(jobParams),
  } as jobUpdateConfig)
    .then((jobUpdated) => {
      if (!jobUpdated || !jobUpdated.success) {
        logger.error(jobUpdated);
        throw jobUpdated?.err;
      }
    })
    .catch((err) => {
      logger.error(`Job event handler update failed for job ${job.id}`);
      logger.error(err);
      throw new APIError(
        "Job event handler update failed, check logs for more info",
        REPO_NAME,
      );
    });
};

export const deleteJobEventHandler = async ({
  jobId,
  configId,
}: {
  jobId: number;
  configId: string;
}) => {
  const { job } = await ScheduleJobManager.getJobById(jobId);
  if (!job) {
    throw new APIError("Job not found", REPO_NAME);
  }
  const jobParams = JSON.parse(job.param || "{}");
  const targetHandler = jobParams.eventHandlers?.findIndex(
    (e: any) => e.config_id === configId,
  );

  if (targetHandler === undefined || targetHandler === -1) {
    throw new APIError("Event handler not found", REPO_NAME);
  }

  // deletion is just removing from the array
  jobParams.eventHandlers.splice(targetHandler, 1);

  return updateJobConfig(String(job.id), {
    param: JSON.stringify(jobParams),
  } as jobUpdateConfig)
    .then((jobUpdated) => {
      if (!jobUpdated || !jobUpdated.success) {
        logger.error(jobUpdated);
        throw jobUpdated?.err;
      }
    })
    .catch((err) => {
      logger.error(`Job event handler update failed for job ${job.id}`);
      logger.error(err);
      throw new APIError(
        "Job event handler update failed, check logs for more info",
        REPO_NAME,
      );
    });
};

export const getAllGlobalEventHandlers = () => {
  const configs: any = config.safeGet("notifications.eventHandlers", {});
  return Object.values(configs)
    .filter((e: any) => e["config-id"])
    .map((cfg: any) => {
      return {
        config_id: cfg["config-id"],
        notification_type: forceToArray(cfg["notification-type"]),
        trigger: cfg.trigger,
        notification_service_id: cfg["notification-service-id"],
        regex: cfg.regex,
        durationThreshold: cfg.durationThreshold,
      };
    });
};

export const addOrUpdateGlobalEventHandler = async ({
  configId,
  handler,
  userId,
}: {
  handler: JobEventNotificationConfigAPISchemaType;
  configId?: string;
  userId: number;
}) => {
  try {
    const service = await getNotificationService(
      handler.notification_service_id,
    );
    if (!service) {
      throw new APIError("Service not found", REPO_NAME);
    }
    if (handler.regex) {
      if (!safe(handler.regex)) {
        throw new APIError(
          "Provided RegEx is not valid or not safe",
          REPO_NAME,
        );
      }
    }
    if (configId) {
      if (configId !== handler.config_id) {
        throw new APIError("Config ids does not match", REPO_NAME);
      }
      const existingService = config.safeGet(
        `notifications.eventHandlers.${configId}`,
        null,
      );
      if (!existingService) {
        throw new APIError("Event handler not found", REPO_NAME);
      } else {
        return await updateObjectConfig(
          `notifications.eventHandlers.${configId}`,
          {
            "config-id": handler.config_id,
            "notification-type": handler.notification_type,
            trigger: handler.trigger,
            "notification-service-id": handler.notification_service_id,
            regex: handler.regex,
            durationThreshold: handler.durationThreshold,
          },
          userId,
        );
      }
    } else {
      handler.config_id = uuidv4();
      // switching to - for attributes keys to not confused the DB config key separator
      return await updateObjectConfig(
        `notifications.eventHandlers.${handler.config_id}`,
        {
          "config-id": handler.config_id,
          "notification-type": handler.notification_type,
          trigger: handler.trigger,
          "notification-service-id": handler.notification_service_id,
          regex: handler.regex,
          durationThreshold: handler.durationThreshold,
        },
        userId,
      );
    }
  } catch (err) {
    logger.error(err);
    throw new APIError("Error while updating global event handler", REPO_NAME);
  }
};

// TODO: validate the choice where deleted eventHandlers should or shouldn't be used by running jobs
export const deleteGlobalEventHandler = async ({
  configId,
  userId,
}: {
  configId: string;
  userId: number;
}) => {
  try {
    const targetConfig = config.safeGet(
      `notifications.eventHandlers.${configId}`,
      null,
    );
    if (!targetConfig) throw new APIError("Event handler not found", REPO_NAME);

    // TODO see if this warrants a prisma transaction
    await Promise.all(
      Object.keys(targetConfig).map((key) => {
        return removeConfig(
          `notifications.eventHandlers.${configId}.${key}`,
          userId,
        );
      }),
    );
    return true;
  } catch (err) {
    logger.error(err);
    throw new APIError("Error while deleting global event handler", REPO_NAME);
  }
};
