import config from "@config/config";
import * as BrowserlessService from "@external/browserless";
import GotifyService from "@notifications/gotify";
import { getNotificationService } from "@repositories/notificationServices";
import {
  JobDTO,
  JobEventTypes,
  JobLogDTO,
  JobOptions,
} from "@typesDef/models/job";
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
  notification: GotifyService;
  public browserless: typeof BrowserlessService;
  onEnd?: (job: IScheduleJob, jobLog: IScheduleJobLog) => Promise<void>;
  notificationServices: { [key: string]: any } = {};
  constructor() {
    super();
    this.axios = defaultAxiosInstance.create();
    this.notification = new GotifyService();
    this.browserless = BrowserlessService;
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
    this.notification.init(
      job,
      jobLog,
      (await getNotificationService(0, this.notification.name))!,
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
    );
  }

  emitWarning(warning: any) {
    return jobConsumerUtils.emitJobEvent(
      "JOB_WARNING",
      warning,
      JobEventTypes.WARNING,
      this.jobLog!.getId()!,
      this.job!.getId()!,
    );
  }

  emitInfo(info: any) {
    return jobConsumerUtils.emitJobEvent(
      "JOB_INFO",
      info,
      JobEventTypes.INFO,
      this.jobLog!.getId()!,
      this.job!.getId()!,
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
    return super.complete(jobLog, result, error);
  }
}
