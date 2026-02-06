import { notificationServices } from "@generated/prisma_base";
import { JobDTO, JobLogDTO } from "@typesDef/models/job";
import { IScheduleJobLog } from "schedule-manager";

export interface Notifications {
  init?<T extends configType>(
    job: JobDTO,
    jobLogDTO: JobLogDTO | IScheduleJobLog,
    serviceDbObject: notificationServices,
    config: T,
  ): Notifications;
  name?: string;
  description?: string;
  serviceDbId?: number;

  sendMessage(message: string, title?: string): Promise<any>;
}

export type configType = object;

export interface DefaultNotificationService extends Notifications {
  init<T>(
    job: JobDTO,
    jobLogDTO: JobLogDTO | IScheduleJobLog,
    serviceDbObject: notificationServices,
    config: T,
  ): DefaultNotificationService;

  sendJobFinishNotification(
    jobId: string,
    jobName: string,
    results: string,
    options?: {
      title?: string;
      message?: string;
      priority?: number | string;
      [key: string]: any;
    },
  ): Promise<any>;

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
  ): Promise<any>;
  sendBaseMessage(body: any, extraHeaders?: NtfyExtraHeaders): Promise<any>;
}

export type extractedServiceConfiguration = Record<
  string,
  { type?: string; comment?: string; meta?: any; value?: any }
>;
export interface NtfyExtraHeaders {
  /** Main body of the message as shown in the notification */
  "X-Message"?: string;

  /** Message title */
  "X-Title"?: string;

  /** Message priority */
  "X-Priority"?: string;

  /** Tags and emojis */
  "X-Tags"?: string;

  /** Timestamp or duration for delayed delivery */
  "X-Delay"?: string;
  "X-At"?: string;
  "X-In"?: string;

  /** JSON array or short format of user actions */
  "X-Actions"?: string;

  /** URL to open when notification is clicked */
  "X-Click"?: string;

  /** URL to send as an attachment */
  "X-Attach"?: string;

  /** Enable Markdown formatting in the notification body */
  "X-Markdown"?: string;

  /** Notification icon URL */
  "X-Icon"?: string;

  /** Optional attachment filename */
  "X-Filename"?: string;

  /** E-mail address for e-mail notifications */
  "X-Email"?: string;
  "X-E-Mail"?: string;

  /** Phone number for phone calls */
  "X-Call"?: string;

  /** Allows disabling message caching */
  "X-Cache"?: string;

  /** Allows disabling sending to Firebase */
  "X-Firebase"?: string;

  /** UnifiedPush publish option */
  "X-UnifiedPush"?: string;

  /** Internal parameter, used for iOS push notifications */
  "X-Poll-ID"?: string;
}
