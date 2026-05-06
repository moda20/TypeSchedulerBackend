import { getSystemInformation } from "@repositories/systemRepository";
import { createElysia } from "@utils/createElysia";
import qs from "qs";

export const statusController = createElysia({ prefix: "/status" })
  .onBeforeHandle(({ set, path }) => {
    if (!path?.toLowerCase().includes("download")) {
      set.headers["content-type"] = "application/json; charset=utf-8";
    }
  })
  .onTransform((ctx) => {
    // @ts-ignore
    ctx.query = qs.parse(new URL(ctx.request.url).search.slice(1));
  })
  .get("/version", () => {
    return getSystemInformation();
  });
