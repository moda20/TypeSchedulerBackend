import mainSocketService from "@api/websocket/mainSocket.service";
import { addEventLog } from "@repositories/events";
import { LogEventNames } from "@typesDef/api/jobs";
import { JobEventTypes } from "@typesDef/models/job";
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
};

export { exportCacheFiles, exportResultsToFile, getNextJobExecution, sleep };
