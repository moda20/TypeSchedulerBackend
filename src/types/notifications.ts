import { notificationServices } from "@generated/prisma_base";
import { JobDTO, JobLogDTO } from "@typesDef/models/job";
import { IScheduleJobLog } from "schedule-manager";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

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

export enum jobNotificationTypes {
  JOB_EVENT = "JOB_EVENT",
  JOB_EVENT_ERROR = "JOB_EVENT_ERROR",
  JOB_EVENT_WARNING = "JOB_EVENT_WARNING",
  JOB_EVENT_INFO = "JOB_EVENT_INFO",
  JOB_DURATION = "JOB_DURATION",
}
export type JobNotificationTypesType = `${jobNotificationTypes}`;

export enum JobNotificationTriggers {
  REGEX_MESSAGE_MATCH = "REGEX_MESSAGE_MATCH",
  DURATION_DELTA = "DURATION_DELTA",
  DURATION_THRESHOLD = "DURATION_THRESHOLD",
}
export type JobNotificationTriggerType = `${JobNotificationTriggers}`;

export interface JobEventHandlerConfig {
  job: JobDTO;
  jobLog: JobLogDTO;
  config_id: string;
  notification_type: jobNotificationTypes[];
  trigger: JobNotificationTriggers;
  notification_service_id: number;
  regex?: string;
  durationThreshold?: number;
  occurrences?: number;
  updatedAt?: Date;
}

export const notificationCreationSchema = z.object({
  image: z.file().optional(),
  imageName: z.string().default(uuidv4()),
  name: z.string({ error: "Service name is required" }),
  description: z.string().optional().default(""),
  entryPoint: z.string({ error: "Entry point is required" }),
  jobs: z
    .string()
    .transform((e) => e.split(",").map(Number))
    .refine((arr) => arr.every((n) => Number.isFinite(n)), {
      message: "All values must be valid numbers",
    })
    .optional(),
});

export const notificationUpdateSchema = notificationCreationSchema.extend({
  id: z
    .string({ error: "service id is required" })
    .transform(Number)
    .refine((n) => Number.isFinite(n), {
      message: "service id must be valid numbers",
    }),
  imageName: z.string().optional(),
});

// TODO : see is a specific validation for notif_type relation to regex and duration threshold is needed
export const jobEventNotificationConfigSchema = z.object({
  config_id: z.string({ error: "config id is required" }),
  notification_type: z.array(z.enum(jobNotificationTypes), {
    error: "notification type is required and must be an array",
  }),
  trigger: z.enum(JobNotificationTriggers),
  notification_service_id: z.coerce.number({ error: "service id is required" }),
  regex: z.string().optional(),
  durationThreshold: z.coerce.number().optional(),
  occurrences: z.coerce.number().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const jobEventNotificationConfigAPISchema =
  jobEventNotificationConfigSchema.extend({
    config_id: z.string().optional(),
  });

export type JobEventNotificationConfigSchemaType = z.infer<
  typeof jobEventNotificationConfigSchema
>;

export type JobEventNotificationConfigAPISchemaType = z.infer<
  typeof jobEventNotificationConfigAPISchema
>;
