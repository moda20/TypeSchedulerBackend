import { t } from "elysia";

import config from "@config/config";
import {
  exportJobsToJSON,
  getAllJobs,
  getAvailableConsumers,
  getFilteredJobs,
  getJobMetrics,
  getJobRuns,
  getJobStats,
  getLokiLogs,
  getRunningJobs,
  importJobsFromJSON,
  isJobRunning,
  jobActionExecution,
  queueJobExecution,
} from "@repositories/jobs";
import {
  BatchInputJob,
  createElysia,
  JobsAdvancedFilters,
} from "@utils/createElysia";
import currentRunsManager from "@utils/CurrentRunsManager";
import dayJs from "@utils/dayJs";
import { Nullable, toJSON } from "@utils/jobUtils";
import qs from "qs";

export const JobsController = createElysia({ prefix: "/jobs" })
  .onBeforeHandle(({ set }) => {
    set.headers["content-type"] = "application/json; charset=utf-8";
  })
  .onTransform((ctx) => {
    // @ts-ignore
    ctx.query = qs.parse(new URL(ctx.request.url).search.slice(1));
  })
  .get(
    "/allJobs",
    ({ query }) => {
      return getAllJobs({
        limit: Number(query.limit ?? 10),
        offset: Number(query.offset ?? 0),
        name: query.name ?? "",
        status: query.status ?? ["STARTED", "STOPPED"],
        sort: query.sorting ?? [],
        jobIds: query.jobIds?.map(Number),
      });
    },
    {
      query: t.Object({
        limit: t.Optional(t.String()),
        offset: t.Optional(t.String()),
        name: t.Optional(t.String()),
        jobIds: t.Optional(t.Array(t.Union([t.Number(), t.String()]))),
        status: t.Optional(t.Array(t.String())),
        sorting: t.Optional(
          t.Array(t.Object({ id: t.String(), desc: t.String() })),
        ),
      }),
    },
  )
  .post(
    "/filterJobs",
    ({ body }) => {
      return getFilteredJobs(body);
    },
    {
      body: JobsAdvancedFilters,
    },
  )
  .post(
    "/queueJobs",
    ({ body }) => {
      return queueJobExecution(body);
    },
    {
      body: t.Object({
        batchCount: t.Number(),
        batchDelay: t.Number(),
        executionOrderAttribute: t.Optional(t.String()),
        targetJobs: t.Optional(t.Array(t.Number())),
        waitBetweenBatches: t.Optional(t.Boolean()),
      }),
    },
  )
  .post(
    "/executeAction",
    ({ body }) => {
      const { jobId, action, config, jobIdList } = body;
      if (jobIdList) {
        return Promise.allSettled(
          jobIdList.map((id: string | number) => {
            return jobActionExecution(action, Number(id ?? ""), {});
          }),
        );
      }
      return jobActionExecution(action, Number(jobId ?? ""), { config });
    },
    {
      body: t.Object({
        jobId: t.Optional(t.Union([t.String(), t.Number()])),
        jobIdList: t.Optional(t.Array(t.Union([t.String(), t.Number()]))),
        action: t.String(),
        config: t.Optional(
          t.Object({
            name: t.Optional(t.String()),
            param: t.Optional(Nullable(t.String())),
            consumer: t.Optional(t.String()),
            cronSetting: t.Optional(t.String()),
          }),
        ),
      }),
    },
  )
  .get("/getAvailableConsumers", () => getAvailableConsumers())
  .get("/isJobRunning", ({ query }) => {
    return query.jobId ? isJobRunning(Number(query.jobId)) : false;
  })
  .get("/getJobStats", ({ query }) => {
    const startDate = query.startDate ? new Date(query.startDate) : undefined;
    const endDate = query.endDate ? new Date(query.endDate) : undefined;
    return getJobStats(startDate, endDate);
  })
  .get(
    "/jobMetrics",
    async ({ query }) => {
      const { jobIds } = query;
      return {
        ...(await getJobMetrics(jobIds).then((data) => toJSON(data[0]))),
        runningJobsCount: currentRunsManager.getRunningJobCount(),
      };
    },
    {
      query: t.Object({
        jobIds: t.Optional(t.Array(t.Number())),
      }),
    },
  )
  .get(
    "/jobLogs/loki",
    async ({ query }) => {
      const { start, end, query: queryString, mergeStreams } = query;
      if (!config.get("grafana.lokiUrl")) {
        throw new Error("Loki connection is not configured", {
          cause: 400,
        });
      }
      const { data } = await getLokiLogs(
        queryString,
        Number(start),
        Number(end),
      );
      if (mergeStreams) {
        const flattenedStreams = data.data.result.flatMap((stream: any) =>
          stream.values.map(([ts, line]: [string, string]) => [
            Number(ts),
            line,
            stream.stream,
          ]),
        );

        // sort by timestamp
        flattenedStreams.sort((a, b) => a[0] - b[0]);
        return flattenedStreams;
      } else {
        return data;
      }
    },
    {
      query: t.Object({
        start: t.Optional(t.Union([t.Number(), t.String()])),
        end: t.Optional(t.Union([t.Number(), t.String()])),
        query: t.String(),
        mergeStreams: t.Optional(t.Boolean()),
      }),
    },
  )
  .get("/getRunningJobs", () => {
    return getRunningJobs();
  })
  .get(
    "/getJobRuns",
    ({ query }) => {
      return getJobRuns(query);
    },
    {
      query: t.Object({
        jobId: t.String(),
        limit: t.Optional(t.Union([t.Number(), t.String()])),
        offset: t.Optional(t.Union([t.Number(), t.String()])),
      }),
    },
  )
  .post(
    "/exportJobsToJSON",
    ({ body, set }) => {
      set.headers["content-disposition"] =
        `attachment; filename="${dayJs().format("YYYY_MM_DD_HH_mm_ss")}_exported_jobs.json`;
      return exportJobsToJSON(body);
    },
    {
      body: t.Optional(
        t.Object({
          jobIds: t.Optional(t.Array(t.Number())),
          advancedFilters: t.Optional(JobsAdvancedFilters),
        }),
      ),
    },
  )
  .post(
    "/importJobsFromJSON",
    ({ body }) => {
      return importJobsFromJSON(body);
    },
    {
      body: t.Array(BatchInputJob),
    },
  );
