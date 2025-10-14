import { outputFilesController } from "@api/files/outputFiles.controller";
import { JobEventsController } from "@api/jobs/jobEvents.controller";
import { JobsController } from "@api/jobs/jobs.controller";
import { notificationsController } from "@api/notifications/notifications.controller";
import { proxiesController } from "@api/proxies/proxies.controller";
import { configController } from "@api/system/config.controller";
import { systemController } from "@api/system/system.controller";
import { websocketController } from "@api/websocket/mainSocket.controller";
import { isAuthenticated } from "@auth/guards/authenticated.guard";
import { createElysia } from "@utils/createElysia";
import logger from "@utils/loggers";

export const apiRoutes = createElysia()
  .onError(({ code, error, path }) => {
    console.log(error);
    logger.error(
      `error when calling ${path} with code ${code} and error ${error}`,
    );
    logger.error(error.cause);
    logger.error(error.stack);
    return new Response(error.toString(), {
      status: getErrorCode({ code, error }),
    });
  })
  .guard({
    async beforeHandle({ set, jwtAccess, cookie }) {
      const isAuth = await isAuthenticated(jwtAccess, cookie);
      if (!isAuth.success) {
        set.status = 401;
        return {
          success: false,
          message: isAuth.message,
          errors: isAuth.errors,
        };
      }
      set.headers["x-user-id"] = isAuth.data.id;
    },
  });

const getErrorCode = ({ code, error }: { code: string; error: any }) => {
  if (code === "NOT_FOUND") {
    return 404;
  }
  if (code === "BAD_REQUEST") {
    return 400;
  }
  if (!isNaN(Number(error.cause))) {
    return Number(error.cause);
  }
  return 500;
};

apiRoutes.use(JobsController);
apiRoutes.use(systemController);
apiRoutes.use(outputFilesController);
apiRoutes.use(proxiesController);
apiRoutes.use(websocketController);
apiRoutes.use(configController);
apiRoutes.use(notificationsController);
apiRoutes.use(JobEventsController);
