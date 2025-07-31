# Scheduler Backend

This is the repo for the Scheduler backend. This acts as a task manager and authentication server.

### Wiki

[The general wiki](scheduler-docs-9p4lb6fmr-moda20s-projects.vercel.app) is out now, and is a good place to start if you want to have a general idea about the project.
This repo is only focused on the backend component

## 📦 Installation

The installation process is best done via a docker container, here is a compose example

```yaml
  scheduler_backend:
    image: ghcr.io/moda20/scheduler_backend:latest
    container_name: scheduler_backend
    restart: always
    env_file:
      - .env
    volumes:
      - ./:/usr/src/app/src/jobs:ro
      - ./logs:/usr/src/app/src/logs/
      - ./outputs:/usr/src/app/src/outputs/
      - ./plugins:/usr/src/app/src/external/userPlugins
    ports:
      - "8080:8080"
```

the compose file above will expose port 8080 and can take 3 volumes:

- the jobs directory, should map to your project root directory, if you are using extra packages this shoudl point
  to where your `package.json` is located
- The logs directory, will be split into sub directories for general logs and job specific logs (if enabled)
- The outputs directory, will save output files from jobs if exporting functions are used

## 🛠 Usage

To see the best way to using this scheduler backend is with the interface created for it (see starter example)

The backend exports an API that will be detailed using swagger (enabled by default) on the route `/api-docs`.

## ⚙️ Configuration

the initial configuration is done via the **.env** file. The following variables are available:

| Variable Name                | Description                                                                          | Default Value     |
|------------------------------|--------------------------------------------------------------------------------------|-------------------|
| NODE_ENV                     | The environment to use                                                               | development       |
| ENABLE_SWAGGER_SERVER        | Whether to enable the swagger server or not                                          | true              |
| APP_NAME                     | The Application name (will be used around the app)                                   | scheduler_backend |
| MASTER_ENCRYPTION_KEY*       | The master encryption key, should be set as a base64 encoded secret key              |                   |
| DB_HOST                      | The database host                                                                    | localhost         |
| DB_PORT                      | The database port                                                                    | 3306              |
| DB_USERNAME                  | The database username                                                                | root              |
| DB_PASSWORD                  | The database password                                                                | root              |
| SCHEDULER_DB_NAME            | The database name for the scheduler                                                  | scheduler_db      |
| PORT                         | The port to run the server on                                                        | 8080              |
| IP                           | The IP to run the server on                                                          | localhost         |
| LOG_TO_CONSOLE               | A switch to enable or disable passing logs to console (useful for development)       | localhost         |
| BASE_DB_HOST                 | The database host for the auth database                                              | localhost         |
| BASE_DB_NAME                 | The database name for the auth database                                              | scheduler_base    |
| BASE_DB_USERNAME             | The database username for the auth database                                          | root              |
| BASE_DB_PASSWORD             | The database password for the auth database                                          | root              |
| BASE_DB_PORT                 | The database port for the auth database                                              | 3306              |
| BASE_DB_PASSWORD_SALT_ROUNDS | The number of salt rounds used when hashing passwords                                | 12                |
| GRAFANA_LOKI_URL             | The URL of the Grafana Loki server (used for logging, and log retrieval)             |                   |
| GRAFANA_LOKI_USERNAME        | The username of the Grafana Loki server                                              |                   |
| GRAFANA_LOKI_PASSWORD        | The password of the Grafana Loki server                                              |                   |
| BROWSERLESS_URL              | The URL of the Browserless server (used as a request alternative, i.e axios)         |                   |
| BROWSERLESS_TOKEN            | The token for the Browserless server                                                 |                   |
| GOTIFY_URL                   | The URL of the Gotify server (used as default notification server)                   |                   |
| GOTIFY_TOKEN                 | The token for the Gotify server                                                      |                   |
| GOTIFY_APP_TOKEN             | The app token for the Gotify server (used for regular notifications)                 |                   |
| GOTIFY_ERROR_APP_TOKEN       | The error app token for the Gotify server (used for error and crashes notifications) |                   |
| JOBS_SUB_DIRECTORY           | The target directory for the job files inside your structure                         |                   |
| JOBS_FILES_EXTENSIONS        | The extension files to search for as jobs                                            | js,ts             |
| EXPORT_OUTPUT_FILE           | Whether to export output files or not                                                | false             |
| EXPORT_CACHE_FILE            | Whether to export cache files or not                                                 | false             |
| EXPORT_JOB_LOGS_TO_FILES     | Whether to export job logs as files (in addition to loki if configured)              | false             |
| CACHE_FILES_ROOT_PATH        | The directory inside the output folder that houses cache files                       | caches            |
| OUTPUT_FILES_ROOT_PATH       | The directory inside the output folder that houses exported files                    | exported          |

## Development

The Scheduler_backend is built using [Bun](https://bun.sh/) for the runtime and [Elysia](https://elysiajs.com/) for the
server/API framework.
The following are the most pertinent packages used in tandem with the above :

*- [Prisma](https://www.prisma.io/) for the ORM and migr*ations
- [Pino](https://github.com/pinojs/pino) for logging
- [Scheduler Manager](https://github.com/moda20/node-schedule-manager) for the CRON based scheduling

### Running backend locally

To run the backend app locally :

- Have bun installed : installation instructions [Bun.sh](https://bun.sh/docs/installation)
- Clone the repo : `git clone https://github.com/moda20/scheduler_backend.git`
- Install the dependencies : `bun install`
- Run the app : `bun dev`
- to build the app run : `bun build`

A .env file is necessary for the app to run, the .env.example file is provided as a template and check the table above

## 📝 License

TBD

## 🤝 Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.
Please take the time to debug your issues and test your pull request changes if they need to, adding runnable tests
would be much appreciated. 

