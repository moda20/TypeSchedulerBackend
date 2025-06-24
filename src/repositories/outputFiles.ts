import config from "@config/config";
import { prisma } from "@initialization/index";
import { newOutputFileConfig } from "@typesDef/models/outputFiles";
import logger from "@utils/loggers";
import * as bun from "bun";
import { join, parse } from "path";

export const saveNewFile = async ({
  fileName,
  data,
  tags,
  type,
  jobLogId,
  newFile = false,
}: newOutputFileConfig) => {
  const filePath = join(
    parse(bun.main).dir,
    "outputs",
    "files",
    config.get("files.outputFilesRootPath"),
    `${newFile ? "_" + new Date().getTime().toString() + "_" : ""}${fileName}`,
  );
  await bun.write(filePath, data);
  const dataBuffer = Buffer.from(data);
  if (!newFile) {
    await prisma.output_files
      .deleteMany({
        where: {
          file_name: fileName,
        },
      })
      .catch(logger.error);
  }
  return prisma.output_files
    .create({
      data: {
        job_log_id: jobLogId.toString(),
        file_name: fileName,
        file_tags: tags,
        file_path: filePath,
        file_size: dataBuffer.byteLength,
        file_type: type,
      },
    })
    .then((dbOutput) => ({ dbOutput, filePath }));
};

export const getOutputFilePath = async ({
  id,
  fileName,
}: {
  id: number;
  fileName: string;
}) => {
  return prisma.output_files
    .findFirstOrThrow({
      where: {
        id,
        file_name: fileName,
      },
    })
    .then((fileRow) => fileRow.file_path);
};

export const getJobOutputFiles = async ({
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
          job_logs: {
            some: {
              output_files: {
                some: {},
              },
            },
          },
        },
        include: {
          job_logs: {
            take: limit,
            skip: offset,
            orderBy: {
              start_time: "desc",
            },
            where: {
              output_files: {
                some: {},
              },
            },
            include: {
              output_files: {
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
        output_files: {
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

export const deleteOutputFile = async ({
  id,
  fileName,
}: {
  id: number;
  fileName: string;
}) => {
  return prisma.$transaction(async (tx) => {
    const outputFile = await tx.output_files.findFirstOrThrow({
      where: {
        id,
        file_name: fileName,
      },
    });

    await bun.file(outputFile.file_path).delete();

    await prisma.output_files.delete({
      where: {
        id,
        file_name: fileName,
      },
    });
  });
};
