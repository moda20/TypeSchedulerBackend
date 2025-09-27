import { ElysiaWS } from "elysia/dist/ws";

import {
  EventLogNotification,
  JobNotificationTopics,
  MiscNotificationTopics,
  MiscNotificationTopicsList,
} from "@typesDef/api/websocket";
import { JobDTO } from "@typesDef/models/job";

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
