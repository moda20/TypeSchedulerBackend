import mainSocketService from "@api/websocket/mainSocket.service";
import config from "@config/config";
import GotifyService from "@notifications/gotify";
import NtfyService from "@notifications/ntfy";
import SlackNotification from "@notifications/slack";
import { addEventLog } from "@repositories/events";
import { handleEvent } from "@repositories/notification";
import { LogEventNames } from "@typesDef/api/jobs";
import { JobEventTypes } from "@typesDef/models/job";
import {
  DefaultNotificationService,
  JobEventHandlerConfig,
} from "@typesDef/notifications";
import {
  exportCacheFiles,
  exportResultsToFile,
  getNextJobExecution,
  sleep,
} from "@utils/jobUtils";
import { eventLog } from "@utils/loggers";

export const emitJobEvent = async (
  event: string,
  message: string,
  type: JobEventTypes,
  jobLogId: string,
  jobId: number,
  extraHandlers: JobEventHandlerConfig[] = [],
) => {
  const eventLogger = eventLog("JobEvents");
  await addEventLog({
    event,
    message,
    type,
    job_log_id: jobLogId,
  });
  // we need a better way of handling this
  switch (type) {
    case JobEventTypes.ERROR:
      eventLogger.error(message, {
        eventName: event,
      });
      break;
    case JobEventTypes.WARNING:
      eventLogger.warn(message, {
        eventName: event,
      });
      break;
    default:
      eventLogger.info(message, {
        eventName: event,
      });
      break;
  }
  mainSocketService.sendEventLogNotification({
    level: type,
    eventName: event,
    message,
  });
  mainSocketService.broadcastMessage(
    {
      id: `JOB_EVENT_${jobId}_${type}`,
      data: JSON.stringify({
        level: type,
        eventName: event,
        message,
      }),
    },
    `JOB_EVENT_${jobId}_${type}`,
  );
  mainSocketService.sendJobStatusEvents().catch((err) => {
    const sysLog = eventLog(LogEventNames.SysLogEvent);
    sysLog.warn(err, {
      eventName: "STATUS_VIA_SOCKET_FAILED",
    });
  });
  if (extraHandlers?.length) {
    extraHandlers.forEach((evh) => {
      handleEvent(evh, message, undefined, type);
    });
  }
};

export function getDefaultNotificationService(): new () => DefaultNotificationService {
  switch (config.get("notifications.defaultService")) {
    case "gotify":
      return GotifyService;
    case "ntfy":
      return NtfyService;
    case "slack":
      return SlackNotification;
    default:
      return GotifyService;
  }
}

export { exportCacheFiles, exportResultsToFile, getNextJobExecution, sleep };
