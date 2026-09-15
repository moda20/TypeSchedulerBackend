import config from "@config/config";
import { getConvictSchemaProperties } from "@config/config.service";
import { deleteAdminConfig, saveAdminConfig } from "@repositories/configs";
import logger from "@utils/loggers";

export const updateConfig = async (
  key: string,
  value: string,
  is_encrypted?: boolean,
) => {
  const usKey = key.replace(/\./g, "_");
  await saveAdminConfig(usKey, value, is_encrypted);
  config.set(key, value);
  logger.debug(`Config ${key} updated`);
  return true;
};

export const removeConfig = async (key: string) => {
  const usKey = key.replace(/\./g, "_");
  await deleteAdminConfig(usKey);
  config.removeKey(key);
  logger.debug(`Config ${key} deleted`);
  return true;
};

export const updateAdminMultiConfig = async (config: any) => {
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
        return removeConfig(cnf.key)
          .then(() => cnf.key)
          .catch((err) => {
            logger.error(err);
            return err;
          });
      }
      return updateConfig(cnf.key, cnf.value, cnf.is_encrypted)
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
