import { Elysia } from "elysia";
import cookie from "@elysiajs/cookie";
import { cors } from "@elysiajs/cors";
import { openapi } from "@elysiajs/openapi";
import { staticPlugin } from "@elysiajs/static";

import { apiRoutes } from "@api/index";
import { statusController } from "@api/system/status.controller";
import { auth } from "@auth/auth.controller";
import { jwtAccessSetup, jwtRefreshSetup } from "@auth/guards/setup.jwt";
import config from "@config/config";
import { helmetPlugin } from "@utils/helmetplugin";
import logger from "@utils/loggers";

import { initialize } from "./initialization";

const api = new Elysia();

// Setup

api.use(jwtAccessSetup).use(jwtRefreshSetup).use(cookie());
//Security;
api.use(
  cors({
    origin: () => true,
    credentials: true,
    exposeHeaders: ["Content-Disposition", "*"],
    allowedHeaders: ["content-type"],
    // @ts-ignore
    methods: ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"],
  }),
);
api.use(helmetPlugin);

// swagger
if (config.get("swaggerServer")) {
  api.use(
    openapi({
      path: "/api-docs",
      documentation: {
        info: {
          title: "Scheduler Backend API",
          description: "Scheduler Backend API Documentation",
          version: "0.0.0-pre-alpha",
        },
      },
    }),
  );
}

// Routes
api.use(auth);
api.use(apiRoutes);
api.use(statusController);
api.get("/", () => "Server is working");

api.use(
  staticPlugin({
    prefix: "public",
    assets: "public",
  }),
);

initialize()
  .then(() => {
    api.listen({
      port: config.get("server.port") as number,
      hostname: config.get("server.ip") as string,
    });
    logger.info(
      `🦊 Server is running at ${api.server?.hostname}:${process.env.PORT || 8080}`,
    );
  })
  .catch((err) => {
    logger.error("Error initializing the server");
    logger.error(err);
    if (api.server) {
      return api.stop();
    }
  });
