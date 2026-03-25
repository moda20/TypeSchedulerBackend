import { t } from "elysia";

import {
  createApiKey,
  deleteApikey,
  getAllApiKeysForaUser,
} from "@repositories/apiKeys";
import { createElysia } from "@utils/createElysia";
import qs from "qs";

export const keysController = createElysia({ prefix: "/auth/keys" })
  .onBeforeHandle(({ set }) => {
    set.headers["content-type"] = "application/json; charset=utf-8";
  })
  .onTransform((ctx) => {
    // @ts-ignore
    ctx.query = qs.parse(new URL(ctx.request.url).search.slice(1));
  })
  .post("/keys", ({ store }) => {
    const userId = store.userId;
    return getAllApiKeysForaUser(Number(userId), true);
  })
  .post(
    "/createKey",
    async ({ body, store }) => {
      const userId = store.userId;
      return await createApiKey(Number(userId), body.name);
    },
    {
      body: t.Object({
        name: t.String(),
      }),
    },
  )
  .delete(
    "/deleteKey",
    async ({ body, store }) => {
      const userId = store.userId;
      return await deleteApikey(Number(userId), body.keyId);
    },
    {
      body: t.Object({
        keyId: t.String(),
      }),
    },
  );
