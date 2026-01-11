import { PromisePool } from "@supercharge/promise-pool";
import { AuditMetadata } from "@typesDef/models/logs";
import logger from "@utils/loggers";
import * as bun from "bun";
import * as fs from "node:fs";
import { join } from "path";

export async function parseAuditFile(
  auditFilePath: string,
): Promise<AuditMetadata[] | undefined> {
  try {
    const parsed = JSON.parse(fs.readFileSync(auditFilePath).toString());
    return parsed.files.map((f: any) => {
      f.deletionDate = calculateDeletionDate(
        parsed.keep.days,
        parsed.keep.amount,
        new Date(f.date),
      );
      return f;
    });
  } catch (error) {
    logger.error(`Error when parsing audit file ${auditFilePath}`);
    logger.error(error);
    return undefined;
  }
}

export function calculateDeletionDate(
  days: boolean,
  amount: number,
  createdAt: Date,
): Date | undefined {
  // if not days, the calculation is not needed
  if (!days) return undefined;

  const deletionDate = new Date(createdAt);
  deletionDate.setDate(deletionDate.getDate() + amount);
  return deletionDate;
}

export async function readFileStats(filePath: string): Promise<{
  size?: number;
  createdAt?: Date;
  lastModified?: Date;
}> {
  try {
    const parsedFilePath = filePath.startsWith("/")
      ? filePath.slice(1)
      : filePath;
    const file = bun.file(parsedFilePath);
    const stats = await file.stat();
    return {
      size: stats.size,
      createdAt: new Date(stats.atime),
      lastModified: new Date(stats.mtime),
    };
  } catch (error) {
    logger.error(`Error when reading file stats for ${filePath}`);
    logger.error(error);
    return {};
  }
}

export async function readLogFilePaginated(
  filePath: string,
  limit: number = 100,
  offset: number = 0,
): Promise<{ lines: string[]; nextOffset: number }> {
  const file = bun.file(filePath);
  const padding = 0;
  const start = Math.max(0, offset - padding);
  const end = offset + limit + padding;
  const stream = file.slice(start, end);
  const text = await stream.text();
  const lines = text.split("\n").filter((line: string) => line.trim());
  const consumedLines = Buffer.byteLength(lines.join("\n")) + 1;
  if (start > 0) lines.shift();
  lines.pop();

  return {
    lines: lines,
    nextOffset: offset + consumedLines,
  };
}

export async function getAuditFilePath(directory: string, jobName: string) {
  return join(directory, `${jobName}-audit.json`);
}

export async function getJobLogMetadata(
  jobName: string,
  auditDirectory: string,
): Promise<AuditMetadata[] | undefined> {
  const auditFilePath = await getAuditFilePath(auditDirectory, jobName);
  const auditMetadata = await parseAuditFile(auditFilePath);
  const { errors } = await PromisePool.for(auditMetadata ?? [])
    .withConcurrency(4)
    .process(async (file: any) => {
      file.fileStats = await readFileStats(file.name);
      return file;
    });

  if (errors?.length) {
    logger.error(`Error when parsing audit files for ${jobName}`);
    logger.error(errors);
  }

  return auditMetadata;
}
