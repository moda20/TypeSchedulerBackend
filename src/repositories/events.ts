import { prisma } from "@initialization/index";
import { JobEventTypes, JobEventTypesArray } from "@typesDef/models/job";
import dayjs from "dayjs";

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

export const setAllEventsToHandled = async ({ jobId }: { jobId?: number }) => {
  return prisma.job_event_log.updateMany({
    where: {
      handled_on: null,
      ...(jobId
        ? {
            job_log_id: {
              startsWith: `${jobId}-`,
            },
          }
        : {}),
    },
    data: {
      handled_on: new Date(),
    },
  });
};

export const getEventsTimeline = async (
  period: number = 60,
  startDate?: Date,
  endDate?: Date,
) => {
  const query = `SELECT 
    FROM_UNIXTIME(FLOOR(UNIX_TIMESTAMP(created_at) / (${period} * 60)) * (${period} * 60)) AS period,
    COUNT(*) AS events,
    SUM(CASE WHEN type = 'ERROR' THEN 1 ELSE 0 END) AS errors,
    SUM(CASE WHEN type = 'WARNING' THEN 1 ELSE 0 END) AS warnings,
    SUM(CASE WHEN type = 'INFO' THEN 1 ELSE 0 END) AS info
    FROM job_event_log
           ${startDate ? `WHERE created_at >= "${dayjs(startDate).format("YYYY-MM-DD HH:mm:ss")}"` : ""}
      ${endDate ? `AND created_at <= "${dayjs(endDate).format("YYYY-MM-DD HH:mm:ss")}"` : ""}
    GROUP BY period
    ORDER BY period ASC;`;

  return prisma.$queryRawUnsafe<any[]>(query);
};

export const getEventsPerJob = async (
  jobIds?: number[],
  startDate?: Date,
  endDate?: Date,
  events: JobEventTypes[] = JobEventTypesArray,
  limit?: number,
  offset?: number,
  sort?: { id: string; desc: string }[],
) => {
  const subQuery = `SELECT SUBSTRING_INDEX(job_log_id, '-', 1) AS job_id,
                           COUNT(*) AS events,
                           ${events
                             .map(
                               (e) =>
                                 `SUM(CASE WHEN type = '${e}' THEN 1 ELSE 0 END) AS ${e}`,
                             )
                             .join(",")}
                    FROM job_event_log
                        WHERE handled_on IS NULL
                        ${startDate ? `AND created_at >= "${dayjs(startDate).format("YYYY-MM-DD HH:mm:ss")}"` : ""}
                        ${endDate ? `AND created_at <= "${dayjs(endDate).format("YYYY-MM-DD HH:mm:ss")}"` : ""}
                    GROUP BY job_id
                        ${jobIds ? `having job_id in (${jobIds.map((e) => "'" + e + "'").join(",")})` : ""}
                    ORDER BY ${sort ? `${sort[0]?.id} ${sort[0]?.desc === "true" ? "DESC" : "ASC"}` : "events DESC"}`;

  const totalQuery = `SELECT COUNT(*) as total FROM (
        ${subQuery}
    ) as eventsList `;

  const query = `SELECT * from (
        ${subQuery}
        ${limit ? `LIMIT ${limit}` : ""}
        ${offset ? `OFFSET ${offset}` : ""}
    ) as eventsList join schedule_job on eventsList.job_id = schedule_job.job_id `;

  const [data, total] = await Promise.all([
    prisma.$queryRawUnsafe<any[]>(query),
    prisma.$queryRawUnsafe<any[]>(totalQuery),
  ]);

  return {
    data,
    total: total[0]?.total,
  };
};
