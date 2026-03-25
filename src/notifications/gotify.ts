import config from "@config/config";
import { notificationServices } from "@generated/prisma_base";
import { addNotifications } from "@repositories/notification";
import { LogEventNames } from "@typesDef/api/jobs";
import { JobDTO, JobLogDTO } from "@typesDef/models/job";
import {
  configType,
  DefaultNotificationService,
} from "@typesDef/notifications";
import { GotifyHttpService } from "@utils/httpRequestConfig";
import logger, { eventLog } from "@utils/loggers";
import { IScheduleJobLog } from "schedule-manager";
import type { Logger } from "winston";

/**
 * Type for the Gotify Configuration, if you are using this as a template, the name "InitConfigType" is mandatory as the type name
 * That's how the system initializes the configuration
 */
export type InitConfigType = configType & {
  /**
   * The URL of the Gotify server
   */
  url: string;
  /**
   * The API token for the Gotify server
   * sensitive: true
   */
  token: string;
  /**
   * The API token for the Gotify app
   */
  appToken: string;
  /**
   * The API token for the Gotify app error channel
   */
  appErrorChannelToken: string;
};

export default class GotifyService implements DefaultNotificationService {
  name?: string;
  description?: string;
  serviceDbId?: number;
  jobLogId?: string;
  syslog?: Logger;
  config?: InitConfigType;
  constructor() {
    this.name = "gotify";
    this.description = "Default gotify notification service";
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
    const newService = new GotifyService();
    newService.name = serviceDbObject.name;
    newService.description = serviceDbObject.description;
    newService.serviceDbId = serviceDbObject.id;
    newService.jobLogId = jobLogDTO.id;
    newService.config = config;
    return newService;
  }

  sendMessage(message: string, title?: string, options?: any): Promise<any> {
    return GotifyHttpService.post(
      "/message",
      {
        message,
        priority: 1,
        title,
      },
      options,
    );
  }

  async sendBaseMessage(body: any, options?: any) {
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
    return this.sendMessage(body.message, body.title, options).catch(
      (err: any) => {
        logger.error("gotify error");
        logger.error(err.message);
        this.syslog?.error(`gotify error: ${err.message}`, {
          eventName: "NOTIF_SERVICE_ERROR",
        });
      },
    ) as Promise<any>;
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
      logger.error("Gotify Is not configured to use");
      return Promise.resolve();
    }
    const envPrefix = config.get("env") === "production" ? "" : "(DEV) ";
    const { title, message, priority } = options ?? {};
    return this.sendBaseMessage({
      message:
        message ??
        `${envPrefix}Job ${jobName} finished with results: ${results}`,
      priority: priority ?? 1,
      title:
        title ?? `${envPrefix}Job ${jobName}${jobId && ` ${jobId} `}finished`,
    });
  }

  sendJobCrashNotification(
    jobId: string,
    jobName: string,
    error?: string,
    options?: { title?: string; message?: string; priority?: number },
  ): Promise<any> {
    const url = this.config?.url;
    const token = this.config?.token;
    if (!url || !token) {
      logger.error("Gotify Is not configured to use");
      return Promise.resolve();
    }
    const envPrefix = config.get("env") === "production" ? "" : "(DEV) ";
    const { title, message, priority } = options ?? {};
    return this.sendBaseMessage(
      {
        message:
          message ?? `${envPrefix}Job ${jobName} crashed with error: ${error}`,
        priority: priority ?? 1,
        title:
          title ?? `${envPrefix}Job ${jobName}${jobId && ` ${jobId} `} Crashed`,
      },
      {
        params: {
          token: this.config?.appErrorChannelToken,
        },
      },
    ) as Promise<any>;
  }
}
