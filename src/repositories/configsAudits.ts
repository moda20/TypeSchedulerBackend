import { basePrisma } from "@initialization/index";

export const addConfigAudit = async (
  userId: number,
  configId: number,
  oldValue: string,
  newValue: string,
) => {
  return basePrisma.appConfigAudit.create({
    data: {
      changedBy: {
        connect: {
          id: userId,
        },
      },
      config: {
        connect: {
          id: configId,
        },
      },
      oldValue: oldValue,
      newValue: newValue,
    },
  });
};
