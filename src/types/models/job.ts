import config from "@config/config";
import { schedule_job } from "@generated/prisma";
import * as JobConsumerUtils from "@utils/jobConsumerUtils";
import { IScheduleJob, IScheduleJobLog } from "schedule-manager";
import { ScheduleJobTable } from "schedule-manager/dist/Classes/Entities/ScheduleJob";

export interface JobDTO extends IScheduleJob {
  // Properties
  createdAt?: Date;
  id?: number;
  name: string;
  cronSetting: string;
  consumer: string;
  status: string;
  param: any;
  exclusive: boolean;
  uniqueSingularId?: string;
  averageTime: number;
  latestRun?: string | null;
  isCurrentlyRunning?: boolean;

  // Methods
  getId(): number | undefined;
  getName(): string;
  getParam(): any;
  getCronSetting(): string;
  getConsumer(): string;
  getExclusive(): boolean;
  getStats(): string;
  getAverageTime(): number;
  getUniqueSingularId(): string | undefined;
  getCreatedAt(): Date | undefined;
  getLatestRun(): any | null;
  getSingularRunId?(): string;

  setId(id: number): void;
  setName(name: string): void;
  setParam(param: any): void;
  setCronSetting(cronSetting: string): void;
  setConsumer(consumer: string): void;
  setExclusive(exclusive: boolean): void;
  setStatus(status: string): void;
  setUniqueSingularId(id: string | number): void;
  setCreatedAt(createdAt: string | Date): void;
  setAverageTime(averageTime: number): void;
  setLatestRun(latestRun: any | null): void;
}

export interface JobLogDTO extends IScheduleJobLog {
  id: string;
  jobId: number;
  machine: string;
  startTime: Date;
  endTime?: Date;
  result: string | null;
  logEventBus: any;
  error?: string;

  getId(): string;
  getJobId(): number;
  getMachine(): string;
  getStartTime(): Date;
  getEndTime(): Date | undefined;
  getResult(): string | null;
  getError(): string | undefined;
  getEventLogBus(): any;

  setEndTime(endTime: string): void;
  setResult(result: string): void;
  setError(error: string): void;
  setEventLogBus(eventLogBus: any): void;
}
export class JobDTOClass implements JobDTO {
  id?: number;
  name: string;
  param: any;
  cronSetting: string;
  consumer: string;
  exclusive: boolean;
  status: string;
  averageTime: number;
  latestRun: any | null;
  createdAt?: Date;
  uniqueSingularId?: string;
  isCurrentlyRunning?: boolean;
  initialized: boolean;
  jobLogs?: any[];
  extraParams: { [p: string]: any } | undefined;

  constructor(job: schedule_job) {
    this.id = job.job_id;
    this.name = job.job_name;
    this.param = job.job_param;
    this.cronSetting = job.job_cron_setting;
    this.consumer = job.consumer;
    this.exclusive = job.exclusive === "true";
    this.status = job.status;
    this.averageTime = job.average_time ?? 0;
    this.latestRun = null;
    this.createdAt = job.created_at ?? undefined;
    this.uniqueSingularId = undefined;
    this.isCurrentlyRunning = false;
    this.initialized = false;
    // @ts-ignore
    this.jobLogs = job.job_logs;
  }

  getId(): number | undefined {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getParam(): any {
    return this.param;
  }

  getCronSetting(): string {
    return this.cronSetting;
  }

  getConsumer(): string {
    return this.consumer;
  }

  getExclusive(): boolean {
    return this.exclusive;
  }

  getStats(): string {
    return this.status;
  }

  getAverageTime(): number {
    return this.averageTime;
  }

  getUniqueSingularId(): string | undefined {
    return this.uniqueSingularId;
  }

  getCreatedAt(): Date | undefined {
    return this.createdAt;
  }

  getLatestRun(): any | null {
    return this.latestRun;
  }

  getIsCurrentlyRunning(): boolean | undefined {
    return this.isCurrentlyRunning;
  }

  getIsInitialized(): boolean {
    return this.initialized;
  }

  getSingularRunId(): string {
    return this.uniqueSingularId
      ? `${this.name}_${this.uniqueSingularId}`
      : this.name;
  }

  setId(id: string | number | undefined): void {
    this.id = id ? Number(id) : undefined;
  }

  setName(name: string): void {
    this.name = name;
  }

  setParam(param: any): void {
    this.param = param;
  }

  setCronSetting(cronSetting: string): void {
    this.cronSetting = cronSetting;
  }

  setConsumer(consumer: string): void {
    this.consumer = consumer;
  }

  setExclusive(exclusive: boolean): void {
    this.exclusive = exclusive;
  }

  setStatus(status: string): void {
    this.status = status;
  }

  setUniqueSingularId(id: string): void {
    this.uniqueSingularId = id;
  }

  setAverageTime(averageTime: number) {
    this.averageTime = averageTime;
  }

  setCreatedAt(createdAt: string | Date) {
    this.createdAt = new Date(createdAt);
  }

  setLatestRun(latestRun: any | null) {
    this.latestRun = latestRun;
  }

  setIsCurrentlyRunning(isCurrentlyRunning: boolean) {
    this.isCurrentlyRunning = isCurrentlyRunning;
  }

  setInitialized(initialized: boolean) {
    this.initialized = initialized;
  }

  getJobUpdateObject(): ScheduleJobTable {
    return {
      job_name: this.name,
      job_param: this.param,
      job_cron_setting: this.cronSetting,
      consumer: this.consumer,
      exclusive: this.exclusive,
      status: this.status,
      average_time: this.averageTime,
      created_at: this.createdAt,
      job_id: this.id,
      latest_run: this.latestRun,
    };
  }

  getExtraParams(): { [p: string]: any } | undefined {
    return this.extraParams;
  }

  setExtraParams(extraParams: { [p: string]: any }): void {
    this.extraParams = extraParams;
  }
}

export const jobFilteringAttributeMap = <Record<string, string>>{
  id: "job_id",
  name: "job_name",
  averageTime: "average_time",
};

export const jobModelAttributeMap = <Record<string, string>>{
  id: "job_id",
  name: "job_name",
  param: "job_param",
  cronSetting: "job_cron_setting",
  consumer: "consumer",
  exclusive: "exclusive",
  status: "status",
  averageTime: "average_time",
};

export interface jobUpdateConfig {
  name: string;
  param?: any;
  consumer: string;
  cronSetting: string;
}

export enum jobActions {
  START = "START",
  STOP = "STOP",
  SOFT_DELETE = "SOFT_DELETE",
  CREATE = "CREATE",
  EXECUTE = "EXECUTE",
  UPDATE = "UPDATE",
  REFRESH = "REFRESH",
  EXECUTE_WITH_PARAMS = "EXECUTE_WITH_PARAMS",
}

export enum jobStatus {
  STOPPED = "STOPPED",
  DELETED = "DELETED",
  STARTED = "STARTED",
}

export interface JobStats {
  date: Date;
  averageDuration: number;
  totalRuns: number;
  totalRuntime: number;
  singularRunCount: number;
  errorCount: number;
}

export interface JobOptions {
  utils?: typeof JobConsumerUtils;
  config?: { [key: string]: any };
}

export enum JobEventTypes {
  ERROR = "ERROR",
  WARNING = "WARNING",
  INFO = "INFO",
}

export const JobEventTypesArray = Object.values(JobEventTypes);
