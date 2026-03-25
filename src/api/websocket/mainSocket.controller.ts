import { t } from "elysia";

import handleSocketMessage from "@api/websocket/mainSocket.communication";
import socketService from "@api/websocket/mainSocket.service";
import { isAuthenticated } from "@auth/guards/authenticated.guard";
import { JobNotificationTopics } from "@typesDef/api/websocket";
import { createElysia } from "@utils/createElysia";

export const websocketController = createElysia()
  .state("userId", undefined as unknown as number)
  .ws("/ws", {
    body: t.Object({
      message: t.Optional(t.String()),
      id: t.String(),
    }),
    message(ws, socketMessage) {
      handleSocketMessage(socketMessage, ws);
    },
    error(error: any) {
      console.log(error);
    },
    open(ws: any) {
      if (!ws.data.store.userId) {
        ws.send("Missing userId in query");
        ws.close(401);
        return;
      }
      socketService.setWsClient(ws, ws.data.store.userId);
      ws.send({
        id: JobNotificationTopics.NOOP,
      });
    },
    async beforeHandle({ set, jwtAccess, cookie, store }) {
      const isAuth = await isAuthenticated(jwtAccess, cookie);
      if (!isAuth.success) {
        set.status = 401;
        return {
          success: false,
          message: isAuth.message,
          errors: isAuth.errors,
        };
      }
      store.userId = Number(isAuth.data.id);
    },
  });
