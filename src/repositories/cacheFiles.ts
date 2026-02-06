import config from "@config/config";
import { prisma } from "@initialization/index";
import { newCacheFileConfig } from "@typesDef/models/outputFiles";
import dayjs from "@utils/dayJs";
import { resolveFilePath } from "@utils/fileUtils";
import logger from "@utils/loggers";
import bun from "bun";
import { join, parse } from "path";

export const saveCacheFile = async ({
  fileName,
  data,
  tags,
  type,
  jobLogId,
  ttl,
  newFile = false,
}: newCacheFileConfig) => {
  const filePath = resolveFilePath(
    join(
      "outputs",
      "files",
      config.get("files.cacheFilesRootPath"),
      `${newFile ? "_" + new Date().getTime().toString() + "_" : ""}${fileName}`,
    ),
  );
  await bun.write(filePath, data);
  const dataBuffer = Buffer.from(data);
  if (!newFile) {
    await prisma.cache_files
      .deleteMany({
        where: {
          file_name: fileName,
        },
      })
      .catch(logger.error);
  }
  return prisma.cache_files
    .create({
      data: {
        job_log_id: jobLogId?.toString(),
        file_name: fileName,
        file_tags: tags,
        file_path: filePath,
        file_size: dataBuffer.byteLength,
        file_type: type,
        time_to_live: ttl,
      },
    })
    .then((dbOutput) => ({ dbOutput, filePath }));
};

export const getCacheFile = async ({ filename }: { filename: string }) => {
  return prisma.cache_files
    .findFirstOrThrow({
      where: {
        file_name: filename,
      },
    })
    .then(async (fileRow) => {
      const isFileDated = dayjs(fileRow.created_at)
        .add(Number(fileRow.time_to_live), "second")
        .isBefore(dayjs());
      if (isFileDated) {
        return Promise.resolve(null);
      }
      const fileData = await bun.file(fileRow.file_path).text();
      return { fileData, fileRow };
    })
    .catch(() => {
      return null;
    });
};

export const getJobCacheFiles = async ({
  jobId,
  limit,
  offset,
}: {
  jobId: string;
  limit?: number;
  offset?: number;
}) => {
  const [data, count] = await Promise.all([
    prisma.schedule_job
      .findFirst({
        where: {
          job_id: Number(jobId),
        },
        include: {
          job_logs: {
            take: limit,
            skip: offset,
            orderBy: {
              start_time: "desc",
            },
            where: {
              cache_files: {
                some: {},
              },
            },
            include: {
              cache_files: {
                orderBy: {
                  created_at: "desc",
                },
              },
            },
          },
        },
      })
      .then((job) => {
        if (!job) return [];
        return job?.job_logs.flat();
      }),
    prisma.schedule_job_log.findMany({
      where: {
        job_id: Number(jobId),
        cache_files: {
          some: {},
        },
      },
    }),
  ]);

  return {
    data: data,
    total: count.length,
  };
};

export const getCacheFilePath = async ({
  id,
  fileName,
}: {
  id: number;
  fileName: string;
}) => {
  return prisma.cache_files
    .findFirstOrThrow({
      where: {
        id,
        file_name: fileName,
      },
    })
    .then((fileRow) => fileRow.file_path);
};

export const deleteCacheFile = async ({
  id,
  fileName,
}: {
  id: number;
  fileName: string;
}) => {
  return prisma.$transaction(async (tx) => {
    const cacheFile = await tx.cache_files.findFirstOrThrow({
      where: {
        id,
        file_name: fileName,
      },
    });

    await bun.file(cacheFile.file_path).delete();

    await prisma.cache_files.delete({
      where: {
        id,
        file_name: fileName,
      },
    });
  });
};
