import { prisma } from "@initialization/index";
import { PromisePool } from "@supercharge/promise-pool";
import {
  AuditMetadata,
  GetJobLogFilesParams,
  LogFileMetadata,
  PaginatedLogs,
  ReadLogFileParams,
} from "@typesDef/models/logs";
import { findFiles } from "@utils/jobUtils";
import {
  getJobLogMetadata,
  readFileStats,
  readLogFilePaginated,
} from "@utils/logFileUtils";
import logger from "@utils/loggers";
import bun from "bun";
import path from "path";

const LogDirs = {
  SysLogEvent: "src/logs/system/event_log_SysLogEvent",
  JobScheduleEvent: "src/logs/system/event_log_JobScheduleEvent",
};

async function validateJobIdAndPathname(filePath: string, jobId?: number) {
  if (!jobId) {
    const correctPath = Object.values(LogDirs).find((e: string) =>
      filePath.includes(e),
    );
    if (!correctPath) {
      throw new Error("Log file path is not found");
    }
    return filePath;
  }
  const job = await prisma.schedule_job.findFirst({
    where: {
      job_id: jobId,
    },
  });
  if (!job || !path.basename(filePath).includes(job.job_name)) {
    throw new Error(`Job with id: ${jobId} is not found`);
  }
  return jobId;
}

export async function getWinstonLogFilesMetadata(
  logPath: string,
  logFilePattern: string,
  auditName: string,
  auditPath: string,
) {
  const pattern = new RegExp(logFilePattern);
  const filteredFiles = findFiles(logPath, [], pattern);

  const auditMetadata = (await getJobLogMetadata(auditName, auditPath))?.reduce(
    (p, c) => {
      p[c.name] = c;
      return p;
    },
    {} as { [key: string]: AuditMetadata },
  );

  const { results: allFiles } = await PromisePool.for(filteredFiles)
    .withConcurrency(4)
    .handleError((err) => {
      logger.error(`Error when getting job log files for ${auditName}`);
      logger.error(err);
    })
    .process(async (filePath) => {
      if (auditMetadata?.[filePath.slice(1)])
        return auditMetadata[filePath.slice(1)];
      const fileStats = await readFileStats(filePath);
      return {
        name: filePath,
        date: fileStats.createdAt?.getTime(),
        fileStats,
      };
    });

  return {
    data: allFiles.sort(
      (a, b) => b.fileStats.lastModified - a.fileStats.lastModified,
    ),
    total: filteredFiles.length,
  };
}

export async function getJobLogFiles({ jobId }: GetJobLogFilesParams): Promise<{
  data: LogFileMetadata[];
  total: number;
}> {
  const job = await prisma.schedule_job.findUnique({
    where: { job_id: Number(jobId) },
  });

  if (!job) {
    return { data: [], total: 0 };
  }

  return await getWinstonLogFilesMetadata(
    "src/logs/jobs",
    `job_log_${job.job_name}(?!.*\\.zip$)`,
    job.job_name,
    "src/logs/jobs/audits",
  );
}

export async function getSystemLogFiles(): Promise<{
  data: LogFileMetadata[];
  total: number;
}> {
  return await getWinstonLogFilesMetadata(
    "src/logs/system",
    "event_log_SysLogEvent(?!.*\\.zip$)",
    "SysLogEvent",
    "src/logs/system/audits",
  );
}

export async function getScheduleEventsLogFiles(): Promise<{
  data: LogFileMetadata[];
  total: number;
}> {
  return await getWinstonLogFilesMetadata(
    "src/logs/system",
    "event_log_JobScheduleEvent(?!.*\\.zip$)",
    "JobScheduleEvent",
    "src/logs/system/audits",
  );
}

export async function readLogFile({
  filePath,
  limit = 100,
  offset = 0,
  jobId,
}: ReadLogFileParams): Promise<PaginatedLogs> {
  const fullPath = path.join(path.parse(bun.main).dir, "..", filePath);
  const file = bun.file(fullPath);
  if (!(await file.exists())) {
    throw new Error("Log file not found", { cause: 404 });
  }
  await validateJobIdAndPathname(filePath, jobId);

  return readLogFilePaginated(fullPath, limit, offset);
}

export async function downloadLogFile({
  filePath,
  jobId,
}: ReadLogFileParams): Promise<any> {
  const fullPath = path.join(path.parse(bun.main).dir, "..", filePath);
  const file = bun.file(fullPath);
  if (!(await file.exists())) {
    throw new Error("Log file not found", { cause: 404 });
  }
  await validateJobIdAndPathname(filePath, jobId);

  return file;
}
