import config from "@config/config";
import { notificationServices } from "@generated/prisma_base";
import { addNotifications } from "@repositories/notification";
import {
  IncomingWebhook,
  IncomingWebhookDefaultArguments,
} from "@slack/webhook";
import { LogEventNames } from "@typesDef/api/jobs";
import { JobDTO, JobLogDTO } from "@typesDef/models/job";
import {
  configType,
  DefaultNotificationService,
} from "@typesDef/notifications";
import logger, { eventLog } from "@utils/loggers";
import { HttpsProxyAgent } from "https-proxy-agent";
import { IScheduleJobLog } from "schedule-manager";
import type { Logger } from "winston";

export type InitConfigType = configType & {
  /**
   * The URL of the slack webhook
   */
  url: string;
  /**
   * The proxy url to use for the slack webhook
   * optional
   * sensitive: true
   */
  proxyUrl: string;
  /**
   * The proxy username to use for the slack webhook
   * sensitive: true
   */
  proxyUsername: string;
  /**
   * sensitive: true
   * The proxy password to use for the slack webhook
   */
  proxyPassword: string;
};

export default class SlackNotification implements DefaultNotificationService {
  serviceDbId?: number;
  jobLogId?: string;
  slackWebhook?: IncomingWebhook;
  config?: InitConfigType;
  syslog?: Logger;
  name?: string;
  description?: string;
  constructor() {
    this.name = "slack";
  }
  async sendMessage(message: string, title: string): Promise<any> {
    await addNotifications({
      message: title,
      service_id: this.serviceDbId,
      job_log_id: this.jobLogId,
      data: message,
    }).catch((err) => {
      this.syslog?.error(err, {
        eventName: "NOTIF_DB_ERROR",
      });
    });
    return this.slackWebhook
      ?.send({
        text: message,
      })
      .catch((err) => {
        logger.error(err.message);
        this.syslog?.error(`slack error: ${err.message}`, {
          eventName: "NOTIF_SERVICE_ERROR",
        });
      });
  }

  async sendBaseMessage() {}

  init<T>(
    job: JobDTO,
    jobLogDTO: JobLogDTO | IScheduleJobLog,
    serviceDbObject: notificationServices,
    config: InitConfigType | T,
  ): SlackNotification {
    this.name = serviceDbObject.name;
    this.description = serviceDbObject.description;
    this.serviceDbId = serviceDbObject.id;
    this.jobLogId = jobLogDTO.id;
    this.config = config as InitConfigType;
    this.syslog = eventLog(LogEventNames.SysLogEvent);
    this.initializeSlackWebhook(this);
    return this;
  }

  initializeSlackWebhook = (instance?: SlackNotification) => {
    const ti = instance ?? this;
    if (!ti.config?.url) {
      throw new Error("Slack webhook url is not configured");
    }
    const webhookExtraConfig: IncomingWebhookDefaultArguments = {};
    if (ti.config?.proxyUrl) {
      const parsedUrl = new URL(ti.config?.proxyUrl);
      const proxyUrl = `${parsedUrl.protocol}//${ti.config?.proxyUsername ? encodeURIComponent(ti.config?.proxyUsername) + ":" + encodeURIComponent(ti.config?.proxyPassword) + "@" : ""}${parsedUrl.hostname}:${parsedUrl.port}`;
      webhookExtraConfig.agent = new HttpsProxyAgent(proxyUrl);
    }
    ti.slackWebhook = new IncomingWebhook(ti.config.url, webhookExtraConfig);
  };
  static init(
    job: JobDTO,
    jobLogDTO: JobLogDTO | IScheduleJobLog,
    serviceDbObject: notificationServices,
    config: InitConfigType,
  ): SlackNotification {
    const instance = new SlackNotification();
    instance.serviceDbId = serviceDbObject.id;
    instance.jobLogId = jobLogDTO.id;
    instance.config = config;
    instance.initializeSlackWebhook(instance);
    instance.syslog = eventLog(LogEventNames.SysLogEvent);
    return instance;
  }

  sendJobFinishNotification(
    jobId: string,
    jobName: string,
    results: string,
    options?: { title?: string; message?: string },
  ) {
    if (!this.slackWebhook) {
      logger.error(
        "Slack webhook is not configured to use, not sending job finish notification",
      );
      return Promise.resolve();
    }
    const envPrefix = config.get("env") === "production" ? "" : "(DEV) ";
    const { title, message } = options ?? {};
    return this.sendMessage(
      message ?? `${envPrefix}Job ${jobName} finished with results: ${results}`,
      title ?? `${envPrefix}Job ${jobName}${jobId && ` ${jobId} `}finished`,
    );
  }

  sendJobCrashNotification(
    jobId: string,
    jobName: string,
    error?: string,
    options?: { title?: string; message?: string },
  ) {
    if (!this.slackWebhook) {
      logger.error(
        "Slack webhook is not configured to use, not sending crash notification",
      );
      return Promise.resolve();
    }
    const envPrefix = config.get("env") === "production" ? "" : "(DEV) ";
    const { title, message } = options ?? {};
    return this.sendMessage(
      message ?? `${envPrefix}Job ${jobName} crashed with error: ${error}`,
      title ?? `${envPrefix}Job ${jobName}${jobId && ` ${jobId} `} Crashed`,
    ) as Promise<any>;
  }
}
