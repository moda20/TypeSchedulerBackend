import config from "@config/config";
import { prisma } from "@initialization/index";
import {
  deleteJobStartAndEndActions,
  fullStartAJob,
  onJobFinished,
  registerJobStartAndEndActions,
  registerSingularJobStartAndEndActions,
  saveJobLogs,
  unsubscribeFromAllLogs,
} from "@initialization/jobsManager";
import {
  advancedFilters,
  getAllJobsInputs,
  queuedJobsExecutionConfig,
} from "@typesDef/api/jobs";
import {
  jobActions,
  JobDTOClass,
  jobFilteringAttributeMap,
  jobModelAttributeMap,
  JobStats,
  jobStatus,
  jobUpdateConfig,
} from "@typesDef/models/job";
import currentRunsManager from "@utils/CurrentRunsManager";
import { lokiHttpService } from "@utils/httpRequestConfig";
import {
  findFiles,
  getNextJobExecution,
  parseTypedValueToPrismaValue,
} from "@utils/jobUtils";
import logger from "@utils/loggers";
import { JobQueue } from "@utils/queueUtils";
import dayjs from "dayjs";
import { join } from "path";
import manager from "schedule-manager";
const { ScheduleJobManager } = manager;

export const getFilteredJobs = async (filters: advancedFilters) => {
  const regexTypes = (
    Object.keys(filters) as Array<keyof advancedFilters>
  ).filter((e: keyof advancedFilters) => (filters[e] as any)?.type === "regex");

  const jobIds = regexTypes.length
    ? await prisma.$queryRawUnsafe<{ job_id: number }[]>(
        `SELECT job_id from schedule_job WHERE ${regexTypes.map((e) => `${jobModelAttributeMap[e]} REGEXP '${(filters[e] as any)?.value}'`).join(" AND ")} `,
      )
    : undefined;
  const nonRegexFilters: advancedFilters = Object.fromEntries(
    (Object.keys(filters) as Array<keyof advancedFilters>)
      .filter(
        (e: keyof advancedFilters) =>
          !["sorting", "status", "latestRun"].includes(e) &&
          typeof filters[e] === "object" &&
          (filters[e] as any)?.type !== "regex",
      )
      .map((e) => [e, filters[e]]),
  );

  return getAllJobs({
    limit: 999999,
    offset: 0,
    jobIds: jobIds?.map((e) => e.job_id),
    advancedFilters: nonRegexFilters,
    latestRun: filters.latestRun,
    status: filters.status || ["STARTED", "STOPPED"],
    name: "",
    sort: filters.sorting || [],
  });
};
export const getAllJobs = async ({
  limit,
  offset,
  name,
  status,
  latestRun,
  sort,
  jobIds,
  advancedFilters,
}: getAllJobsInputs) => {
  const parsedAdvancedFilters =
    (advancedFilters &&
      Object.fromEntries(
        Object.keys(advancedFilters).map((e) => [
          jobModelAttributeMap[e],
          parseTypedValueToPrismaValue(
            jobModelAttributeMap[e],
            advancedFilters[e as keyof advancedFilters],
          )[jobModelAttributeMap[e]],
        ]),
      )) ??
    [];
  logger.debug(`advancedFilters: ${JSON.stringify(advancedFilters, null, 4)}`);
  logger.debug(`inputJobIds ${jobIds}`);
  const allJobs = await prisma.schedule_job.findMany({
    take: limit,
    skip: offset,
    where: {
      OR: [
        {
          job_name: {
            contains: name,
          },
        },
        {
          consumer: {
            contains: name,
          },
        },
      ],
      status: {
        in: status || advancedFilters?.status,
      },
      job_id: {
        in: jobIds,
      },
      job_logs: {
        every: {
          ...parseTypedValueToPrismaValue("start_time", latestRun, true),
        },
        ...(latestRun ? { some: {} } : {}),
      },
      ...parsedAdvancedFilters,
    },
    orderBy: sort
      ?.filter((e) => jobFilteringAttributeMap[e.id])
      .map((e) => ({
        [jobFilteringAttributeMap[e.id]]: e.desc === "true" ? "desc" : "asc",
      })),
    include: {
      job_logs: {
        take: 1,
        orderBy: {
          start_time: "desc",
        },
      },
    },
  });
  const mappedJobs = allJobs.map((job) => {
    const nj = new JobDTOClass(job);
    nj.setInitialized(currentRunsManager.isInitialized(nj));
    nj.setIsCurrentlyRunning(currentRunsManager.isRunning(nj));
    nj.latestRun = nj.jobLogs?.[0];
    return nj;
  });
  const parsedSort = sort.reduce(
    (p, c) => {
      return { ...p, [c.id]: c.desc };
    },
    {} as Record<string, string>,
  );
  if (parsedSort?.cronSetting) {
    mappedJobs.sort((a, b) => {
      const nextA = getNextJobExecution(a.cronSetting);
      const nextB = getNextJobExecution(b.cronSetting);

      if (nextA && nextB) {
        return (
          (parsedSort?.cromSetting === "false" ? -1 : 1) * nextA.getTime() -
          nextB.getTime()
        );
      }
      return 0;
    });
  }
  if (parsedSort?.isCurrentlyRunning) {
    mappedJobs.sort((a, b) => {
      return (
        (parsedSort?.isCurrentlyRunning === "false" ? 1 : -1) *
        (Number(a.isCurrentlyRunning) - Number(b.isCurrentlyRunning))
      );
    });
  }
  if (parsedSort.latestRun) {
    mappedJobs.sort((a, b) => {
      return (
        (parsedSort?.latestRun === "false" ? -1 : 1) *
          a.latestRun?.start_time?.getTime() -
        b.latestRun?.start_time?.getTime()
      );
    });
  }
  if (parsedSort.scheduled) {
    mappedJobs.sort((a) => {
      const sortOrder = parsedSort?.scheduled === "false" ? -1 : 1;
      return a.status === "STARTED" ? sortOrder : -sortOrder;
    });
  }
  return mappedJobs;
};

export const updateJobStatus = async (id: number, newStatus: string) => {
  const { job } = await ScheduleJobManager.getJobById(id);
  if (job) {
    job.setStatus(newStatus);
    return await ScheduleJobManager.updateJob(id, job);
  }
};

export const updateJobConfig = async (
  id: string,
  newConfig?: jobUpdateConfig,
) => {
  const { job } = await ScheduleJobManager.getJobById(Number(id));
  if (job) {
    const cronSettingChanged = newConfig?.cronSetting !== job?.getCronSetting();
    job.setCronSetting(newConfig?.cronSetting ?? job?.getCronSetting());
    job.setName(newConfig?.name ?? job?.getName());
    job.setParam(newConfig?.param ?? job?.getParam());
    job.setConsumer(newConfig?.consumer ?? job?.getConsumer());
    return await ScheduleJobManager.updateJob(Number(id), job).then(() => {
      if (cronSettingChanged) {
        refreshJobRegistration(Number(id));
      }
      return { success: true };
    });
  }
};

export const refreshJobRegistration = async (id: number | number[]) => {
  const targetJobIds = Array.isArray(id) ? id : [id];
  return await Promise.all(
    targetJobIds.map((id) => {
      return Promise.resolve(ScheduleJobManager.stopJobById(id))
        .then(() => {
          return unsubscribeFromAllLogs(id);
        })
        .then((f) => {
          return ScheduleJobManager.getJobById(id);
        })
        .then((jobDetails) => {
          if (!jobDetails.job) {
            throw "Job not found";
          }
          return fullStartAJob(jobDetails.job);
        });
    }),
  );
};

export const jobActionExecution = async (
  action: string,
  id: number,
  { config }: { config?: jobUpdateConfig },
) => {
  switch (action) {
    case jobActions.START: {
      return ScheduleJobManager.startJobById(id).then((d: any) => {
        if (d.success) {
          return ScheduleJobManager.getJobById(id)
            .then((jobDetails: any) => {
              registerJobStartAndEndActions(jobDetails.job);
              return Promise.resolve(true);
            })
            .then(() => updateJobStatus(id, "STARTED"));
        }
        throw new Error("Error when starting Job", {
          cause: d,
        });
      });
    }
    case jobActions.STOP: {
      // must stop logs event when stopping the cron job
      return Promise.resolve(ScheduleJobManager.stopJobById(id))
        .then(() => updateJobStatus(id, "STOPPED"))
        .then(() => unsubscribeFromAllLogs(id))
        .catch((err) => {
          logger.error(err);
          throw "Error when stopping Job";
        });
    }
    case jobActions.SOFT_DELETE: {
      return ScheduleJobManager.getJobById(id)
        .then((res) => {
          if (res.job) {
            return deleteJobStartAndEndActions(res.job);
          }
          throw new Error("Job not found", { cause: res });
        })
        .then(() => {
          return ScheduleJobManager.softDeleteJob(id).then(
            (d: { success: boolean }) => {
              if (d.success) {
                return d;
              } else {
                throw "Error when soft deleting Job";
              }
            },
          );
        });
    }
    case jobActions.CREATE: {
      if (!config) {
        throw "No config provided";
      }
      return ScheduleJobManager.newJob(
        config.name,
        config.cronSetting,
        config.param,
        config.consumer,
        true,
        jobStatus.STOPPED,
      ).then((d) => {
        if (d.success && d.job) {
          return registerJobStartAndEndActions(d.job);
        }
        throw new Error("Error when creating Job", {
          cause: d,
        });
      });
    }
    case jobActions.EXECUTE:
    case jobActions.EXECUTE_WITH_PARAMS: {
      return ScheduleJobManager.jobRegistration(id, {
        singular: true,
        extraParams: config?.param && JSON.parse(config.param),
      }).then((registrationData) => {
        if (!registrationData.success) {
          throw new Error("Error when registering job", {
            cause: registrationData,
          });
        }

        return ScheduleJobManager.getJobById(id).then((jobData) => {
          if (!jobData.job)
            throw new Error("Job not found", { cause: jobData });
          jobData.job.setUniqueSingularId(registrationData.uniqueSingularId!);
          registerSingularJobStartAndEndActions(jobData.job);
          saveJobLogs(
            registrationData.uniqueSingularId!,
            jobData.job?.getName(),
          );
          return registrationData;
        });
      });
    }
    case jobActions.UPDATE: {
      if (!config) {
        throw "No config provided";
      }
      return updateJobConfig(id.toString(), config);
    }
    case jobActions.REFRESH: {
      return refreshJobRegistration(id);
    }
  }
};

export const queueJobExecution = async (
  execConfig: queuedJobsExecutionConfig,
) => {
  const newQueue = new JobQueue(execConfig);
  const jobList = await getAllJobs({
    limit: 999999,
    offset: 0,
    jobIds: execConfig.targetJobs,
    sort: [{ id: execConfig.executionOrderAttribute ?? "id", desc: "false" }],
    name: "",
    status: ["STOPPED", "STARTED"],
  });
  const taskList = jobList.map((e) => {
    return () =>
      jobActionExecution(jobActions.EXECUTE, Number(e.id), {}).then(
        (registrationData: any) => {
          const eventTargetId = `${e.getName()}_${registrationData.uniqueSingularId!}`;
          return onJobFinished(eventTargetId);
        },
      );
  });
  logger.info(`will enqueue ${taskList.length} jobs`);
  newQueue.splitToBatches(taskList);
  await newQueue.enqueueNextBatch();
  return newQueue;
};

export const getJobRuns = async ({
  jobId,
  limit,
  offset,
}: {
  jobId: string;
  limit?: number;
  offset?: number;
}) => {
  const [jobRuns, count] = await Promise.all([
    prisma.schedule_job_log.findMany({
      where: {
        job_id: Number(jobId),
      },
      take: limit,
      skip: offset,
      orderBy: {
        start_time: "desc",
      },
    }),
    prisma.schedule_job_log.count({
      where: {
        job_id: Number(jobId),
      },
    }),
  ]);
  return {
    data: jobRuns,
    total: count,
  };
};

export const getAvailableConsumers = async () => {
  const targetPath = join("src/jobs", config.get("jobs.targetFolderForJobs"));
  return findFiles(
    targetPath,
    config.get("jobs.jobsFileExtensions").split(","),
  );
};

export const isJobRunning = async (jobId: number) => {
  const { job } = await ScheduleJobManager.getJobById(jobId);
  if (job) {
    return currentRunsManager.isRunning(job);
  }
  return false;
};

export const getJobStats = async (startDate?: Date, endDate?: Date) => {
  const query = `
        SELECT DATE(start_time)                                                                                AS date,
               IFNULL(AVG(CASE WHEN end_time IS NOT NULL THEN TIMESTAMPDIFF(SECOND, start_time, end_time) ELSE 0 END),
                      0) / 60                                                                                  AS average_duration,
               SUM(CASE WHEN end_time IS NOT NULL THEN 1 ELSE 0 END)                                           AS total_runs,
               SUM(CASE WHEN end_time IS NOT NULL THEN TIMESTAMPDIFF(SECOND, start_time, end_time) ELSE 0
                   END) / 60                                                                                   AS total_runtime,
               SUM(CASE WHEN job_log_id LIKE '%singular%' THEN 1 ELSE 0 END)                                   AS singular_run_count,
               SUM(CASE WHEN error IS NOT NULL THEN 1 ELSE 0 END)                                          AS error_count
        FROM schedule_job_log
        ${startDate ? `WHERE start_time >= "${dayjs(startDate).format("YYYY-MM-DD HH:mm:ss")}"` : ""}
        ${endDate ? `AND start_time <= "${dayjs(endDate).format("YYYY-MM-DD HH:mm:ss")}"` : ""}
        GROUP BY date
        ORDER BY date;
    `;

  return prisma.$queryRawUnsafe<JobStats[]>(query);
};

export const getJobMetrics = async (jobIds?: number[]) => {
  const query = `
        SELECT
            COUNT(DISTINCT(job_id)) as job_count,
            SUM(CASE WHEN status = 'STARTED' THEN 1 ELSE 0 END) as running_jobs_count
        FROM schedule_job
                 ${jobIds ? `WHERE job_id IN (${jobIds?.map((e) => `'${e}'`).join(",")})` : ""}
    `;

  return prisma.$queryRawUnsafe<JobStats[]>(query);
};

export const getLokiLogs = (query: string, start?: number, end?: number) => {
  return lokiHttpService.get("/loki/api/v1/query_range", {
    params: {
      start,
      query,
      end,
      limit: 5000,
    },
  });
};

export const getRunningJobs = () => {
  return {
    count: currentRunsManager.getRunningJobCount(),
  };
};
