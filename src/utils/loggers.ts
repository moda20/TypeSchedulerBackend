import config from "@config/config";
import pino, { Logger, TransportTargetOptions } from "pino";
import type { LokiOptions } from "pino-loki";

const JobLokiTransportTemplate = {
  target: "pino-loki",
  options: <LokiOptions>{
    batching: true,
    host: config.get("grafana.lokiUrl") || "",
    basicAuth: {
      username: config.get("grafana.username") || "",
      password: config.get("grafana.password") || "",
    },
    formattingTemplate: "${log.timeParsed} | ${log.levelParsed} | ${log.msg}",
    propsToLabels: ["logId"],
  },
};

const loggers: { [key: string]: Logger } = {};

const JobLogger = (id: string, name: string) => {
  if (loggers[id]) return loggers[id];
  const lokiTransport = Object.assign({}, JobLokiTransportTemplate);
  lokiTransport.options.labels = {
    app: config.get("appName"),
    job: name,
    uniqueId: id,
  };
  const transports = <TransportTargetOptions[]>[
    config.get("grafana.lokiUrl") && lokiTransport,
    config.get("files.exportJobLogsToFiles") && {
      target: "pino-roll",
      options: {
        file: `./src/logs/jobs/job_log_${name}_${id}.log`,
        size: "7m",
        frequency: 604800000, // 7 days
        limit: {
          count: 10,
        },
        mkdir: true,
      },
    },
    config.get("env") === "development" && {
      target: "pino-pretty",
      options: { destination: 1, colorize: true, ignore: "pid,hostname,logId" },
    },
  ].filter((e) => !!e);
  const jobTransport = pino.transport({
    targets: transports,
  });
  jobTransport.on("error", (err: any) => {
    generalLogger.error(`error caught on job transport ${err}`);
  });
  jobTransport.on("unhandledRejection", (err: any) => {
    generalLogger.error(`unhandledRejection caught on job transport ${err}`);
  });
  jobTransport.on("uncaughtException", (err: any) => {
    generalLogger.error(`uncaughtException caught on job transport ${err}`);
  });
  jobTransport.on("exit", (err: any) => {
    generalLogger.error(`exit caught on job transport ${err}`);
  });

  loggers[id] = pino(jobTransport);
  return loggers[id];
};

const generalTransport = pino.transport({
  targets: <TransportTargetOptions[]>[
    {
      target: "pino/file",
      level: "info",
      options: { destination: "./src/logs/info.log", mkdir: true },
    },
    config.get("server.logToConsole") && {
      target: "pino-pretty",
      level: "error",
      options: { destination: 1, colorize: true, ignore: "pid,hostname" },
    },
    config.get("server.logToConsole") && {
      target: "pino-pretty",
      level: "info",
      options: { destination: 1, colorize: true, ignore: "pid,hostname" },
    },
    {
      target: "pino/file",
      level: "error",
      options: { destination: "./src/logs/error.log", mkdir: true },
    },
  ].filter((e) => !!e),
  dedupe: true,
});

generalTransport.on("error", (err: any) => {
  console.error("error caught in general logger", err);
});

const generalLogger = pino(generalTransport);

export default generalLogger;
export { JobLogger };
