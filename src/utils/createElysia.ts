import { Elysia, t } from "elysia";

import { jwtAccessSetup, jwtRefreshSetup } from "@auth/guards/setup.jwt";

export const createElysia = (
  config?: ConstructorParameters<typeof Elysia>[0],
) =>
  new Elysia({ ...config, aot: process.env.RUNTIME === "bun" })
    .use(jwtAccessSetup)
    .use(jwtRefreshSetup);

export const FilterableType = t.Optional(
  t.Object({
    value: t.Optional(t.String()),
    type: t.String(),
    value1: t.Optional(t.Union([t.String(), t.Number()])),
    value2: t.Optional(t.Union([t.String(), t.Number()])),
  }),
);

export const JobsAdvancedFilters = t.Object({
  name: t.Optional(FilterableType),
  consumer: t.Optional(FilterableType),
  cronSetting: t.Optional(FilterableType),
  averageTime: t.Optional(FilterableType),
  latestRun: t.Optional(FilterableType),
  status: t.Optional(t.Array(t.String())),
  isRunning: t.Optional(t.Boolean()),
  sorting: t.Optional(t.Array(t.Object({ id: t.String(), desc: t.Boolean() }))),
});

export const BatchInputJob = t.Object({
  job_name: t.String(),
  job_param: t.String(),
  job_cron_setting: t.String(),
  consumer: t.String(),
  status: t.Optional(
    t.Union([
      t.Enum({ STOPPED: "STOPPED", STARTED: "STARTED" }),
      t.Array(t.Enum({ STOPPED: "STOPPED", STARTED: "STARTED" })),
    ]),
  ),
});
