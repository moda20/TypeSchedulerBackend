import { Elysia, t } from "elysia";
import { staticPlugin } from "@elysiajs/static";

import { updateAdminMultiConfig } from "@config/adminConfig.service";
import config from "@config/config";
import {
  getConfigWithDBEncryptionStatus,
  ObjectifyFlattenedProperties,
} from "@config/config.service";
import { transposedConfigMap } from "@utils/convictUtils";
import encryptionUtils from "@utils/encryptionUtils";

const TRUSTED = new Set([
  "127.0.0.1",
  "::1",
  "::ffff:127.0.0.1",
  ...(config.get("admin.allowedIPs")?.split(",") ?? []),
]);

async function adminIndex() {
  const html = await Bun.file("./src/UI/dist/index.html").text();
  return new Response(
    html.replace("__CA_TOKEN__", encryptionUtils.signUiToken()),
    {
      headers: {
        "content-type": "text/html; charset=utf-8",
        "Cache-control": "no-store",
      },
    },
  );
}

export const adminServer = new Elysia({ prefix: "/admin" })
  // IP allowlist — instance-level onRequest so it covers index, assets and API routes
  .onRequest(({ request, server }) => {
    const ip = server?.requestIP(request)?.address;
    if (!ip || !TRUSTED.has(ip))
      return new Response("Forbidden", { status: 403 });
  })
  .use(
    await staticPlugin({
      // async! must await
      assets: "./src/UI/dist",
      prefix: "/",
      alwaysStatic: true,
      ignorePatterns: [/index\.html$/], // RegExp, not string
      etag: true,
      headers: { "cache-control": "public, max-age=31536000, immutable" },
    }),
  )
  .get("/", adminIndex)
  .guard(
    {
      // x-ui-token guard for the data/mutation API routes only
      // (index + assets stay public so the browser can bootstrap the token)
      beforeHandle({ headers, status }) {
        const token = headers["x-ui-token"];
        if (typeof token !== "string" || !encryptionUtils.verifyUiToken(token))
          return status(401, "Invalid or expired UI token");
      },
    },
    (app) =>
      app
        .get("/config", async () => {
          const config = await getConfigWithDBEncryptionStatus({
            returnNotificationServiceConfig: false,
          });
          return {
            configArray: ObjectifyFlattenedProperties(config),
            categoriesMap: transposedConfigMap,
          };
        })
        .post(
          "/updateConfig",
          async ({ body }) => {
            return await updateAdminMultiConfig(body);
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
        ),
  )
  .get("/*", adminIndex);
