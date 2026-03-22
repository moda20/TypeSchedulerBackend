import { basePrisma, prisma } from "@initialization/index";
import { JobEventTypes } from "@typesDef/models/job";
import { NotificationInput } from "@typesDef/models/notificationService";
import {
  JobEventHandlerConfig,
  JobNotificationTriggers,
} from "@typesDef/notifications";
import dayJs from "@utils/dayJs";
import { injectNotificationServices } from "@utils/jobUtils";
import logger from "@utils/loggers";
import safe from "safe-regex";

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

const getEventOccurrences = async (
  handlerConfig: JobEventHandlerConfig,
  occurrenceThreshold: number,
  eventType?: JobEventTypes,
) => {
  if (occurrenceThreshold === 0) return 0;
  const targetTime = dayJs(handlerConfig.updatedAt).format(
    "YYYY-MM-DD HH:mm:ss",
  );
  switch (handlerConfig.trigger) {
    case JobNotificationTriggers.DURATION_DELTA: {
      return 0;
    }
    case JobNotificationTriggers.DURATION_THRESHOLD: {
      const query = `SELECT count(*) as occ
                     from schedule_job_log
                     WHERE job_id = '${handlerConfig.job.id}'
                       AND end_time IS NOT NULL
                       AND end_time >= '${targetTime}'
                       AND (CASE WHEN end_time IS NOT NULL THEN TIMESTAMPDIFF(SECOND, start_time, end_time) ELSE 0 END) > '${handlerConfig.durationThreshold ?? 0}'
                     LIMIT ${occurrenceThreshold}`;
      const previousOccurrences =
        await prisma.$queryRawUnsafe<{ occ: number }[]>(query);
      return previousOccurrences[0]?.occ;
    }
    case JobNotificationTriggers.REGEX_MESSAGE_MATCH: {
      if (!handlerConfig.regex) return;
      const query = `SELECT count(*) as occ from job_event_log
                      WHERE event_message REGEXP '${handlerConfig.regex}'
                        AND type = '${eventType}'
                        AND job_log_id LIKE '${handlerConfig.job.id}-%'
                        AND created_at >= '${targetTime}'
                        LIMIT ${occurrenceThreshold}`;
      const previousOccurrences =
        await prisma.$queryRawUnsafe<{ occ: number }[]>(query);
      return previousOccurrences[0]?.occ;
    }
    default:
      return 0;
  }
};

export const handleEvent = async (
  handlerConfig: JobEventHandlerConfig,
  event?: string,
  finalDuration?: number,
  jobEventType?: JobEventTypes,
) => {
  const eventOccurrence = await getEventOccurrences(
    handlerConfig,
    handlerConfig.occurrences ?? 0,
    jobEventType,
  );

  logger.debug(
    `handling event ${handlerConfig.config_id}. calculated occurrence ${eventOccurrence}`,
  );
  if (
    handlerConfig.occurrences &&
    eventOccurrence !== undefined &&
    Number(eventOccurrence) < handlerConfig.occurrences
  ) {
    // doesn't hit the occurrence threshold if found
    return;
  }
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
      - Duration : ${dayJs.duration(finalDuration, "seconds").humanize()}
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
        duration (${finalDuration}) has crossed the threshold (${handlerConfig.durationThreshold}) with ${eventOccurrence} occurrences`;
        return handleEventNotification(handlerConfig, message, title);
      }
      break;
    }

    case JobNotificationTriggers.REGEX_MESSAGE_MATCH: {
      if (!event || !handlerConfig.regex) return;
      if (!safe(handlerConfig.regex)) {
        logger.error("Regex provided for the notification handler is invalid");
        return;
      }
      const rxp = new RegExp(handlerConfig.regex!);
      const match = event.match(rxp);
      if (match) {
        const title = `Regex Match ${handlerConfig.job.name} job event`;
        const message = `
        Event triggered by ${handlerConfig.job.name} job :  
- Matching regex : ${handlerConfig.regex} 
- Event Message : ${event}
- Event Occurrences : ${eventOccurrence}`;
        return handleEventNotification(handlerConfig, message, title);
      }
    }
  }
};
