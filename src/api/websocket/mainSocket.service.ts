import { ElysiaWS } from "elysia/dist/ws";

import { getAllPendingJobEvents } from "@repositories/events";
import {
  EventLogNotification,
  JobNotificationTopics,
  MiscNotificationTopics,
  MiscNotificationTopicsList,
} from "@typesDef/api/websocket";
import { JobDTO } from "@typesDef/models/job";
import currentRunsManager from "@utils/CurrentRunsManager";

export default {
  clients: {} as { [key: string]: ElysiaWS<any> },
  topicsSubscriptions: {} as { [key: string]: string[] },
  socket: null,
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
    const jobEvents = await getAllPendingJobEvents({
      handled: false,
    });

    (clientId ? this.clients[clientId].send : this.broadcastMessage)({
      id: JobNotificationTopics.Status,
      data: JSON.stringify({
        runningJobCount: currentRunsManager.getRunningJobCount(),
        jobEvents: {
          errorsCount: jobEvents[0]?.events?.errors?.length,
          warningsCount: jobEvents[0]?.events?.warnings?.length,
        },
      }),
    });
  },
  subscribeToTopic(userId: string, topics: string[]) {
    if (topics.every((e) => MiscNotificationTopicsList.includes(e))) {
      this.topicsSubscriptions[userId] = Array.from(
        new Set([...(this.topicsSubscriptions[userId] ?? []), ...topics]),
      );
    }
  },
  unsubscribeFromTopics(userId: string, topics: string[]) {
    this.topicsSubscriptions[userId] = this.topicsSubscriptions[userId].filter(
      (e) => !topics.includes(e),
    );
  },
};
