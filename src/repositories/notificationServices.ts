import config from "@config/config";
import { basePrisma, prisma } from "@initialization/index";
import { getAllJobs } from "@repositories/jobs";
import { NewNotificationService } from "@typesDef/models/notificationService";
import { deletePublicImage } from "@utils/fileUtils";
import { findFiles } from "@utils/jobUtils";
import logger from "@utils/loggers";
import { join } from "path";

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

export const addNotificationService = async ({
  name,
  description,
  entryPoint,
  image,
}: NewNotificationService) => {
  return basePrisma.notificationServices.create({
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
  const existingServices = await basePrisma.notificationServices.findMany({
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
        console.log(err);
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
