import { basePrisma } from "@initialization/index";
import { NotificationInput } from "@typesDef/models/notificationService";

export const addNotifications = async (
  notificationData: NotificationInput | NotificationInput[],
) => {
  const notificationInfo = Array.isArray(notificationData)
    ? notificationData
    : [notificationData];
  return basePrisma.notification.createMany({
    data: notificationInfo.map((e) => {
      delete e.service_id;
      return {
        ...e,
        job_log_id: e.job_log_id,
        service: e.service_id,
      };
    }),
  });
};
