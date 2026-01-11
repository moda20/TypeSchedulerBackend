import { t } from "elysia";

import {
  downloadLogFile,
  getJobLogFiles,
  getScheduleEventsLogFiles,
  getSystemLogFiles,
  readLogFile,
} from "@repositories/loggging/jobLogs";
import { createElysia } from "@utils/createElysia";
import qs from "qs";

export const jobLogsController = createElysia({ prefix: "/files/logs" })
  .onBeforeHandle(({ set, path }) => {
    if (!path?.toLowerCase().includes("download")) {
      set.headers["content-type"] = "application/json; charset=utf-8";
    }
  })
  .onTransform((ctx) => {
    ctx.query = qs.parse(
      new URL(ctx.request.url).search.slice(1),
    ) as unknown as Record<string, string | undefined>;
  })
  .get(
    "/jobLogFiles",
    async ({ query }) => {
      const { jobId } = query;
      return await getJobLogFiles({
        jobId: jobId ? Number(jobId) : undefined,
      });
    },
    {
      query: t.Object({
        jobId: t.Optional(t.String()),
      }),
    },
  )
  .get("/systemLogfiles", async () => {
    return {
      sysEvents: await getSystemLogFiles(),
      scheduleEvents: await getScheduleEventsLogFiles(),
    };
  })
  .get(
    "/readLogFile",
    async ({ query }) => {
      const { filePath, limit, offset, jobId } = query;
      return await readLogFile({
        filePath,
        limit: limit ? Number(limit) : undefined,
        offset: offset ? Number(offset) : undefined,
        jobId: jobId ? Number(jobId) : undefined,
      });
    },
    {
      query: t.Object({
        filePath: t.String(),
        limit: t.Optional(t.String()),
        offset: t.Optional(t.String()),
        jobId: t.Optional(t.String()),
      }),
    },
  )
  .get(
    "/downloadLogFile",
    async ({ query }) => {
      const { filePath, jobId } = query;
      return await downloadLogFile({
        filePath,
        jobId: jobId ? Number(jobId) : undefined,
      });
    },
    {
      query: t.Object({
        filePath: t.String(),
        jobId: t.Optional(t.String()),
      }),
    },
  );
