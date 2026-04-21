import { t } from "elysia";

import { proxy_status } from "@generated/prisma";
import {
  addProxy,
  addProxyToJob,
  deleteProxy,
  getAllProxies,
  getProxy,
  removeProxyFromJob,
  updateProxy,
} from "@repositories/proxies";
import { createElysia } from "@utils/createElysia";
import qs from "qs";

export const proxiesController = createElysia({ prefix: "/proxies" })
  .onBeforeHandle(({ set }) => {
    set.headers["content-type"] = "application/json; charset=utf-8";
  })
  .onTransform((ctx) => {
    // @ts-ignore
    ctx.query = qs.parse(new URL(ctx.request.url).search.slice(1));
  })
  .get(
    "/getAllProxies",
    ({ query }) => {
      return getAllProxies({
        limit: Number(query.limit ?? 10),
        offset: Number(query.offset ?? 0),
        search: query.search ?? "",
      });
    },
    {
      query: t.Object({
        limit: t.Optional(t.Number()),
        offset: t.Optional(t.Number()),
        search: t.Optional(t.String()),
      }),
    },
  )
  .get(
    "/getProxy",
    ({ query }) => {
      return getProxy(Number(query.id));
    },
    {
      query: t.Object({
        id: t.Optional(t.Number()),
      }),
    },
  )
  .post(
    "/addProxy",
    ({ body }) => {
      return addProxy({
        ...body,
        proxy_port: Number(body.proxy_port),
        status: proxy_status[body.status as keyof typeof proxy_status],
      });
    },
    {
      body: t.Object({
        proxy_ip: t.String(),
        proxy_port: t.Union([t.Number(), t.String()]),
        protocol: t.String(),
        username: t.Optional(t.String()),
        password: t.Optional(t.String()),
        description: t.Optional(t.String()),
        status: t.Optional(t.String()),
      }),
    },
  )
  .put(
    "/updateProxy",
    ({ body }) => {
      return updateProxy({
        ...body,
        status: body.status
          ? proxy_status[body.status as keyof typeof proxy_status]
          : undefined,
      });
    },
    {
      body: t.Object({
        id: t.Number(),
        proxy_ip: t.Optional(t.String()),
        proxy_port: t.Optional(t.Number()),
        protocol: t.Optional(t.String()),
        username: t.Optional(t.String()),
        password: t.Optional(t.String()),
        description: t.Optional(t.String()),
        status: t.Optional(t.String()),
      }),
    },
  )
  .delete(
    "/deleteProxy",
    ({ query }) => {
      return deleteProxy(Number(query.id ?? 0));
    },
    {
      query: t.Object({
        id: t.Union([t.Number(), t.String()]),
      }),
    },
  )
  .post(
    "/addProxyToJob",
    ({ body }) => {
      return addProxyToJob(Number(body.id ?? 0), body.job_ids);
    },
    {
      body: t.Object({
        id: t.Number(),
        job_ids: t.Array(t.Number()),
      }),
    },
  )
  .post(
    "/removeProxyFromJob",
    ({ body }) => {
      return removeProxyFromJob(Number(body.id ?? 0), body.job_id);
    },
    {
      body: t.Object({
        id: t.Number(),
        job_id: t.Number(),
      }),
    },
  );
