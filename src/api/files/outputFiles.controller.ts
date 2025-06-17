import { t } from "elysia";

import {
  deleteCacheFile,
  getCacheFilePath,
  getJobCacheFiles,
} from "@repositories/cacheFiles";
import {
  deleteOutputFile,
  getJobOutputFiles,
  getOutputFilePath,
} from "@repositories/outputFiles";
import { createElysia } from "@utils/createElysia";
import { toJSON } from "@utils/jobUtils";
import { file } from "bun";
import qs from "qs";

export const outputFilesController = createElysia({ prefix: "/files" })
  .onBeforeHandle(({ set, path }) => {
    if (!path?.toLowerCase().includes("download")) {
      set.headers["content-type"] = "application/json; charset=utf-8";
    }
  })
  .onTransform((ctx) => {
    // @ts-ignore
    ctx.query = qs.parse(new URL(ctx.request.url).search.slice(1));
  })
  .get(
    "/getCachedFiles",
    async ({ query }) => {
      const { jobId, limit, offset } = query;
      return await getJobCacheFiles({ jobId, limit, offset }).then(toJSON);
    },
    {
      query: t.Object({
        jobId: t.String(),
        limit: t.Optional(t.Number()),
        offset: t.Optional(t.Number()),
      }),
    },
  )
  .get(
    "/getOutputFiles",
    async ({ query }) => {
      const { jobId, limit, offset } = query;
      return await getJobOutputFiles({ jobId, limit, offset }).then(toJSON);
    },
    {
      query: t.Object({
        jobId: t.String(),
        limit: t.Optional(t.Number()),
        offset: t.Optional(t.Number()),
      }),
    },
  )
  .get(
    "/downloadCacheFile",
    async ({ query }) => {
      const { id, fileName } = query;
      const filePath = await getCacheFilePath({ id: Number(id), fileName });
      return file(filePath);
    },
    {
      query: t.Object({
        id: t.Union([t.Number(), t.String()]),
        fileName: t.String(),
      }),
    },
  )
  .get(
    "/downloadOutputFile",
    async ({ query }) => {
      const { id, fileName } = query;
      const filePath = await getOutputFilePath({ id: Number(id), fileName });
      return file(filePath);
    },
    {
      query: t.Object({
        id: t.Union([t.Number(), t.String()]),
        fileName: t.String(),
      }),
    },
  )
  .delete(
    "/deleteCacheFile",
    async ({ query }) => {
      const { id, fileName } = query;
      return await deleteCacheFile({ id: Number(id), fileName });
    },
    {
      query: t.Object({
        id: t.Union([t.Number(), t.String()]),
        fileName: t.String(),
      }),
    },
  )
  .delete(
    "/deleteOutputFile",
    async ({ query }) => {
      const { id, fileName } = query;
      return await deleteOutputFile({ id: Number(id), fileName });
    },
    {
      query: t.Object({
        id: t.Union([t.Number(), t.String()]),
        fileName: t.String(),
      }),
    },
  );
