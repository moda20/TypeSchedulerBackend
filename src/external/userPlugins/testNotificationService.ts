import { notificationServices } from "@generated/prisma_base";
import { JobDTO, JobLogDTO } from "@typesDef/models/job";
import { Notifications } from "@typesDef/notifications";
import { IScheduleJobLog } from "schedule-manager";

class TestNotificationService implements Notifications {
  constructor(job: JobDTO, jobLogDTO: JobLogDTO | IScheduleJobLog) {}
  sendMessage(message: string, title?: string): Promise<any> {
    return Promise.resolve(
      `${message} from test notification service title: ${title}`,
    );
  }
  static init(
    job: JobDTO,
    jobLogDTO: JobLogDTO | IScheduleJobLog,
    serviceDbObject: notificationServices,
  ): TestNotificationService {
    return new TestNotificationService(job, jobLogDTO);
  }
}

export default TestNotificationService;
