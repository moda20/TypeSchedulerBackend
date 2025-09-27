import { ElysiaWS } from "elysia/dist/ws";

import { JobNotificationTopics } from "@typesDef/api/websocket";
import currentRunsManager from "@utils/CurrentRunsManager";
import { forceToArray } from "@utils/socketUtils";

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
      if (message.message) {
        const userId = ws.data.headers["x-user-id"];
        mainSocketService.subscribeToTopic(
          userId,
          forceToArray(message.message),
        );
      }
      break;
    }
    case JobNotificationTopics.UnsubscribeFromTopic: {
      if (message.message) {
        const userId = ws.data.headers["x-user-id"];
        mainSocketService.unsubscribeFromTopics(
          userId,
          forceToArray(message.message),
        );
      }
      break;
    }
  }
}
