export interface LogFileMetadata {
  name: string;
  hash?: string;
  date?: number;
  fileStats?: {
    size?: number;
    createdAt?: Date;
    lastModified?: Date;
  };
}
export interface PaginatedLogs {
  lines: string[];
  nextOffset: number;
}

export interface ReadLogFileParams {
  filePath: string;
  limit?: number;
  offset?: number;
  jobId?: number; // For validation on job logs
}
export interface GetJobLogFilesParams {
  jobId?: number;
}
export interface AuditMetadata {
  deletionDate?: string;
  date: number;
  name: string;
  hash: string;
  [key: string]: any;
}
