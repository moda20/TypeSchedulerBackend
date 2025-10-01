import { t } from "elysia";

import { getEvents, setEventsToHandled } from "@repositories/events";
import { createElysia } from "@utils/createElysia";

export const JobEventsController = createElysia({ prefix: "/events" })
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
        type: t.Optional(t.String()),
        handled: t.Optional(t.Boolean()),
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
  );
