import { configure } from "safe-stable-stringify";

type SafeStringify = (
  value: unknown,
  replacer?:
    | ((key: string, value: unknown) => unknown)
    | (number | string)[]
    | null,
  space?: string | number,
) => string | undefined;

/**
 * A custom JSON.stringify replacements that handles bigIng and circular correctly
 */
export const stringify: SafeStringify = configure({
  bigint: true,
  deterministic: false,
});

export const stringifyLossless: SafeStringify = configure({
  bigint: "string",
  deterministic: false,
});
