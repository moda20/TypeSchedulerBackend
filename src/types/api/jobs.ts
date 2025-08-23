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
