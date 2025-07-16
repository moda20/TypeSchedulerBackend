import { basePrisma } from "@initialization/index";
import { NewNotificationService } from "@typesDef/models/notificationService";
import logger from "@utils/loggers";

export const seedBaseDatabase = async () => {
  const inputNotifications: NewNotificationService[] = [
    {
      image: "/public/images/gotifyIcon.png",
      name: "gotify",
      description:
        "Default gotify notification service, see implementation in the code base",
      entryPoint: "src/notifications/gotify.ts",
    },
  ];

  return basePrisma.notificationServices
    .createMany({
      data: inputNotifications,
      skipDuplicates: true,
    })
    .then((d) => {
      logger.info("successfully seeded base database");
      return d;
    });
};
