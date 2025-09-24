import { ElysiaWS } from "elysia/dist/ws";

import { JobNotificationTopics } from "@typesDef/api/websocket";
import currentRunsManager from "@utils/CurrentRunsManager";

import mainSocketService from "./mainSocket.service";

export default function handleSocketMessage(message: any, ws: ElysiaWS<any>) {
  switch (message.id) {
    case JobNotificationTopics.Status: {
      ws.send({
        id: JobNotificationTopics.Status,
        data: JSON.stringify({
          runningJobCount: currentRunsManager.getRunningJobCount(),
        }),
      });
      break;
    }
    case JobNotificationTopics.SubscribeToTopic: {
      console.log(message);
      if (message.message) {
        const userId = ws.data.headers["x-user-id"];
        mainSocketService.subscribeToTopic(userId, [message.message]);
      }
      break;
    }
    case JobNotificationTopics.UnsubscribeFromTopic: {
      console.log(message);
      if (message.message) {
        const userId = ws.data.headers["x-user-id"];
        mainSocketService.unsubscribeFromTopics(userId, [message.message]);
      }
      break;
    }
  }
}
