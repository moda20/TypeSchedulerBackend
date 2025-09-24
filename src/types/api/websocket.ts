export interface JobNotification {
  message: string;
}

export interface JobStartedNotification extends JobNotification {
  jobId: string;
  jobName: string;
  runningJobCount: number;
  isSingular: boolean;
  averageTime: number;
}

export interface EventLogNotification extends JobNotification {
  level: string;
  eventName: string;
}
export enum JobNotificationTopics {
  JobStarted = "JobStarted",
  JobFinished = "JobFinished",
  JobFailed = "JobFailed",
  Status = "Status",
  SubscribeToTopic = "SubscribeToTopic",
  UnsubscribeFromTopic = "UnsubscribeFromTopic",
  NOOP = "NOOP",
}

export enum MiscNotificationTopics {
  EventLog = "EventLog",
}

export const MiscNotificationTopicsList = Object.values(
  MiscNotificationTopics,
).map((e) => e.toString());
