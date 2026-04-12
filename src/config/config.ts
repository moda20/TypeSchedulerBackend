import { overlay, walk } from "@utils/convictUtils";
import convict from "convict";
import { ipaddress } from "convict-format-with-validator";

convict.addFormat(ipaddress);

const config = convict({
  env: {
    doc: "The application environment.",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV",
  },
  appName: {
    doc: "The application name.",
    default: "scheduler_backend",
    env: "APP_NAME",
  },
  swaggerServer: {
    doc: "Whether to enable swagger server or not.",
    default: true,
    format: Boolean,
    env: "ENABLE_SWAGGER_SERVER",
  },
  server: {
    ip: {
      doc: "The server ip.",
      format: "ipaddress",
      default: "0.0.0.0",
      env: "IP",
    },
    port: {
      doc: "The server port.",
      format: "port",
      default: 8080,
      env: "PORT",
    },
    logToConsole: {
      doc: "Whether to log to console.",
      format: Boolean,
      default: true,
      env: "LOG_TO_CONSOLE",
    },
    logSystemEvents: {
      doc: "Whether to log all system events, useful for debugging.",
      format: Boolean,
      default: true,
      env: "LOG_SYSTEM_EVENTS",
    },
  },
  jobs: {
    targetFolderForJobs: {
      doc: "The target directory for jobs inside the jobs/ folder",
      format: String,
      default: "",
      env: "JOBS_SUB_DIRECTORY",
    },
    jobsFileExtensions: {
      doc: "The extension of files to be considered as jobs: only accepts .ts and .js files",
      format: String,
      default: "ts,js",
      env: "JOBS_FILES_EXTENSIONS",
      nullable: false,
    },
  },
  files: {
    exportOutputFiles: {
      doc: "Whether to export output files.",
      format: Boolean,
      default: false,
      env: "EXPORT_OUTPUT_FILE",
    },
    exportCacheFiles: {
      doc: "Whether to export cache files.",
      format: Boolean,
      default: false,
      env: "EXPORT_CACHE_FILE",
    },
    exportJobLogsToFiles: {
      doc: "Whether to export job logs to files.",
      format: Boolean,
      default: false,
      env: "EXPORT_JOB_LOGS_TO_FILES",
    },
    logFilesMaxFiles: {
      doc: "Max file retention for all log files",
      format: [String, Number],
      default: "7d",
      env: "LOG_FILES_MAX_FILES_RETENTION",
      nullable: true,
    },
    cacheFilesRootPath: {
      doc: "The root path for cache files.",
      format: String,
      default: "caches",
      env: "CACHE_FILES_ROOT_PATH",
    },
    outputFilesRootPath: {
      doc: "The root path for output files.",
      format: String,
      default: "exported",
      env: "OUTPUT_FILES_ROOT_PATH",
    },
    databaseBackupRootPath: {
      doc: "The root path for database backup files.",
      format: String,
      default: "db",
      env: "DB_BACKUP_FILES_ROOT_PATH",
    },
  },
  DB: {
    host: {
      doc: "The database host.",
      format: "ipaddress",
      default: "127.0.0.1",
      env: "DB_HOST",
    },
    port: {
      doc: "The database port.",
      format: "port",
      default: 3306,
      env: "DB_PORT",
    },
    username: {
      doc: "The database username.",
      format: String,
      default: "root",
      env: "DB_USERNAME",
    },
    password: {
      doc: "The database password.",
      format: String,
      default: "root",
      env: "DB_PASSWORD",
    },
    schedulerDatabaseName: {
      doc: "The database name for the scheduler.",
      format: String,
      default: "scheduler",
      env: "SCHEDULER_DB_NAME",
    },
  },
  baseDB: {
    host: {
      doc: "The base database host.",
      format: "ipaddress",
      default: "127.0.0.1",
      env: "BASE_DB_HOST",
    },
    port: {
      doc: "The base database port.",
      format: "port",
      default: 3306,
      env: "BASE_DB_PORT",
    },
    username: {
      doc: "The base database username.",
      format: String,
      default: "root",
      env: "BASE_DB_USERNAME",
    },
    password: {
      doc: "The base database password.",
      format: String,
      default: "root",
      env: "BASE_DB_PASSWORD",
    },
    databaseName: {
      doc: "The base database name.",
      format: String,
      default: "scheduler",
      env: "BASE_DB_NAME",
    },
    passwordSaltRounds: {
      doc: "The salt rounds used to hash passwords",
      format: Number,
      default: 12,
      env: "BASE_DB_PASSWORD_SALT_ROUNDS",
    },
  },
  notifications: {
    defaultService: {
      doc: "The default notification service to use",
      format: String,
      default: "gotify",
      env: "DEFAULT_NOTIFICATION_SERVICE",
    },
    eventHandlers: {},
    ntfy: {
      url: {
        doc: "The ntfy url.",
        format: String,
        default: null,
        env: "NTFY_URL",
        nullable: true,
      },
      token: {
        doc: "The ntfy token.",
        format: String,
        default: "token",
        env: "NTFY_TOKEN",
        sensitive: true,
      },
      topic: {
        doc: "the default ntfy topic",
        format: String,
        default: "scheduler_backend",
        env: "NTFY_TOPIC",
      },
    },
    gotify: {
      url: {
        doc: "The gotify url.",
        format: String,
        default: null,
        env: "GOTIFY_URL",
        nullable: true,
      },
      token: {
        doc: "The gotify token.",
        format: String,
        default: "token",
        env: "GOTIFY_TOKEN",
        sensitive: true,
      },
      appToken: {
        doc: "The gotify app token.",
        format: String,
        default: null,
        env: "GOTIFY_APP_TOKEN",
        nullable: true,
        sensitive: true,
      },
      appErrorChannelToken: {
        doc: "The gotify app error channel token.",
        format: String,
        default: null,
        env: "GOTIFY_ERROR_APP_TOKEN",
        nullable: true,
        sensitive: true,
      },
    },
    slack: {
      url: {
        doc: "The slack webhook url",
        format: String,
        default: null,
        env: "SLACK_WEBHOOK_URL",
        nullable: true,
      },
      proxyUrl: {
        doc: "The proxy url.",
        format: String,
        default: null,
        env: "SLACK_PROXY_URL",
        nullable: true,
      },
      proxyUsername: {
        doc: "The proxy username.",
        format: String,
        default: null,
        env: "SLACK_PROXY_USERNAME",
        nullable: true,
      },
      proxyPassword: {
        doc: "The slack proxy password.",
        format: String,
        default: null,
        env: "SLACK_PROXY_PASSWORD",
        nullable: true,
        sensitive: true,
      },
    },
  },
  grafana: {
    lokiUrl: {
      doc: "The grafana loki url.",
      format: String,
      default: null,
      env: "GRAFANA_LOKI_URL",
      nullable: true,
    },
    username: {
      doc: "The grafana loki username.",
      format: String,
      default: null,
      env: "GRAFANA_LOKI_USERNAME",
      nullable: true,
      sensitive: true,
    },
    password: {
      doc: "The grafana loki password.",
      format: String,
      default: null,
      env: "GRAFANA_LOKI_PASSWORD",
      nullable: true,
      sensitive: true,
    },
  },
  encryption: {
    masterKey: {
      doc: "The master key used to encrypt and decrypt config values, it's expected to be in base64",
      format: String,
      default: "",
      env: "MASTER_ENCRYPTION_KEY",
      sensitive: true,
      db_mirror: false,
    },
  },
  version: {
    env: "SYSTEM_VERSION_STRING",
    doc: "system version, set during build",
    default: "unknown",
    db_mirror: false,
  },
});

type extendedConvict = typeof config & {
  removeKey: (key: string) => void;
  safeGet: (key: string, defaultValue: any) => any;
  loadObjectConfig: (conf: any) => any;
  _instance: any;
  _schema: any;
};

const extendedConfig = config as extendedConvict;

extendedConfig.removeKey = function (key: string) {
  const keySplit = key.split(".");
  const targetKey = keySplit.pop();
  const targetPath = keySplit.join(".");
  if (targetKey) {
    const targetObject = walk(this._instance, targetPath, false);
    delete targetObject[targetKey];
  }
};

extendedConfig.safeGet = function (key: string, defaultValue: any) {
  try {
    const keySplit = key.split(".");
    const targetKey = keySplit.pop();
    const targetPath = keySplit.join(".");
    if (targetKey) {
      const targetObject = walk(this._instance, targetPath, false);
      return targetObject[targetKey] ?? defaultValue;
    }
  } catch (err) {
    return defaultValue;
  }
};

extendedConfig.loadObjectConfig = function (conf: any) {
  overlay(conf, this._instance, this._schema);
};

export default extendedConfig;
