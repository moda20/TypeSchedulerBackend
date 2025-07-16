export interface NewNotificationService {
  name: string;
  description: string;
  entryPoint: string;
  image?: string;
}

export interface NotificationInput {
  message?: string;
  data?: any;
  service_id?: number;
  service?: any;
  job_log_id?: string;
  is_sent?: boolean;
}
