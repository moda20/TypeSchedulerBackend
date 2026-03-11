import { basePrisma } from "@initialization/index";
import { NotificationInput } from "@typesDef/models/notificationService";
import {
  JobEventHandlerConfig,
  JobNotificationTriggers,
} from "@typesDef/notifications";
import dayJs from "@utils/dayJs";
import { injectNotificationServices } from "@utils/jobUtils";
import logger from "@utils/loggers";

export const addNotifications = async (
  notificationData: NotificationInput | NotificationInput[],
) => {
  const notificationInfo = Array.isArray(notificationData)
    ? notificationData
    : [notificationData];
  return basePrisma.notification.createMany({
    data: notificationInfo.map((e) => {
      delete e.service_id;
      return {
        ...e,
        job_log_id: e.job_log_id,
        service: e.service_id,
      };
    }),
  });
};

const handleEventNotification = async (
  handlerConfig: JobEventHandlerConfig,
  message: string,
  title: string,
) => {
  const service = await injectNotificationServices(
    handlerConfig.job!,
    handlerConfig.jobLog!,
    [handlerConfig.notification_service_id],
    (v) => logger.info(v),
  );
  const targetService = Object.values(service)[0];
  return targetService.sendMessage(message, title).catch((err) => {
    logger.error(err);
  });
};

export const handleEvent = async (
  handlerConfig: JobEventHandlerConfig,
  event?: string,
  finalDuration?: number,
) => {
  switch (handlerConfig.trigger) {
    case JobNotificationTriggers.DURATION_DELTA: {
      if (!finalDuration) return;
      const [low, medium, high] = [0.2, 0.4, 0.7].map(
        (e) => finalDuration > handlerConfig.job.averageTime * (1 + e),
      );
      if (!low && !medium && !high) return;
      const messageTag = high
        ? "‼️High"
        : medium
          ? "🔺Medium"
          : low
            ? "🟢Low"
            : "";
      const title = `${messageTag} Duration Delta ${handlerConfig.job.name} job event`;
      const message = `${messageTag} Duration delta ${handlerConfig.job.name} job event
      - Duration : ${dayJs.duration(3665, "seconds").humanize()}
      `;
      return handleEventNotification(handlerConfig, message, title);
    }
    case JobNotificationTriggers.DURATION_THRESHOLD: {
      if (!handlerConfig.durationThreshold) {
        logger.error("no duration threshold, handler ignored");
        return;
      }
      if (!finalDuration) return;
      if (finalDuration > handlerConfig.durationThreshold) {
        const title = `Duration threshold ${handlerConfig.durationThreshold}`;
        const message = `
        Event triggered by ${handlerConfig.job.name} job : 
        duration (${finalDuration}) has crossed the threshold (${handlerConfig.durationThreshold})`;
        return handleEventNotification(handlerConfig, message, title);
      }
      break;
    }

    case JobNotificationTriggers.REGEX_MESSAGE_MATCH: {
      if (!event) return;
      const rxp = new RegExp(handlerConfig.regex!);
      const match = event.match(rxp);
      if (match) {
        const title = `Regex Match ${handlerConfig.job.name} job event`;
        const message = `
        Event triggered by ${handlerConfig.job.name} job :  
- Matching regex : ${handlerConfig.regex} 
- Event Message : ${event}`;
        return handleEventNotification(handlerConfig, message, title);
      }
    }
  }
};
