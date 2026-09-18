import { JobConsumer } from "@jobConsumer/jobConsumer";
import { jobEventLog, LogEventNames } from "@typesDef/api/jobs";
import { JobDTO, jobStatus } from "@typesDef/models/job";
import currentRunsManager from "@utils/CurrentRunsManager";
import { getCircularReplacer } from "@utils/jobUtils";
import logger, { eventLog, JobLogger } from "@utils/loggers";
import { fromEvent, Observable, take, tap } from "rxjs";
import schedulerManager from "schedule-manager";
const { ScheduleJobEventBus, ScheduleJobLogEventBus, ScheduleJobManager } =
  schedulerManager;

const startAllJobs = () => {
  return ScheduleJobManager.getJobsByStatus(["STOPPED", "STARTED"]).then(
    ({ jobs, err }) => {
      if (!jobs) {
        throw new Error("No jobs found", {
          cause: err,
        });
      }
      const jobStats = {
        startedJobs: 0,
        foundJobs: 0,
        errorStartingJobs: 0,
      };
      return Promise.all(
        jobs.map((job) => {
          jobStats.foundJobs++;
          if (job.getStats() === jobStatus.STARTED) {
            return fullStartAJob(job)
              .then((res) => {
                jobStats.startedJobs++;
                return res;
              })
              .catch((err) => {
                jobStats.errorStartingJobs++;
                return err;
              });
          } else {
            return Promise.resolve({
              name: job.name,
              result: null,
            });
          }
        }),
      ).then((jobResults) => {
        return {
          stats: jobStats,
          results: jobResults,
        };
      });
    },
  );
};

export const fullStartAJob = async (job: JobDTO) => {
  const d = await ScheduleJobManager.startJobById(job.getId()!);
  if (d.success && job.getId()) {
    registerJobStartAndEndActions(job);
    return saveJobLogs(job.getId()!.toString(), job.getName()).then(() => d);
  } else {
    logger.error("Error when starting Job");
    logger.error(d);
    const sysLog = eventLog(LogEventNames.SysLogEvent);
    sysLog.error(
      `Error when starting job ${job.getName()} ${JSON.stringify(d, getCircularReplacer(), 4)}`,
      {
        eventName: "JOB_START_ERROR",
      },
    );
    throw d;
  }
};

export const registerJobStartAndEndActions = (job: JobDTO) => {
  logger.info(`Registering jobs ${job.getName()}`);
  const eventTargetId = job.getName();
  if (currentRunsManager.isInitialized(job)) {
    return; // Already initialized;
  }
  const startSub = onJobStarted<JobDTO>(eventTargetId).subscribe(
    (startedJob) => {
      currentRunsManager.startJob(startedJob);
    },
  );
  const endSub = onJobFinished<JobDTO>(eventTargetId).subscribe((endedJob) => {
    currentRunsManager.endJob(endedJob);
  });
  currentRunsManager.initializeJob(eventTargetId, {
    startEventOff: () => startSub.unsubscribe(),
    endEventOff: () => endSub.unsubscribe(),
  });
};

export const registerSingularJobStartAndEndActions = (job: JobDTO) => {
  const eventTargetId = `${job.getName()}_${job.getUniqueSingularId()}`;
  logger.info(
    `Registering single job ${job.getName()} with id ${eventTargetId}`,
  );
  if (currentRunsManager.isInitialized(job, eventTargetId)) {
    return; // Already initialized;
  }
  const evenLogger = eventLog(LogEventNames.JobScheduleEvent);
  evenLogger.debug(`${jobEventLog.JOB_STARTED}: ${eventTargetId}`, {
    eventName: `scheduleJob:${eventTargetId}`,
  });
  currentRunsManager.startJob(job);
  onJobFinished<JobDTO>(eventTargetId, true).subscribe((endedJob) => {
    logger.trace(`Singular job completed ${job.getUniqueSingularId()!}`);
    currentRunsManager.endJob(endedJob);
    currentRunsManager.unInitializeJob(eventTargetId);
    // TODO figure out if deleting the logger manually is useful
  });
  currentRunsManager.initializeJob(eventTargetId);
};

export const onJobFinished = <T>(
  eventTargetId: string,
  once?: boolean,
): Observable<T> => {
  const fullEventId = `completed:${eventTargetId}`;

  const returnedObservable = fromEvent(
    ScheduleJobEventBus,
    fullEventId,
    (job) => job as T,
  ).pipe(
    tap(() => {
      const logger = eventLog(LogEventNames.JobScheduleEvent);
      logger.debug(`${jobEventLog.JOB_ENDED}: ${eventTargetId}`, {
        eventName: fullEventId,
      });
    }),
  );
  if (once) {
    return returnedObservable.pipe(take(1));
  }
  return returnedObservable;
};

export const onJobStarted = <T>(eventTargetId: string): Observable<T> => {
  const fullEventId = `scheduleJob:${eventTargetId}`;

  return fromEvent(ScheduleJobEventBus, fullEventId, (job) => job as T).pipe(
    tap(() => {
      const logger = eventLog(LogEventNames.JobScheduleEvent);
      logger.debug(`${jobEventLog.JOB_STARTED}: ${eventTargetId}`, {
        eventName: fullEventId,
      });
    }),
  );
};

export const unsubscribeFromAllLogs = (id: number) => {
  ScheduleJobLogEventBus.removeAllListeners(id.toString());
  return { success: true };
};

export const deleteJobStartAndEndActions = (job: JobDTO) => {
  const jobInitialization = currentRunsManager.initialized.get(job.getName());
  if (jobInitialization) {
    jobInitialization.startEventOff?.();
    jobInitialization.endEventOff?.();
    currentRunsManager.unInitializeJob(job.getName());
  }
};

export const saveJobLogs = (id: string, name: string) => {
  try {
    const logId = "jobLog:" + id;
    const errorId = "error:" + id;
    ScheduleJobLogEventBus.removeAllListeners(logId);
    ScheduleJobLogEventBus.removeAllListeners(errorId);
    ScheduleJobLogEventBus.on(logId, (data: any) => {
      JobLogger(id.toString(), name).info(data.data, { logId: data.logId });
    });
    ScheduleJobLogEventBus.on(errorId, (data: any) => {
      JobLogger(id.toString(), name).info(data.data, { logId: data.logId });
      const targetConsumer = ScheduleJobManager.runningJob.find(
        (j) =>
          (j.job.getUniqueSingularId() ?? j.job.getId())?.toString() === id,
      )?.consumer as JobConsumer;
      targetConsumer?.notification?.sendJobCrashNotification(
        id,
        name,
        data?.toString(),
      );
    });
    return Promise.resolve(true);
  } catch (err) {
    logger.error("error subscribing to logs for saving");
    logger.error(err);
    return Promise.reject(err);
  }
};

export { startAllJobs };
