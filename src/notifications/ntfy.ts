import config from "@config/config";
import { notificationServices } from "@generated/prisma_base";
import { addNotifications } from "@repositories/notification";
import { LogEventNames } from "@typesDef/api/jobs";
import { JobDTO, JobLogDTO } from "@typesDef/models/job";
import {
  configType,
  DefaultNotificationService,
  NtfyExtraHeaders,
} from "@typesDef/notifications";
import { NtfyHttpService } from "@utils/httpRequestConfig";
import logger, { eventLog } from "@utils/loggers";
import { IScheduleJobLog } from "schedule-manager";
import type { Logger } from "winston";

/**
 * Type for the Ntfy Configuration, if you are using this as a template, the name "InitConfigType" is mandatory as the type name
 * That's how the system initializes the configuration
 */
export type InitConfigType = configType & {
  /**
   * The URL of the Ntfy server
   */
  url: string;
  /**
   * The API token for the Ntfy server
   * sensitive: true
   */
  token: string;
  /**
   * The ntfy target topic
   */
  topic: string;
};

export default class NtfyService implements DefaultNotificationService {
  name?: string;
  description?: string;
  serviceDbId?: number;
  jobLogId?: string;
  syslog?: Logger;
  config?: InitConfigType;
  constructor() {
    this.name = "ntfy";
    this.description = "Default ntfy notification service";
  }

  init<T>(
    job: JobDTO,
    jobLogDTO: JobLogDTO | IScheduleJobLog,
    serviceDbObject: notificationServices,
    config: InitConfigType | T,
  ): DefaultNotificationService {
    this.name = serviceDbObject.name;
    this.description = serviceDbObject.description;
    this.serviceDbId = serviceDbObject.id;
    this.jobLogId = jobLogDTO.id;
    this.syslog = eventLog(LogEventNames.SysLogEvent);
    this.config = config as InitConfigType;
    return this;
  }
  static init(
    job: JobDTO,
    jobLogDTO: JobLogDTO | IScheduleJobLog,
    serviceDbObject: notificationServices,
    config: InitConfigType,
  ) {
    const newService = new NtfyService();
    newService.name = serviceDbObject.name;
    newService.description = serviceDbObject.description;
    newService.serviceDbId = serviceDbObject.id;
    newService.jobLogId = jobLogDTO.id;
    newService.config = config;
    return newService;
  }

  sendMessage(
    message: string,
    title?: string,
    extraHeaders?: NtfyExtraHeaders,
  ): Promise<any> {
    const headers = {
      Authorization: `Bearer ${this.config?.token}`,
      "Content-Type": "application/json",
      "X-Title": title,
      ...extraHeaders,
    };
    NtfyHttpService.defaults.baseURL = this.config?.url;
    return NtfyHttpService.post(`/${this.config?.topic}`, message, {
      headers: headers,
    }) as Promise<any>;
  }

  async sendBaseMessage(body: any, extraHeaders?: NtfyExtraHeaders) {
    const headers = {
      Authorization: `Bearer ${this.config?.token}`,
      "Content-Type": "application/json",
      "X-Title": body.title,
      ...extraHeaders,
    };

    await addNotifications({
      message: body.title,
      service_id: this.serviceDbId,
      job_log_id: this.jobLogId,
      data: body.message,
    }).catch((err: any) => {
      logger.error("Error saving notf. to database");
      logger.error(err);
      this.syslog?.error(err, {
        eventName: "NOTIF_DB_ERROR",
      });
    });

    return NtfyHttpService.post(`/${this.config?.topic}`, body.message, {
      headers: headers,
    }).catch((err: any) => {
      logger.error("ntfy error");
      logger.error(err.message);
      this.syslog?.error(`gotify error: ${err.message}`, {
        eventName: "NOTIF_SERVICE_ERROR",
      });
    }) as Promise<any>;
  }

  sendJobFinishNotification(
    jobId: string,
    jobName: string,
    results: string,
    options?: { title?: string; message?: string; priority?: number },
  ) {
    const url = this.config?.url;
    const token = this.config?.token;
    if (!url || !token) {
      logger.error("Ntfy Is not configured to use");
      return Promise.resolve();
    }
    const envPrefix = config.get("env") === "production" ? "" : "(DEV) ";
    const { title, message, priority, ...rest } = options ?? {};
    return this.sendBaseMessage(
      {
        message:
          message ??
          `${envPrefix}Job ${jobName} finished with results: ${results}`,
        title:
          title ?? `${envPrefix}Job ${jobName}${jobId && ` ${jobId} `}finished`,
      },
      {
        "X-Priority": (priority ?? "1").toString(),
        ...rest,
      },
    );
  }

  sendJobCrashNotification(
    jobId: string,
    jobName: string,
    error?: string,
    options?: {
      title?: string;
      message?: string;
      priority?: number | string;
      [key: string]: any;
    },
  ): Promise<any> {
    const url = this.config?.url;
    const token = this.config?.token;
    if (!url || !token) {
      logger.error("Ntfy Is not configured to use");
      return Promise.resolve();
    }
    const envPrefix = config.get("env") === "production" ? "" : "(DEV) ";
    const { title, message, priority, ...rest } = options ?? {};
    return this.sendBaseMessage(
      {
        message:
          message ?? `${envPrefix}Job ${jobName} crashed with error: ${error}`,
        title:
          title ?? `${envPrefix}Job ${jobName}${jobId && ` ${jobId} `} Crashed`,
      },
      {
        "X-Priority": (priority ?? "5").toString(),
        ...rest,
      },
    ) as Promise<any>;
  }
}
