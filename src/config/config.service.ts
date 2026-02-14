import config from "@config/config";
import { deleteConfig, getAllConfigs, saveConfig } from "@repositories/configs";
import { FlattenedProperties } from "@typesDef/models/config";
import logger from "@utils/loggers";

const flattenedProperties = (inputObj: any) => {
  return Object.keys(inputObj).reduce(
    (p, c) => {
      const cv = c.replace(/_cvtProperties/g, "");
      if (inputObj[c] && typeof inputObj[c] === "object") {
        const flp = flattenedProperties(inputObj[c]);
        Object.keys(flp).forEach((e) => {
          const ev = e.replace(/_cvtProperties_/g, "");
          p[`${cv ? cv + "_" : ""}${ev}`] = {
            value: flp[e]?.value,
            is_encrypted: false, // always false as it comes from convict
          };
        });
      } else {
        p[cv] = {
          value: inputObj[c],
          is_encrypted: false,
        };
      }
      return p;
    },
    {} as { [key: string]: { value: any; is_encrypted: boolean } },
  );
};

export const ObjectifyFlattenedProperties = (
  flattenedProperties: FlattenedProperties,
) => {
  const parsedCnfs = {} as { [key: string]: any };
  Object.keys(flattenedProperties)
    .map((key) => {
      return {
        key: key.split("_"),
        value: flattenedProperties[key],
      };
    })
    .forEach((input) => {
      let current = parsedCnfs;
      input.key.forEach((e, i) => {
        if (i === input.key.length - 1) {
          current[e] = input.value;
        } else {
          if (!(e in current)) {
            current[e] = {};
            current = current[e];
          } else {
            current = current[e];
          }
        }
      });
    });
  return parsedCnfs;
};

const verifyMasterKey = () => {
  const key = config.get("encryption.masterKey");
  if (!key) {
    throw new Error("Master key (env MASTER_ENCRYPTION_KEY) is not set");
  }
};

export const getConvictSchemaProperties = ({
  encryptedValues = true,
  onlyMirroredValues = true,
}: {
  encryptedValues?: boolean;
  onlyMirroredValues?: boolean;
} = {}) => {
  const propertiesValues: FlattenedProperties = flattenedProperties(
    config.getProperties(),
  );
  const flattenedSchema = flattenedProperties(config.getSchema());
  const schemaValues = Object.fromEntries(
    Object.keys(flattenedSchema).map((e) => {
      e.replace(/_cvtProperties_/g, "");
      return [e, flattenedSchema[e]];
    }),
  );
  // injecting extra properties from schema into property values;
  // TODO see if this can be suggested to convict in a PR
  Object.keys(propertiesValues).forEach((pvk) => {
    propertiesValues[pvk].is_encrypted =
      schemaValues[`${pvk}_sensitive`]?.value ?? false;
    propertiesValues[pvk].doc = schemaValues[`${pvk}_doc`]?.value ?? false;
    propertiesValues[pvk].default =
      schemaValues[`${pvk}_default`]?.value ?? false;
    propertiesValues[pvk].db_mirror =
      schemaValues[`${pvk}_db_mirror`]?.value ?? true; // save to db by default
    propertiesValues[pvk].format =
      schemaValues[`${pvk}_format`]?.value ?? "string"; // save to db by default
    if (schemaValues[`${pvk}_doc`]) {
      propertiesValues[pvk].base = true;
    }
    if (propertiesValues[pvk].is_encrypted && !encryptedValues) {
      propertiesValues[pvk].value = "*******************";
    } else {
      propertiesValues[pvk].value = propertiesValues[pvk].value?.toString();
    }
    if (onlyMirroredValues && !propertiesValues[pvk].db_mirror) {
      delete propertiesValues[pvk];
    }
  });

  return propertiesValues;
};

export const getConfigWithDBEncryptionStatus = async () => {
  const configList = getConvictSchemaProperties({
    encryptedValues: false,
    onlyMirroredValues: true,
  });
  const configFromDB = (await getAllConfigs()).reduce(
    (p, c) => {
      p[c.key] = {
        value: c.value,
        is_encrypted: c.is_encrypted,
      };
      return p;
    },
    {} as { [key: string]: { value: any; is_encrypted: boolean } },
  );
  for (const cnfKey in configList) {
    configList[cnfKey].is_encrypted = configFromDB[cnfKey].is_encrypted;
    if (configList[cnfKey].is_encrypted) {
      configList[cnfKey].value = "*******************";
    }
    // deleting Notification configs to force them to be updated on the dedicated UI, might change this in the future
    // depending on the evolution of the backend
    if (cnfKey.match(/^notifications_(.+)_(.+)/g)) {
      delete configList[cnfKey];
    }
  }
  return configList;
};

export const syncConfigWithDB = async () => {
  logger.debug("syncing config with db");
  verifyMasterKey();
  const configList = getConvictSchemaProperties();
  const configFromDB = (await getAllConfigs()).reduce(
    (p, c) => {
      p[c.key] = c.value;
      return p;
    },
    {} as { [key: string]: string | null },
  );
  const cnfDbKeys = Object.keys(configFromDB);
  const cnfKeys = Object.keys(configList);
  const configsNotFoundInDB = cnfKeys.filter(
    (e: string) => !cnfDbKeys.includes(e) && configList[e].db_mirror,
  );
  if (configsNotFoundInDB.length > 0) {
    logger.debug(
      `some config attributes not found in db, ${configsNotFoundInDB.length} items : ${configsNotFoundInDB}`,
    );
    logger.debug("saving missing configs to DB");
    await Promise.all(
      configsNotFoundInDB.map((e) => {
        return saveConfig(
          e,
          configList[e].value,
          configList[e].is_encrypted,
          undefined,
          true,
        );
      }),
    );
  }
  const finalDbConfig = await loadConfigsFromDB();
  config.loadObjectConfig(finalDbConfig);
};

const loadConfigsFromDB = async () => {
  const cnfList = await getAllConfigs();
  const parsedCnfs = {} as { [key: string]: any };
  // config key template : parent_child
  cnfList
    .map((e) => {
      return {
        key: e.key.split("_"),
        value: e.value,
      };
    })
    .forEach((input) => {
      let current = parsedCnfs;
      input.key.forEach((e, i) => {
        if (i === input.key.length - 1) {
          current[e] = input.value;
        } else {
          if (!(e in current)) {
            current[e] = {};
            current = current[e];
          } else {
            current = current[e];
          }
        }
      });
    });
  return parsedCnfs;
};

export const updateConfig = async (
  key: string,
  value: string,
  userId?: number,
  is_encrypted?: boolean,
) => {
  const usKey = key.replace(/\./g, "_");
  await saveConfig(usKey, value, is_encrypted, userId);
  config.set(key, value);
  logger.debug(`Config ${key} updated`);
  return true;
};

export const removeConfig = async (key: string, userId?: number) => {
  const usKey = key.replace(/\./g, "_");
  await deleteConfig(usKey, userId);
  config.removeKey(key);
  logger.debug(`Config ${key} deleted`);
  return true;
};

export const updateMultiConfig = async (config: any, userId: string) => {
  const configList = getConvictSchemaProperties();
  return await Promise.allSettled(
    config.map((cnf: any) => {
      if (cnf.key.match(/_/g)?.length) {
        throw new Error(`Keys: ${cnf.key} should not contain underscores`);
      }
      if (cnf.key.match(/^notifications\.(.+)\.(.+)/g)?.length) {
        throw new Error(
          `Keys: notification keys are not updatable via this API ${cnf.key} `,
        );
      }
      const schemaConfig = configList[cnf.key];
      if (schemaConfig) {
        if (schemaConfig.base) {
          if (cnf.is_encrypted != schemaConfig.is_encrypted) {
            throw new Error(`Cannot change encryption status of ${cnf.key}`);
          }
          if (cnf.deleted) {
            throw new Error(`Cannot delete ${cnf.key}`);
          }
        }
      }
      if (cnf.deleted) {
        return removeConfig(cnf.key, Number(userId))
          .then(() => cnf.key)
          .catch((err) => {
            logger.error(err);
            return err;
          });
      }
      return updateConfig(cnf.key, cnf.value, Number(userId), cnf.is_encrypted)
        .then(() => cnf.key)
        .catch((err) => {
          logger.error(err);
          return err;
        });
    }),
  ).then((settledResponse) => {
    if (settledResponse.some((e) => e.status === "rejected")) {
      throw new Error("Error while updating configs", {
        cause: settledResponse,
      });
    }
  });
};
