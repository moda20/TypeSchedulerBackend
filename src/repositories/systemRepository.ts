import config from "@config/config";
import { basePrisma, prisma } from "@initialization/index";
import { PrismaClient } from "@prisma/client";
import logger from "@utils/loggers";
import bun from "bun";
import mysqldump from "mysqldump";
import { mkdir } from "node:fs/promises";
import { join, parse } from "path";

const getDbSizeQuery = (dbName: string) => {
  return `SELECT table_schema AS database_name, 
           ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS size_mb
    FROM information_schema.tables
    WHERE table_schema = '${dbName}'
    GROUP BY table_schema;`;
};
export const getSchedulerDatabaseSize = async (
  dbName: string,
  prismaClient: Partial<PrismaClient>,
): Promise<[{ size_mb: number }]> => {
  const query = getDbSizeQuery(dbName);
  return prismaClient.$queryRawUnsafe(query);
};

export const getSchedulerDatabaseInfo = async () => {
  const dbSize: [{ size_mb: number }] = await getSchedulerDatabaseSize(
    config.get("DB.schedulerDatabaseName"),
    prisma,
  );
  return {
    host: `${config.get("DB.host")}:${config.get("DB.port")}`,
    databaseName: config.get("DB.schedulerDatabaseName"),
    dbSize: dbSize[0]?.size_mb,
  };
};

export const getBaseDatabaseInfo = async () => {
  const dbSize: [{ size_mb: number }] = await getSchedulerDatabaseSize(
    config.get("baseDB.databaseName"),
    basePrisma,
  );
  return {
    host: `${config.get("baseDB.host")}:${config.get("baseDB.port")}`,
    databaseName: config.get("baseDB.databaseName"),
    dbSize: dbSize[0]?.size_mb,
  };
};

const mysqldumpDbDump = async ({
  host,
  user = "",
  password = "",
  database,
  port,
}: {
  host: string;
  user: string;
  password: string;
  database: string;
  port: number;
}) => {
  const pathToFile = join(
    parse(bun.main).dir,
    "outputs",
    "files",
    config.get("files.databaseBackupRootPath"),
  );
  const fileName = `${database}_backup_${new Date().toISOString()}.sql`;
  await mkdir(pathToFile, {
    recursive: true,
  }).catch((err) => {
    logger.error(`couldn't create directory for backup : ${err}`);
  });
  const fullPath = join(pathToFile, fileName);
  const result = await mysqldump({
    connection: {
      host: host,
      user: user,
      password: password,
      database: database,
      port: port,
    },
    dumpToFile: fullPath,
  });
  return {
    result,
    pathToFile: fullPath,
  };
};

export const backupSchedulerDB = async () => {
  return mysqldumpDbDump({
    host: config.get("DB.host"),
    user: config.get("DB.username"),
    password: config.get("DB.password"),
    database: config.get("DB.schedulerDatabaseName"),
    port: config.get("DB.port"),
  });
};

export const backupBaseDB = async () => {
  return mysqldumpDbDump({
    host: config.get("baseDB.host"),
    user: config.get("baseDB.username"),
    password: config.get("baseDB.password"),
    database: config.get("baseDB.databaseName"),
    port: config.get("baseDB.port"),
  });
};
