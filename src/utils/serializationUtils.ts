import { configure } from "safe-stable-stringify";

/**
 * A custom JSON.stringify replacements that handles bigIng and circular correctly
 */
export const stringify = configure({
  bigint: true,
  deterministic: false,
});

export const stringifyLossless = configure({
  bigint: "string",
  deterministic: false,
});
