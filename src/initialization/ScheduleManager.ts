import config from "@config/config";
import logger from "@utils/loggers";
import schedulerManager from "schedule-manager";

import { startAllJobs } from "./jobsManager";

export async function start() {
  const initResult =
    await schedulerManager.ScheduleJobManager.initWithMySQLConfig(
      {
        host: config.get("DB.host") as string,
        port: config.get("DB.port") as number,
        user: config.get("DB.username") as string,
        password: config.get("DB.password") as string,
        database: config.get("DB.schedulerDatabaseName") as string,
        waitForConnections: true,
        connectionLimit: 5,
      },
      {
        loggers: logger,
      },
    );

  if (initResult.success) {
    const jobsStartResults = await startAllJobs();
    logger.info("scheduler jobs started successfully");
    logger.info(`${jobsStartResults.stats.foundJobs} jobs found`);
    logger.info(`${jobsStartResults.stats.startedJobs} jobs started`);
    logger.info(
      `${jobsStartResults.stats.errorStartingJobs} jobs failed to start`,
    );
    return { initResult, jobsStartResults };
  } else {
    logger.error(initResult);
    throw "Error when initializing scheduler";
  }
}
