// taken from https://github.com/mozilla/node-convict/blob/e4964f278458809e475369b2bec6467317ef5a9c/packages/convict/src/main.js#L435
//

const custom_converters = new Map();
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

function isWindowsNamedPipe(x: any) {
  return String(x).includes("\\\\.\\pipe\\");
}

function isObj(o: any) {
  return typeof o === "object" && o !== null;
}

function traverseSchema(schema: any, path: string) {
  const ar = path.split(".");
  let o = schema;
  while (ar.length > 0) {
    const k = ar.shift();
    if (k && o && o._cvtProperties && o._cvtProperties[k]) {
      o = o._cvtProperties[k];
    } else {
      o = null;
      break;
    }
  }

  return o;
}

function getFormat(schema: any, path: string) {
  const o = traverseSchema(schema, path);
  if (o == null) {
    return null;
  }
  if (typeof o.format === "string") {
    return o.format;
  }
  if (o.default != null) {
    return typeof o.default;
  }
  return null;
}

function coerce(k: string, v: any, schema: any, instance?: any) {
  const format = getFormat(schema, k);

  if (typeof v === "string") {
    if (custom_converters.has(format)) {
      return custom_converters.get(format)(v, instance, k);
    }
    switch (format) {
      case "port":
      case "nat":
      case "integer":
      case "int":
        v = parseInt(v, 10);
        break;
      case "port_or_windows_named_pipe":
        v = isWindowsNamedPipe(v) ? v : parseInt(v, 10);
        break;
      case "number":
        v = parseFloat(v);
        break;
      case "boolean":
        v = String(v).toLowerCase() !== "false";
        break;
      case "array":
        v = v.split(",");
        break;
      case "object":
        try {
          v = JSON.parse(v);
        } catch (err) {
          throw new Error(`Invalid JSON object in ${k} key`);
        }
        break;
      // TODO : Check recheck and safe-regex for a full app regex validation
      case "regexp":
        v = new RegExp(v);
        break;
      default:
      // TODO: Should we throw an exception here?
    }
  }

  return v;
}

// Adding the convict native function in order to handle loading the json object schema
// without forcing the config load to ignore env variables after the first time
export const overlay = (from: any, to: any, schema: any) => {
  Object.keys(from).forEach(function (k) {
    // leaf
    if (
      Array.isArray(from[k]) ||
      !isObj(from[k]) ||
      !schema ||
      schema.format === "object"
    ) {
      to[k] = coerce(k, from[k], schema);
    } else {
      if (!isObj(to[k])) {
        to[k] = {};
      }
      overlay(from[k], to[k], schema?._cvtProperties?.[k]);
    }
  });
};
