import { t } from "elysia";

import { isAuthenticated } from "@auth/guards/authenticated.guard";
import {
  getConfigWithDBEncryptionStatus,
  getConvictSchemaProperties,
  ObjectifyFlattenedProperties,
  updateMultiConfig,
} from "@config/config.service";
import {
  backupBaseDB,
  backupSchedulerDB,
  getBaseDatabaseInfo,
  getSchedulerDatabaseInfo,
} from "@repositories/systemRepository";
import { FlattenedProperties } from "@typesDef/models/config";
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
    return ObjectifyFlattenedProperties(config);
  })
  .post(
    "/updateConfig",
    async ({ body, set }) => {
      const userId = set.headers["x-user-id"];
      return await updateMultiConfig(body, userId);
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
