export const parseJsDoc = (raw: string) => {
  const lines = raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const meta: Record<string, any> = {};
  const commentLines: string[] = [];

  for (const line of lines) {
    const match = line.match(/^([a-zA-Z0-9_-]+)\s*:\s*(.+)$/);

    if (match) {
      const [, key, rawValue] = match;

      let value: any = rawValue.trim();
      if (value === "true") value = true;
      else if (value === "false") value = false;
      else if (!isNaN(Number(value))) value = Number(value);

      meta[key] = value;
    } else {
      commentLines.push(line);
    }
  }

  return {
    comment: commentLines.join(" "),
    meta,
  };
};
