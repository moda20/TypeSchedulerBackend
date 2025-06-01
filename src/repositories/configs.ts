import { basePrisma } from "@initialization/index";
import encryptionUtils from "@utils/encryptionUtils";

export const getAllConfigs = (limit?: number, offset?: number) => {
  return basePrisma.appConfig
    .findMany({
      take: limit,
      skip: offset,
    })
    .then((configs) => {
      return configs.map((e) => {
        if (e.is_encrypted) {
          e.value = encryptionUtils.decryptWithMasterKey(e.value);
        }
        return e;
      });
    });
};

export const getConfig = (key: string) => {
  return basePrisma.appConfig
    .findUnique({
      where: {
        key: key,
      },
    })
    .then((config) => {
      if (config?.is_encrypted) {
        config.value = encryptionUtils.decryptWithMasterKey(config.value);
      }
      return config;
    });
};

export const saveConfig = async (
  key: string,
  value: string,
  is_encrypted?: boolean,
  userId?: number,
  rootId?: boolean,
) => {
  const existingConfig = await basePrisma.appConfig.findUnique({
    where: {
      key: key,
    },
  });
  const finalValue = is_encrypted
    ? encryptionUtils.encryptWithMasterKey(value)
    : value;
  if (existingConfig) {
    return basePrisma.appConfig
      .update({
        where: {
          key: key,
        },
        data: {
          value: finalValue,
          appConfigAudit: {
            create: {
              changedBy: {
                connect: {
                  id: userId,
                },
              },
              newValue: value,
              oldValue: existingConfig.value,
            },
          },
        },
      })
      .then(() => finalValue);
  } else {
    return basePrisma.appConfig
      .create({
        data: {
          key: key,
          value: finalValue,
          is_encrypted: is_encrypted ?? false,
          ...(!rootId
            ? {
                appConfigAudit: {
                  create: {
                    changedBy: {
                      connect: {
                        id: userId,
                      },
                    },
                    newValue: value,
                    oldValue: null,
                  },
                },
              }
            : {}),
        },
      })
      .then(() => finalValue);
  }
};

export const deleteConfig = async (key: string, userId?: number) => {
  const existingConfig = await basePrisma.appConfig.findUnique({
    where: {
      key: key,
    },
  });
  if (existingConfig) {
    return basePrisma.appConfigAudit
      .create({
        data: {
          changedBy: {
            connect: {
              id: userId,
            },
          },
          oldValue: `${key}_${existingConfig.value}`,
          newValue: null,
        },
      })
      .then(() => {
        return basePrisma.appConfig
          .delete({
            where: {
              key: key,
            },
          })
          .then(() => {});
      });
  }
};
