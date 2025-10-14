import { t } from "elysia";

import {
  getEvents,
  setAllEventsToHandled,
  setEventsToHandled,
} from "@repositories/events";
import { createElysia, ToArrayType } from "@utils/createElysia";
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
  .put("/serAllEventsToRead", () => {
    return setAllEventsToHandled();
  });
