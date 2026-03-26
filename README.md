<div align="center">

# 📅 TypeScheduler backend

**A powerful task management and authentication server built with Bun, Elysia, and Prisma**

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](LICENSE)
[![Bun](https://img.shields.io/badge/Bun-1.0+-ff69b4)](https://bun.sh/)
[![Elysia](https://img.shields.io/badge/Elysia-Fast-white)](https://elysiajs.com/)

[Documentation](https://scheduler-docs-xi.vercel.app/) • [Docker Image](https://github.com/moda20/scheduler_backend/pkgs/container/scheduler_backend) • [Issues](https://github.com/moda20/scheduler_backend/issues)

</div>

---

## 📖 About

**TypeScheduler backend** is a robust task management and authentication server that provides:

- ✅ **Task Scheduling**: CRON-based job scheduling with flexible configuration
- 🔐 **Authentication & Authorization**: Secure user authentication with role-based access control
- 📊 **API Documentation**: Auto-generated Swagger/OpenAPI documentation
- 📝 **Logging**: Comprehensive logging with Grafana Loki integration
- 🔔 **Notifications**: Built-in notification services (Gotify, Ntfy)
- 🧩 **Plugin System**: Extensible plugin architecture for custom functionality (beta status)

> 💡 **Note**: This repository focuses on the backend component only. For the full project documentation and starter examples, visit our [Wiki](https://scheduler-docs-xi.vercel.app/).

---

## 🚀 Quick Start

### Docker Installation (Recommended)

The recommended way to run TypeScheduler backend is via Docker. Create a `docker-compose.yml`:

```yaml
services:
  scheduler_backend:
    image: ghcr.io/moda20/type_scheduler_backend:latest
    #image: ghcr.io/moda20/scheduler_backend:dev # dev for latest development, but unstable
    container_name: type_scheduler_backend
    restart: always
    env_file:
      - .env
    volumes:
      - ./jobs:/usr/src/app/src/jobs:ro # Your job scripts
      - ./logs:/usr/src/app/src/logs/ # Application logs
      - ./outputs:/usr/src/app/src/outputs/ # Output files from jobs
      - ./plugins:/usr/src/app/src/external/userPlugins # Custom plugins
    ports:
      - "8080:8080"
```

**Volume Mappings**:

| Volume      | Description                                                                                           |
| ----------- | ----------------------------------------------------------------------------------------------------- |
| `./jobs`    | Directory containing your job scripts (point to your project root or where `package.json` is located) |
| `./logs`    | Stores application logs (split into general and job-specific logs if enabled)                         |
| `./outputs` | Output files from jobs when export functions are used                                                 |
| `./plugins` | Custom user plugins for extending functionality                                                       |

Run the container:

```bash
docker-compose up -d
```

The API will be available at `http://localhost:8080`, and Swagger documentation at `http://localhost:8080/api-docs`.

---

## 📚 Documentation

- 📖 [Full Documentation](https://scheduler-docs-xi.vercel.app/)
- 🚀 [Getting Started Guide](https://scheduler-docs-xi.vercel.app/)
- 💻 [API Reference](http://localhost:8080/api-docs) (after running)

---

## ⚙️ Configuration

Configuration is managed through a `.env` file. Copy `.env.example` and customize the variables:

### Essential Variables

| Variable                | Description                               | Default       | Required |
| ----------------------- | ----------------------------------------- | ------------- | -------- |
| `NODE_ENV`              | Environment mode (development/production) | `development` | No       |
| `MASTER_ENCRYPTION_KEY` | Base64-encoded encryption key             | -             | **Yes**  |
| `PORT`                  | Server port                               | `8080`        | No       |
| `IP`                    | Server IP to bind to                      | `localhost`   | No       |

### Database Configuration

| Variable                       | Description                 | Default          |
| ------------------------------ | --------------------------- | ---------------- |
| `DB_HOST`                      | Scheduler database host     | `localhost`      |
| `DB_PORT`                      | Scheduler database port     | `3306`           |
| `DB_USERNAME`                  | Scheduler database username | `root`           |
| `DB_PASSWORD`                  | Scheduler database password | `root`           |
| `SCHEDULER_DB_NAME`            | Scheduler database name     | `scheduler_db`   |
| `BASE_DB_HOST`                 | Auth database host          | `localhost`      |
| `BASE_DB_NAME`                 | Auth database name          | `scheduler_base` |
| `BASE_DB_USERNAME`             | Auth database username      | `root`           |
| `BASE_DB_PASSWORD`             | Auth database password      | `root`           |
| `BASE_DB_PORT`                 | Auth database port          | `3306`           |
| `BASE_DB_PASSWORD_SALT_ROUNDS` | Password hash salt rounds   | `12`             |

### Logging & Monitoring

| Variable                        | Description                                                    | Default |
| ------------------------------- |----------------------------------------------------------------| ------- |
| `GRAFANA_LOKI_URL`              | Grafana Loki server URL                                        | -       |
| `GRAFANA_LOKI_USERNAME`         | Grafana Loki username                                          | -       |
| `GRAFANA_LOKI_PASSWORD`         | Grafana Loki password                                          | -       |
| `LOG_TO_CONSOLE`                | Enable console logging                                         | `true`  |
| `EXPORT_JOB_LOGS_TO_FILES`      | Export job logs to files                                       | `false` |
| `LOG_FILES_MAX_FILES_RETENTION` | Max retention period for all log files (e.g., "7d", "30d", 10) | `7d`    |

### Notification Services

| Variable                       | Description                                                                         | Default |
| ------------------------------ | ----------------------------------------------------------------------------------- | ------- |
| `GOTIFY_URL`                   | Gotify server URL (disables Gotify if not set)                                      | -       |
| `GOTIFY_TOKEN`                 | Gotify server token                                                                 | -       |
| `GOTIFY_APP_TOKEN`             | Gotify app token (regular notifications)                                            | -       |
| `GOTIFY_ERROR_APP_TOKEN`       | Gotify app token (error notifications)                                              | -       |
| `NTFY_URL`                     | Ntfy base url (disables Ntfy if not set)                                            | -       |
| `NTFY_TOKEN`                   | Ntfy access token (error notifications)                                             | -       |
| `NTFY_TOPIC`                   | Ntfy main topic                                                                     | -       |
| `DEFAULT_NOTIFICATION_SERVICE` | Set to "gotify" or "ntfy" to switch the default service, REQUIRES container restart | -       |

### Job Configuration

| Variable                 | Description                        | Default    |
| ------------------------ | ---------------------------------- | ---------- |
| `JOBS_SUB_DIRECTORY`     | Target directory for job files     | -          |
| `JOBS_FILES_EXTENSIONS`  | File extensions to search for jobs | `js,ts`    |
| `EXPORT_OUTPUT_FILE`     | Enable output file export          | `false`    |
| `EXPORT_CACHE_FILE`      | Enable cache file export           | `false`    |
| `CACHE_FILES_ROOT_PATH`  | Cache files directory name         | `caches`   |
| `OUTPUT_FILES_ROOT_PATH` | Exported files directory name      | `exported` |

### API Configuration

| Variable                | Description                  | Default                  |
| ----------------------- | ---------------------------- |--------------------------|
| `ENABLE_SWAGGER_SERVER` | Enable Swagger documentation | `true`                   |
| `APP_NAME`              | Application name             | `type_scheduler_backend` |

---

## 💻 Development

### Tech Stack

- **Runtime**: [Bun](https://bun.sh/) - Fast JavaScript runtime
- **Framework**: [Elysia](https://elysiajs.com/) - Fast and type-safe web framework
- **ORM**: [Prisma](https://www.prisma.io/) - Modern database toolkit
- **Logging**: [Pino](https://github.com/pinojs/pino) - High-performance logger
- **Scheduling**: [Scheduler Manager](https://github.com/moda20/node-schedule-manager) - CRON-based job scheduling

### Local Development Setup

1. **Prerequisites**

   ```bash
   # Install Bun (if not already installed)
   curl -fsSL https://bun.sh/install | bash
   ```

2. **Clone the repository**

   ```bash
   git clone https://github.com/moda20/scheduler_backend.git
   cd scheduler_backend
   ```

3. **Install dependencies**

   ```bash
   bun install
   ```

4. **Configure environment**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Run in development mode**

   ```bash
   bun dev
   ```

6. **Build for production**
   ```bash
   bun build
   ```

The development server will start on `http://localhost:8080` with Swagger documentation at `/api-docs`.

### Running Tests

```bash
bun test
```

### Database Migrations

```bash
# Generate migration
bun run prisma migrate dev

# Apply migrations
bun run prisma migrate deploy

# Open Prisma Studio
bun run prisma studio
```

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Guidelines

- 🐛 **Bug Reports**: Submit detailed bug reports with reproduction steps
- 💡 **Feature Requests**: Propose new features with clear use cases
- 🔧 **Pull Requests**: Make sure to:
  - Follow the existing code style
  - Add tests for new functionality
  - Update documentation as needed
  - Ensure all tests pass before submitting

### Steps to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

> ⚠️ Please take the time to debug your issues and test your changes. Adding runnable tests is much appreciated!

---

## 📋 Full Features

| Feature               | Description                                       |
| --------------------- | ------------------------------------------------- |
| **CRON Scheduling**   | Schedule tasks with flexible CRON expressions     |
| **Job Management**    | Create, update, delete, and monitor jobs          |
| **Authentication**    | JWT-based authentication with role-based access   |
| **User Management**   | Manage users and permissions                      |
| **Notifications**     | Multi-service notification support (Gotify, Ntfy) |
| **Logging**           | Centralized logging with Loki integration         |
| **API Documentation** | Auto-generated Swagger documentation              |
| **Plugin System**     | Extensible architecture for custom plugins        |
| **File Management**   | Export job outputs and cache files                |
| **Websocket Support** | Real-time job status updates                      |

---

## 🔒 License

This project is licensed under the **GNU Affero General Public License v3.0 (AGPL-3.0)**.

```
Copyright (c) 2026 Moda20

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
```

**Important**: This license requires that if you run a modified version of this software on a server and provide services to users, you must make the source code of your modifications available to those users.

For the full text of the license, see [LICENSE](LICENSE).

---

## 📞 Support

- 📖 [Documentation](https://scheduler-docs-xi.vercel.app/)
- 🐛 [Issue Tracker](https://github.com/moda20/scheduler_backend/issues)
- 💬 [Discussions](https://github.com/moda20/scheduler_backend/discussions)

---

## 🙏 Acknowledgments

Built with:

- [Bun](https://bun.sh/) - The all-in-one JavaScript runtime
- [Elysia](https://elysiajs.com/) - Ergonomic framework for Huma
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [Pino](https://github.com/pinojs/pino) - Extremely fast Node.js logger

---

<div align="center">

**Made with ❤️ by [Moda20](https://github.com/moda20)**


</div>
