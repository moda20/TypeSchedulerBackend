import mainSocketService from "@api/websocket/mainSocket.service";
import { addEventLog } from "@repositories/events";
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
  mainSocketService.sendJobStatusEvents();
};

export { exportCacheFiles, exportResultsToFile, getNextJobExecution, sleep };
