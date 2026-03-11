import config from "@config/config";
import { handleEvent } from "@repositories/notification";
import { getNotificationService } from "@repositories/notificationServices";
import {
  JobDTO,
  JobEventTypes,
  JobLogDTO,
  JobOptions,
} from "@typesDef/models/job";
import {
  DefaultNotificationService,
  JobEventHandlerConfig,
  jobEventNotificationConfigSchema,
  jobNotificationTypes,
  JobNotificationTypesType,
} from "@typesDef/notifications";
import defaultAxiosInstance from "@utils/httpRequestConfig";
import * as jobConsumerUtils from "@utils/jobConsumerUtils";
import {
  exportCacheFiles,
  exportResultsToFile,
  getFromCache,
  injectNotificationServices,
} from "@utils/jobUtils";
import { injectProxy } from "@utils/proxyUtils";
import type { AxiosInstance } from "axios";
import scheduleManager, {
  IScheduleJob,
  IScheduleJobLog,
} from "schedule-manager";

const { JobConsumer: Consumer } = scheduleManager;

export class JobConsumer extends Consumer {
  public axios: AxiosInstance;
  public options?: JobOptions;
  notification: DefaultNotificationService;
  onEnd?: (job: IScheduleJob, jobLog: IScheduleJobLog) => Promise<void>;
  notificationServices: { [key: string]: any } = {};
  eventHandlers: Partial<{
    [key in JobNotificationTypesType]: JobEventHandlerConfig[];
  }> = {};
  constructor() {
    super();
    this.axios = defaultAxiosInstance.create();
    this.notification =
      new (jobConsumerUtils.getDefaultNotificationService() as new () => DefaultNotificationService)();
  }

  getFromCache(...args: Parameters<typeof getFromCache>) {
    return getFromCache(...args);
  }

  exportResultsToFile(...args: Parameters<typeof exportResultsToFile>) {
    return exportResultsToFile(...args);
  }

  exportCacheFiles(...args: Parameters<typeof exportCacheFiles>) {
    return exportCacheFiles(...args);
  }

  private async initializeNotificationService(job: JobDTO, jobLog: JobLogDTO) {
    const targetNotificationService = await getNotificationService(
      0,
      this.notification.name,
    );
    if (!targetNotificationService) {
      this.emitWarning(
        `Notification service ==> ${this.notification.name} <== not found in db`,
      );
      throw new Error(
        `Notification service ==> ${this.notification.name} <== not found in db`,
      );
    }
    const serviceConfig = config.safeGet(
      `notifications.${this.notification.name}`,
      {},
    );
    this.notification.init(
      job,
      jobLog,
      targetNotificationService,
      serviceConfig,
    );
  }

  async injectProxies() {
    return injectProxy({
      jobId: Number(this.job?.id),
      axiosInstance: this.axios,
      logger: (v: any) => this.logEvent(v),
    })
      .then((proxy) => {
        if (proxy) {
          this.logEvent(`proxy ${proxy.proxy_ip}:${proxy.proxy_port} injected`);
        } else {
          this.logEvent("no proxy to inject found");
        }
      })
      .catch((err) => {
        this.logEvent("error injecting proxies");
        this.logEvent(err);
      });
  }
  async injectNotificationServices(services: number[]) {
    this.notificationServices = await injectNotificationServices(
      this.job!,
      this.jobLog!,
      services,
      (v: any) => this.logEvent(v),
    );
    this.logEvent(
      `using ${Object.keys(this.notificationServices).length} notification services`,
    );
  }

  logEvent(data: any, serializer?: (data: any) => any) {
    let serializedData = serializer
      ? serializer(data)
      : this.serializeLogs(data);
    // a last stage stringification for logs for better readability
    serializedData =
      typeof serializedData === "object"
        ? JSON.stringify(serializedData, null, 4)
        : serializedData;
    if (this.jobLog?.logEventBus) {
      this.jobLog.logEventBus.emit(
        "jobLog:" + (this.job?.getUniqueSingularId() ?? this.job?.getId()),
        {
          logId: this.jobLog?.getId(),
          data: serializedData,
        },
      );
    }
  }

  emitError(error: any) {
    return jobConsumerUtils.emitJobEvent(
      "JOB_ERROR",
      error,
      JobEventTypes.ERROR,
      this.jobLog!.getId()!,
      this.job!.getId()!,
      this.eventHandlers[jobNotificationTypes.JOB_EVENT_ERROR],
    );
  }

  emitWarning(warning: any) {
    return jobConsumerUtils.emitJobEvent(
      "JOB_WARNING",
      warning,
      JobEventTypes.WARNING,
      this.jobLog!.getId()!,
      this.job!.getId()!,
      this.eventHandlers[jobNotificationTypes.JOB_EVENT_WARNING],
    );
  }

  emitInfo(info: any) {
    return jobConsumerUtils.emitJobEvent(
      "JOB_INFO",
      info,
      JobEventTypes.INFO,
      this.jobLog!.getId()!,
      this.job!.getId()!,
      this.eventHandlers[jobNotificationTypes.JOB_EVENT_INFO],
    );
  }

  jobInputParse(job: JobDTO, jobLog: JobLogDTO) {
    if (job.param && typeof job.param === "string") {
      job.param = JSON.parse(job.param);
      if (job.extraParams) {
        job.param = {
          ...job.param,
          ...job.extraParams,
        };
      }
    }
    return {
      job,
      jobLog,
    };
  }

  injectEventHandlers(job: JobDTO, jobLog: JobLogDTO) {
    const handlerConfigs = job.param?.eventHandlers;
    if (handlerConfigs.length) {
      const configs = handlerConfigs.map((cfg: any) => {
        const parsedConfig = jobEventNotificationConfigSchema.parse(cfg);
        return {
          job,
          jobLog,
          config_id: parsedConfig.config_id,
          notification_type: parsedConfig.notification_type,
          trigger: parsedConfig.trigger,
          notification_service_id: parsedConfig.notification_service_id,
          regex: parsedConfig.regex,
          durationThreshold: parsedConfig.durationThreshold,
        };
      });
      this.eventHandlers = configs.reduce(
        (p: any, c: JobEventHandlerConfig) => {
          c.notification_type.forEach((nt_type: string) => {
            if (p[nt_type]) {
              p[nt_type].push(c);
            } else {
              p[nt_type] = [c];
            }
          });
          return p;
        },
        {} as { [key: string]: JobEventHandlerConfig[] },
      );
    }
  }

  async preRun(j: JobDTO, jl: JobLogDTO) {
    const { job, jobLog } = this.jobInputParse(j, jl);
    this.job = job;
    this.jobLog = jobLog;
    await this.injectProxies();
    // initializing the notification service to work with the new structure of services
    await this.initializeNotificationService(job, jobLog);
    try {
      this.options = {
        utils: jobConsumerUtils,
        config: config.getProperties(),
      };
      await this.injectNotificationServices(
        job?.param?.notificationServices || [],
      );
      // initializing event handlers
      await this.injectEventHandlers(job, jobLog);
      const completedResults = await this.run(job, jobLog);
      if (!completedResults.success) {
        this.emitError(
          `Job didn't complete correctly: ${JSON.stringify(completedResults)}`,
        );
      }
      return completedResults;
    } catch (err) {
      this.logEvent(`job ${job.name} crashed with an error ${err?.toString()}`);
      this.logEvent(err, (e) => this.serializeLogs(e, 10));
      this.error(err as Error);
      return await this.complete(jobLog, null, err?.toString());
    }
  }

  async complete(jobLog: IScheduleJobLog, result: any, error?: string) {
    if (this.onEnd) {
      await this.onEnd(this.job!, jobLog);
    }
    const completionResults: any = await super.complete(jobLog, result, error);
    if (this.eventHandlers) {
      this.eventHandlers[jobNotificationTypes.JOB_DURATION]?.forEach(
        (handlerConfig: JobEventHandlerConfig) => {
          return handleEvent(
            handlerConfig,
            undefined,
            completionResults.newTimeInSeconds,
          );
        },
      );
    }
    return completionResults;
  }
}
