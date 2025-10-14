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
  jobId?: number;
  type?: string;
  unhandled?: boolean;
}) => {
  const records = await prisma.schedule_job.findMany({
    where: {
      job_id: jobId,
      job_logs: {
        some: {
          events: {
            some: {},
          },
        },
      },
    },
    include: {
      job_logs: {
        include: {
          events: {
            where: {
              type: type,
              ...(unhandled ? { handled_on: { equals: null } } : {}),
            },
          },
        },
      },
    },
  });

  const parsedRecords = records.map((rec) => {
    const events = rec.job_logs.reduce(
      (p: any, c: any) => {
        c.events.forEach((ev: job_event_log) => {
          if (ev.type === JobEventTypes.ERROR) {
            p.errors.push(ev);
          }
          if (ev.type === JobEventTypes.WARNING) {
            p.warnings.push(ev);
          }
        });
        return p;
      },
      { errors: [] as job_event_log[], warnings: [] as job_event_log[] },
    );
    return {
      jobName: rec.job_name,
      jobId: rec.job_id,
      events: events,
    };
  });

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
