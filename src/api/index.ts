import { jobLogsController } from "@api/files/jobLogs.controller";
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
import { APIError } from "@utils/ErrorHandler";
import logger from "@utils/loggers";
import { StatusCodes } from "http-status-codes";

export const apiRoutes = createElysia()
  .error({ APIError })
  .onError(({ code, error, path }) => {
    console.log(error);
    logger.error(
      `error when calling ${path} with code ${code} and error ${error}`,
    );
    const statusCode = getErrorCode({ code, error });
    const message = error.toString() ?? "Unknown system error";

    return Response.json(
      {
        error: message,
      },
      {
        status: statusCode,
      },
    );
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

const getErrorCode = ({
  code,
  error,
}: {
  code: string | number;
  error: any;
}) => {
  switch (code) {
    case "NOT_FOUND":
      return StatusCodes.NOT_FOUND;
    case "BAD_REQUEST":
      return StatusCodes.BAD_REQUEST;
    case "APIError":
      return error.httpCode ?? StatusCodes.BAD_REQUEST;
    default:
      if (!isNaN(Number(error.cause))) {
        return Number(error.cause);
      }
      return StatusCodes.BAD_REQUEST;
  }
};

apiRoutes.use(JobsController);
apiRoutes.use(systemController);
apiRoutes.use(outputFilesController);
apiRoutes.use(jobLogsController);
apiRoutes.use(proxiesController);
apiRoutes.use(websocketController);
apiRoutes.use(configController);
apiRoutes.use(notificationsController);
apiRoutes.use(JobEventsController);
