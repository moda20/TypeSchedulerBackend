import { ElysiaWS } from "elysia/dist/ws";

import { getAllPendingJobEvents } from "@repositories/events";
import { LogEventNames } from "@typesDef/api/jobs";
import {
  EventLogNotification,
  JobNotificationTopics,
  MiscNotificationTopics,
} from "@typesDef/api/websocket";
import { JobDTO } from "@typesDef/models/job";
import currentRunsManager from "@utils/CurrentRunsManager";
import { eventLog } from "@utils/loggers";
import { isAcceptedTopic } from "@utils/socketUtils";

export default {
  clients: {} as { [key: string]: ElysiaWS<any> },
  topicsSubscriptions: {} as { [key: string]: string[] },
  socket: null,
  sysLog: (err: any) => {
    const sysLog = eventLog(LogEventNames.SysLogEvent);
    sysLog.warn(err, {
      eventName: "STATUS_VIA_SOCKET_FAILED",
    });
  },
  setWsClient(client: any, userId: string) {
    this.clients[userId] = client;
    this.socket = client;
  },
  broadcastMessage(message: any, topic?: string) {
    Object.keys(this.clients).forEach((userId: string) => {
      if (topic) {
        if (this.topicsSubscriptions[userId]?.includes(topic)) {
          this.clients[userId]?.send(message);
        }
      } else {
        this.clients[userId]?.send(message);
      }
    });
  },
  sendJobStartingNotification(job: JobDTO, runningJobCount: number) {
    this.broadcastMessage({
      id: JobNotificationTopics.JobStarted,
      data: JSON.stringify({
        message: "Job started",
        jobId: job.id,
        jobName: job.name,
        runningJobCount: runningJobCount,
        isSingular: !!job.getUniqueSingularId(),
        averageTime: job.averageTime,
      }),
    });
  },
  sendJobEndingNotification(job: JobDTO, runningJobCount: number) {
    this.broadcastMessage({
      id: JobNotificationTopics.JobFinished,
      data: JSON.stringify({
        message: "Job finished",
        jobId: job.id,
        jobName: job.name,
        runningJobCount: runningJobCount,
        isSingular: !!job.getUniqueSingularId(),
        averageTime: job.averageTime,
      }),
    });
  },
  sendEventLogNotification(message: EventLogNotification) {
    this.broadcastMessage(
      {
        id: MiscNotificationTopics.EventLog,
        data: JSON.stringify(message),
      },
      MiscNotificationTopics.EventLog,
    );
  },

  async sendJobStatusEvents(clientId?: string) {
    try {
      const jobEvents = await getAllPendingJobEvents({
        unhandled: true,
      });

      const message = {
        id: JobNotificationTopics.Status,
        data: JSON.stringify({
          runningJobCount: currentRunsManager.getRunningJobCount(),
          jobEvents: jobEvents,
        }),
      };
      if (clientId) {
        return this.clients[clientId]?.send(message);
      } else {
        return this.broadcastMessage(message);
      }
    } catch (err) {
      this.sysLog(err);
    }
  },
  subscribeToTopic(userId: string, topics: string[]) {
    if (topics.every(isAcceptedTopic)) {
      this.topicsSubscriptions[userId] = Array.from(
        new Set([...(this.topicsSubscriptions[userId] ?? []), ...topics]),
      );
    }
  },
  unsubscribeFromTopics(userId: string, topics: string[]) {
    this.topicsSubscriptions[userId] =
      this.topicsSubscriptions[userId]?.filter((e) => !topics.includes(e)) ??
      [];
  },
};
