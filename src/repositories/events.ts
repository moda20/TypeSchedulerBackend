import { job_event_log, schedule_job_log } from "@generated/prisma";
import { prisma } from "@initialization/index";
import { JobEventTypes } from "@typesDef/models/job";

export const getEvents = async ({
  type,
  job_log_id,
  offset,
  limit,
  unhandled,
  dateFrom,
  dateTo,
  job_id,
}: {
  limit?: number;
  offset?: number;
  search?: string;
  job_log_id?: string;
  type?: string[];
  unhandled?: boolean;
  dateFrom?: string;
  dateTo?: string;
  job_id?: string[];
}) => {
  const eventFilterObject = {
    type: {
      in: type,
    },
    ...(job_id
      ? {
          OR: job_id?.map((jd) => ({
            job_log_id: job_id
              ? {
                  startsWith: `${jd}-`,
                }
              : job_log_id,
          })),
        }
      : {
          job_log_id: job_log_id,
        }),
    ...(unhandled ? { handled_on: { equals: null } } : {}),
    created_at: {
      gte: dateFrom,
      lte: dateTo,
    },
  };
  const [data, count] = await Promise.all([
    prisma.job_event_log.findMany({
      where: eventFilterObject,
      take: limit,
      skip: offset,
      orderBy: {
        created_at: "desc",
      },
    }),
    prisma.job_event_log.count({
      where: eventFilterObject,
    }),
  ]);

  return {
    data: data,
    total: count,
  };
};

// TODO This needs a rework using the main event reading function
export const getAllPendingJobEvents = async ({
  type,
  jobId,
  offset,
  limit,
  unhandled,
}: {
  limit?: number;
  offset?: number;
  search?: string;
  jobId?: number[];
  type?: string[];
  unhandled?: boolean;
}) => {
  const eventFilterObject = {
    type: {
      in: type,
    },
    ...(jobId
      ? {
          OR: jobId?.map((jd) => ({
            job_log_id: jobId
              ? {
                  startsWith: `${jd}-`,
                }
              : jobId,
          })),
        }
      : {}),
    ...(unhandled ? { handled_on: { equals: null } } : {}),
  };
  const records = await prisma.job_event_log.groupBy({
    where: eventFilterObject,
    by: "type",
    _count: {
      id: true,
    },
  });

  const parsedRecords = records.reduce(
    (p, c) => {
      if (c.type === JobEventTypes.ERROR) {
        p.errors += c._count.id;
      }
      if (c.type === JobEventTypes.WARNING) {
        p.warnings += c._count.id;
      }
      return p;
    },
    {
      errors: 0,
      warnings: 0,
    },
  );

  return parsedRecords;
};
export const addEventLog = async ({
  type,
  job_log_id,
  event,
  message,
}: {
  type: string;
  job_log_id: string;
  event: string;
  message: string;
}) => {
  return prisma.job_event_log.create({
    data: {
      type,
      job_log_id,
      event,
      event_message: message,
    },
  });
};

export const setEventsToHandled = async ({
  ids,
}: {
  ids: (number | string)[];
}) => {
  return prisma.job_event_log.updateMany({
    where: {
      id: {
        in: ids.map(Number),
      },
    },
    data: {
      handled_on: new Date(),
    },
  });
};

export const setAllEventsToHandled = async () => {
  return prisma.job_event_log.updateMany({
    where: {
      handled_on: null,
    },
    data: {
      handled_on: new Date(),
    },
  });
};
