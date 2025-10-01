import { job_event_log, schedule_job_log } from "@generated/prisma";
import { prisma } from "@initialization/index";
import { JobEventTypes } from "@typesDef/models/job";

export const getEvents = async ({
  type,
  job_log_id,
  offset,
  limit,
  handled,
}: {
  limit?: number;
  offset?: number;
  search?: string;
  job_log_id?: string;
  type?: string;
  handled?: boolean;
}) => {
  const records = prisma.job_event_log.findMany({
    where: {
      type: type,
      job_log_id: job_log_id,
      handled_on: {
        ...(handled ? { not: null } : { equals: null }),
      },
    },
    take: limit,
    skip: offset,
  });

  return records;
};

export const getAllPendingJobEvents = async ({
  type,
  jobId,
  offset,
  limit,
  handled,
}: {
  limit?: number;
  offset?: number;
  search?: string;
  jobId?: number;
  type?: string;
  handled?: boolean;
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
              handled_on: {
                ...(handled ? { not: null } : { equals: null }),
              },
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
