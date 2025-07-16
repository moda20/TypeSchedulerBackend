import { notificationServices } from "@generated/prisma_base";
import { JobDTO, JobLogDTO } from "@typesDef/models/job";
import { IScheduleJobLog } from "schedule-manager";

export interface Notifications {
  init?(
    job: JobDTO,
    jobLogDTO: JobLogDTO | IScheduleJobLog,
    serviceDbObject: notificationServices,
  ): Notifications;
  name?: string;
  description?: string;
  serviceDbId?: number;

  sendMessage(message: string, title?: string): Promise<any>;
}
