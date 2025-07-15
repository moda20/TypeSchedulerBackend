import config from "@config/config";
import { syncConfigWithDB } from "@config/config.service";
import type { PrismaClient } from "@generated/prisma";
import { PrismaClient as BasePrismaClient } from "@generated/prisma_base";
import { seedBaseDatabase } from "@initialization/dbSeed";
import logger from "@utils/loggers";

import {
  configTableExists,
  createPrismaClient,
  runBaseMigrations,
  runMigrations,
} from "../../prisma";

import { start } from "./ScheduleManager";

let prisma: PrismaClient;
let basePrisma: BasePrismaClient;

export const initialize = async () => {
  [prisma, basePrisma] = await createPrismaClient();
  const configExists = await configTableExists();
  if (configExists) {
    await syncConfigWithDB();
  }
  logger.info("Migrating the database");
  runMigrations();
  runBaseMigrations();
  if (!configExists) {
    await syncConfigWithDB();
  }
  logger.info("Config synced with DB");
  await seedBaseDatabase();
  const managerResults = await start();
  logger.info("Schedule manager initialized");
  return { managerResults };
};

export { basePrisma, prisma };
