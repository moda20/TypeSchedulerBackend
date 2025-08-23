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
