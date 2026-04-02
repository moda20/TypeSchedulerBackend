import { t } from "elysia";

import {
  getConfigWithDBEncryptionStatus,
  ObjectifyFlattenedProperties,
  updateMultiConfig,
} from "@config/config.service";
import { categorizeConfig, transposedConfigMap } from "@utils/convictUtils";
import { createElysia } from "@utils/createElysia";
import qs from "qs";

export const configController = createElysia({ prefix: "/system/config" })
  .onBeforeHandle(({ set }) => {
    set.headers["content-type"] = "application/json; charset=utf-8";
  })
  .onTransform((ctx) => {
    // @ts-ignore
    ctx.query = qs.parse(new URL(ctx.request.url).search.slice(1));
  })
  .get("/getConfig", async () => {
    const config = await getConfigWithDBEncryptionStatus();
    return {
      configArray: ObjectifyFlattenedProperties(config),
      categoriesMap: transposedConfigMap,
    };
  })
  .get("/getCategorizedConfig", async () => {
    const config = await getConfigWithDBEncryptionStatus();
    return categorizeConfig(ObjectifyFlattenedProperties(config));
  })
  .post(
    "/updateConfig",
    async ({ body, store }) => {
      const userId = store.userId;
      return await updateMultiConfig(body, String(userId));
    },
    {
      body: t.Array(
        t.Object({
          key: t.String(),
          value: t.Nullable(t.String()),
          is_encrypted: t.Optional(t.Boolean()),
          doc: t.Optional(t.String()),
          deleted: t.Optional(t.Boolean()),
        }),
      ),
    },
  );
