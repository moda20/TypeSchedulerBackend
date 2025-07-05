import config from "@config/config";
import dayjs from "@utils/dayJs";
import chalk from "chalk";
import pino, { TransportTargetOptions } from "pino";
import { createLogger, format, Logger, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import LokiTransport from "winston-loki";

import "winston-daily-rotate-file";

const loggers: { [key: string]: Logger } = {};

const regularLoggerFormat = format.combine(
  format.timestamp(),
  format.printf(
    (info) =>
      `${info.timestamp} | ${info.level.padEnd(5).toUpperCase()} | ${info.message}`,
  ),
);

const JobLogger = (uniqueId: string, name: string) => {
  if (loggers[uniqueId]) return loggers[uniqueId];
  const options = (
    level: string,
  ): DailyRotateFile.DailyRotateFileTransportOptions => ({
    filename: `./src/logs/jobs/job_log_${name}_${uniqueId}.log`,
    auditFile: `./src/logs/jobs/audits/${name}-audit.json`,
    level,
    json: true,
    format: regularLoggerFormat,
    maxSize: "20m",
  });
  const transportsList = [
    config.get("files.exportJobLogsToFiles") &&
      new transports.DailyRotateFile(options("info")),
    new transports.Console({
      ...options("info"),
      format: format.combine(
        format.timestamp(),
        format.printf(
          (info) =>
            `[${dayjs(info.timestamp as string).format("HH:mm:ss.SSS")}] ${chalk.green(info.level.padEnd(4).toUpperCase())}: ${chalk.hex("#008080")(info.message)}`,
        ),
      ),
    }),
    config.get("grafana.lokiUrl") &&
      new LokiTransport({
        host: config.get("grafana.lokiUrl") || "",
        batching: false,
        timeout: 3600000,
        basicAuth: config.get("grafana.username")
          ? `${config.get("grafana.username")}:${config.get("grafana.password")}`
          : undefined,
        format: format.combine(
          format.timestamp(),
          format.printf(
            (info) =>
              `${info.timestamp} | ${info.level.padEnd(5).toUpperCase()} | ${info.message}`,
          ),
        ),
        labels: {
          app: config.get("appName"),
          job: name,
          uniqueId: uniqueId,
          level: "info",
        },
        useWinstonMetaAsLabels: true,
        ignoredMeta: ["level"],
        metaToUseAsLabels: ["logId"],
        onConnectionError: (err) => {
          console.log("onConnectionError", err);
          generalLogger.error(`onConnectionError ${err}`);
        },
        handleExceptions: true,
        handleRejections: true,
      }),
  ].filter((e) => !!e);
  const newLogger = createLogger({
    transports: transportsList,
  });
  loggers[uniqueId] = newLogger;
  return newLogger;
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
      options: {
        destination: 1,
        colorize: true,
        ignore: "pid,hostname",
      },
    },
    config.get("server.logToConsole") && {
      target: "pino-pretty",
      level: "info",
      options: {
        destination: 1,
        colorize: true,
        ignore: "pid,hostname",
      },
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
export { JobLogger, loggers };
