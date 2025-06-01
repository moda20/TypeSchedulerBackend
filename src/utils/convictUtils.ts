// taken from https://github.com/mozilla/node-convict/blob/e4964f278458809e475369b2bec6467317ef5a9c/packages/convict/src/main.js#L435
//
export const walk = (obj: any, path: string, initializeMissing: boolean) => {
  if (path) {
    const ar = path.split(".");
    while (ar.length) {
      const k = ar.shift()!;
      if (initializeMissing && obj[k] == null) {
        obj[k] = {};
        obj = obj[k];
      } else if (k in obj) {
        obj = obj[k];
      } else {
        throw new Error(`cannot find configuration param '${path}'`);
      }
    }
  }

  return obj;
};
