import { proxy_status } from "@generated/prisma";
import { JobDTO } from "@typesDef/models/job";

export interface ProxyDTO {
  id: number;
  proxy_ip: string;
  proxy_port: number;
  protocol: string;
  username: string;
  description: string;
  status: string;
  created_at: Date;
  updated_at: Date;
  proxy_job?: ProxyJobDTO[];
}

export interface ProxyJobDTO {
  id: number;
  proxy_id: number;
  job_id: number;
  created_at: Date;
  updated_at: Date;
  schedule_job: JobDTO;
}

export interface newProxyConfig {
  proxy_ip: string;
  proxy_port: number;
  protocol: string;
  username?: string;
  password?: string;
  description?: string;
  status: proxy_status;
}
export interface proxyUpdateConfig {
  id: number;
  proxy_ip?: string;
  proxy_port?: number;
  protocol?: string;
  username?: string;
  password?: string;
  description?: string;
  status?: proxy_status;
}
