import config from "@config/config";
import { notificationServices } from "@generated/prisma_base";
import { addNotifications } from "@repositories/notification";
import { JobDTO, JobLogDTO } from "@typesDef/models/job";
import {
  DefaultNotificationService,
  NtfyExtraHeaders,
} from "@typesDef/notifications";
import { NtfyHttpService } from "@utils/httpRequestConfig";
import logger from "@utils/loggers";
import { IScheduleJobLog } from "schedule-manager";

export default class NtfyService implements DefaultNotificationService {
  name?: string;
  description?: string;
  serviceDbId?: number;
  jobLogId?: string;
  constructor() {
    this.name = "ntfy";
    this.description = "Default ntfy notification service";
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
    const newService = new NtfyService();
    newService.name = serviceDbObject.name;
    newService.description = serviceDbObject.description;
    newService.serviceDbId = serviceDbObject.id;
    newService.jobLogId = jobLogDTO.id;
    return newService;
  }

  sendMessage(
    message: string,
    title?: string,
    extraHeaders?: NtfyExtraHeaders,
  ): Promise<any> {
    const headers = {
      Authorization: `Bearer ${config.get("ntfy.token")}`,
      "Content-Type": "application/json",
      "X-Title": title,
      ...extraHeaders,
    };
    return NtfyHttpService.post(`/${config.get("ntfy.topic")}`, message, {
      headers: headers,
    }) as Promise<any>;
  }

  async sendBaseMessage(body: any, extraHeaders?: NtfyExtraHeaders) {
    const headers = {
      Authorization: `Bearer ${config.get("ntfy.token")}`,
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
    });

    return NtfyHttpService.post(`/${config.get("ntfy.topic")}`, body.message, {
      headers: headers,
    }).catch((err: any) => {
      logger.error("ntfy error");
      logger.error(err.message);
    }) as Promise<any>;
  }

  sendJobFinishNotification(
    jobId: string,
    jobName: string,
    results: string,
    options?: { title?: string; message?: string; priority?: number },
  ) {
    const url = config.get("ntfy.url");
    const token = config.get("ntfy.token");
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
    const url = config.get("ntfy.url");
    const token = config.get("ntfy.token");
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
