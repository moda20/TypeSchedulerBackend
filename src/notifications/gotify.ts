import config from "@config/config";
import { notificationServices } from "@generated/prisma_base";
import { addNotifications } from "@repositories/notification";
import { JobDTO, JobLogDTO } from "@typesDef/models/job";
import { DefaultNotificationService } from "@typesDef/notifications";
import { GotifyHttpService } from "@utils/httpRequestConfig";
import logger from "@utils/loggers";
import { IScheduleJobLog } from "schedule-manager";

export default class GotifyService implements DefaultNotificationService {
  name?: string;
  description?: string;
  serviceDbId?: number;
  jobLogId?: string;
  constructor() {
    this.name = "gotify";
    this.description = "Default gotify notification service";
  }

  init(
    job: JobDTO,
    jobLogDTO: JobLogDTO | IScheduleJobLog,
    serviceDbObject: notificationServices,
  ): DefaultNotificationService {
    this.name = serviceDbObject.name;
    this.description = serviceDbObject.description;
    this.serviceDbId = serviceDbObject.id;
    this.jobLogId = jobLogDTO.id;
    return this;
  }
  static init(
    job: JobDTO,
    jobLogDTO: JobLogDTO | IScheduleJobLog,
    serviceDbObject: notificationServices,
  ) {
    const newService = new GotifyService();
    newService.name = serviceDbObject.name;
    newService.description = serviceDbObject.description;
    newService.serviceDbId = serviceDbObject.id;
    newService.jobLogId = jobLogDTO.id;
    return newService;
  }

  sendMessage(message: string, title?: string): Promise<any> {
    return GotifyHttpService.post("/message", {
      message,
      priority: 1,
      title,
    }) as Promise<any>;
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
    });
    return GotifyHttpService.post("/message", body, options).catch(
      (err: any) => {
        logger.error("ntfy error");
        logger.error(err.message);
      },
    ) as Promise<any>;
  }

  sendJobFinishNotification(
    jobId: string,
    jobName: string,
    results: string,
    options?: { title?: string; message?: string; priority?: number },
  ) {
    const url = config.get("gotify.url");
    const token = config.get("gotify.token");
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
    const url = config.get("gotify.url");
    const token = config.get("gotify.token");
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
          token: config.get("gotify.appErrorChannelToken"),
        },
      },
    ) as Promise<any>;
  }
}
