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
    {
      image: "/public/images/ntfy.png",
      name: "ntfy",
      description:
        "Default ntfy notification service, see implementation in the code base",
      entryPoint: "src/notifications/ntfy.ts",
    },
    {
      image: "/public/images/slack.jpg",
      name: "slack",
      description:
        "Default Slack webhook notification service, see implementation in the code base",
      entryPoint: "src/notifications/slack.ts",
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
