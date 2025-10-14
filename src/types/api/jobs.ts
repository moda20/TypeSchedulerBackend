export interface TypedFilter {
  value: string;
  type: string;
  value1?: string;
  value2?: string;
  operator?: string;
}

export interface advancedFilters {
  name?: TypedFilter;
  cronSetting?: TypedFilter;
  consumer?: TypedFilter;
  status?: string[];
  isRunning?: boolean;
  averageTime?: TypedFilter;
  sorting?: Array<any>;
  latestRun?: {
    from?: Date;
    to?: Date;
  };
}
export interface getAllJobsInputs {
  limit: number;
  offset: number;
  name?: string;
  status?: string[];
  sort: { id: string; desc: string }[];
  jobIds?: number[];
  latestRun?: any;
  advancedFilters?: advancedFilters;
}

export interface queuedJobsExecutionConfig {
  batchCount: number;
  batchDelay: number;
  waitBetweenBatches: boolean;
  executionOrderAttribute?: string;
  targetJobs: number[];
}

export type Task<T> = () => Promise<T>;
export interface queuedTasksExecutionConfig extends queuedJobsExecutionConfig {
  targetTasks?: Task<any>[];
}

export interface JobInitialization {
  startEventOff?: () => void;
  endEventOff?: () => void;
}

export enum LogEventNames {
  "JobLogEvent" = "JobLogEvent",
  "JobScheduleEvent" = "JobScheduleEvent",
  "SysLogEvent" = "SysLogEvent",
}
export enum jobEventLog {
  JOB_ENDED = "JOB_ENDED",
  JOB_STARTED = "JOB_STARTED",
  JOB_ERROR = "JOB_ERROR",
}
