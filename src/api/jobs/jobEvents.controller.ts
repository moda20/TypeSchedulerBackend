import { t } from "elysia";

import {
  getEvents,
  getEventsPerJob,
  getEventsTimeline,
  setAllEventsToHandled,
  setEventsToHandled,
} from "@repositories/events";
import { createElysia, ToArrayType } from "@utils/createElysia";
import { toJSON } from "@utils/jobUtils";
import qs from "qs";

export const JobEventsController = createElysia({ prefix: "/events" })
  .onBeforeHandle(({ set }) => {
    set.headers["content-type"] = "application/json; charset=utf-8";
  })
  .onTransform((ctx) => {
    // @ts-ignore
    ctx.query = qs.parse(new URL(ctx.request.url).search.slice(1));
  })
  .get(
    "/readEvents",
    ({ query }) => {
      return getEvents(query);
    },
    {
      query: t.Object({
        limit: t.Optional(t.Number()),
        offset: t.Optional(t.Number()),
        job_log_id: t.Optional(t.String()),
        job_id: t.Optional(ToArrayType),
        type: t.Optional(t.Array(t.String())),
        unhandled: t.Optional(t.Boolean()),
        dateFrom: t.Optional(t.String()),
        dateTo: t.Optional(t.String()),
      }),
    },
  )
  .put(
    "/setToRead",
    ({ body }) => {
      return setEventsToHandled({
        ids: body.ids ?? [],
      });
    },
    {
      body: t.Object({
        ids: t.Array(t.Union([t.Number(), t.String()])),
      }),
    },
  )
  .put(
    "/serAllEventsToRead",
    ({ body }) => {
      return setAllEventsToHandled(body);
    },
    {
      body: t.Object({
        jobId: t.Optional(t.Number()),
      }),
    },
  )
  .get("/eventMetrics", ({ query }) => {
    const startDate = query.startDate ? new Date(query.startDate) : undefined;
    const endDate = query.endDate ? new Date(query.endDate) : undefined;
    return getEventsTimeline(
      Number(query.period ?? 60),
      startDate,
      endDate,
    ).then(toJSON);
  })
  .get(
    "/eventsPerJob",
    ({ query }) => {
      const startDate = query.startDate ? new Date(query.startDate) : undefined;
      const endDate = query.endDate ? new Date(query.endDate) : undefined;
      return getEventsPerJob(
        query.jobIds?.map(Number),
        startDate,
        endDate,
        undefined,
        query.limit,
        query.offset,
        query.sorting,
      ).then(toJSON);
    },
    {
      query: t.Object({
        jobIds: t.Optional(t.Array(t.Union([t.Number(), t.String()]))),
        startDate: t.Optional(t.String()),
        endDate: t.Optional(t.String()),
        limit: t.Optional(t.Number()),
        offset: t.Optional(t.Number()),
        sorting: t.Optional(
          t.Array(t.Object({ id: t.String(), desc: t.String() })),
        ),
      }),
    },
  );
