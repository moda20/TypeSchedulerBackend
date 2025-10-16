import mainSocketService from "@api/websocket/mainSocket.service";
import { JobInitialization } from "@typesDef/api/jobs";
import { JobDTO } from "@typesDef/models/job";
import logger from "@utils/loggers";
import { JobQueue } from "@utils/queueUtils";
import { Database } from "bun:sqlite";

export default {
  runningJobs: new Map<string, Map<string | number, JobDTO>>(),
  initialized: new Map<string, JobInitialization>(),
  queues: Array<JobQueue>(),
  db: new Database(":memory:"),

  init() {
    return this.db.exec(`
      CREATE TABLE IF NOT EXISTS jobs (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        data TEXT,
        status TEXT DEFAULT 'running',
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS job_initializations (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        data TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS queues (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        data TEXT NOT NULL
      );
    `);
  },

  startJob(job: JobDTO) {
    try {
      const transaction = this.db.transaction(() => {
        const stmt = this.db.prepare(`
          INSERT OR REPLACE INTO jobs (id, name, data)
          VALUES (?, ?, ?)
        `);

        stmt.run(
          job.getUniqueSingularId() ?? job.getId(),
          job.getName(),
          job.getParam(),
        );

        if (!this.runningJobs.has(job.getName())) {
          this.runningJobs.set(job.getName(), new Map());
        }
        this.runningJobs
          .get(job.getName())
          ?.set(job.getUniqueSingularId() ?? job.getId()!, job);
      });

      transaction();

      mainSocketService.sendJobStartingNotification(
        job,
        this.getRunningJobCount(),
      );
    } catch (error) {
      logger.error(`Error starting job: ${error}`);
    }
  },

  endJob(job: JobDTO) {
    try {
      const transaction = this.db.transaction(() => {
        const stmt = this.db.prepare("DELETE FROM jobs WHERE id = ?");
        stmt.run(job.getUniqueSingularId() ?? job.getId());
        if (this.runningJobs.has(job.getName())) {
          this.runningJobs
            .get(job.getName())
            ?.delete(job.getUniqueSingularId() ?? job.getId()!);

          if (this.runningJobs.get(job.getName())?.size === 0) {
            this.runningJobs.delete(job.getName());
          }
        }
      });

      transaction();

      mainSocketService.sendJobEndingNotification(
        job,
        this.getRunningJobCount(),
      );
    } catch (error) {
      logger.error(`Error ending job: ${error}`);
    }
  },

  isRunning(job: JobDTO) {
    const stm = this.db.prepare("SELECT * FROM jobs WHERE id = ?");
    const foundJob = stm.get(job.getUniqueSingularId() ?? job.getId());
    if (foundJob) return true;
    return false;
  },

  isInitialized(job: any, targetId?: string) {
    const stm = this.db.prepare(
      "SELECT * FROM job_initializations WHERE id = ?",
    );
    const foundJob = stm.get(targetId ?? job.getName());
    if (foundJob) return true;
    return false;
  },

  getRunningJobCount() {
    const stm = this.db.prepare("SELECT count(id) as count FROM jobs");
    const foundJobs: any = stm.get();
    return foundJobs?.count ?? 0;
  },

  getAllRunningJobs() {
    const stmt = this.db.prepare("SELECT * FROM jobs WHERE status = 'running'");
    const jobs = stmt.all();

    // Convert back to JobDTO objects
    return jobs.map((job: any) => {
      return this.runningJobs.get(job.name)?.get(job.id);
    });
  },

  getJobById(id: string) {
    const stmt = this.db.prepare("SELECT * FROM jobs WHERE id = ?");
    const jobData: any = stmt.get(id);

    if (jobData) {
      return this.runningJobs.get(jobData.name)?.get(jobData.id);
    }

    return null;
  },

  getJobsByName(name: any) {
    const stmt = this.db.prepare("SELECT * FROM jobs WHERE name = ?");
    const jobs = stmt.all(name);

    // Convert back to JobDTO objects
    return jobs.map((job: any) => {
      return this.runningJobs.get(job.name)?.get(job.id);
    });
  },

  initializeJob(jobName: string, initConfig?: JobInitialization) {
    try {
      const transaction = this.db.transaction(() => {
        const stmt = this.db.prepare(`
          INSERT OR REPLACE INTO job_initializations (id, name, data)
          VALUES (?, ?, ?)
        `);

        stmt.run(jobName, jobName, JSON.stringify(initConfig ?? {}));
        this.initialized.set(jobName, initConfig ?? {});
      });

      transaction();
    } catch (error) {
      logger.error(`Error initializing job: ${error}`);
    }
  },
  unInitializeJob(jobName: string) {
    try {
      const transaction = this.db.transaction(() => {
        const stmt = this.db.prepare(`
          DELETE FROM job_initializations 
          WHERE id = ?
        `);

        stmt.run(jobName);

        this.initialized.delete(jobName);
      });

      transaction();
    } catch (error) {
      logger.error(`Error deleting job initialization: ${error}`);
    }
  },

  addQueue(queue: JobQueue) {
    try {
      const stmt = this.db.prepare("INSERT INTO queues (data) VALUES (?)");
      stmt.run(JSON.stringify(queue));

      this.queues.push(queue);
    } catch (error) {
      logger.error(`Error adding queue: ${error}`);
    }
  },

  getQueueById(id: number) {
    const stmt = this.db.prepare("SELECT * FROM queues WHERE id = ?");
    const queueData: any = stmt.get(id);
    return queueData;
  },

  deleteQueueById(id: number) {
    const stmt = this.db.prepare("DELETE FROM queues WHERE id = ?");
    stmt.run(id);
    this.queues = this.queues.filter((e, i) => i !== id);
  },

  reset() {
    this.db.exec("DELETE FROM jobs");
    this.db.exec("DELETE FROM job_initializations");
    this.db.exec("DELETE FROM queues");

    this.runningJobs.clear();
    this.initialized.clear();
    this.queues = [];
  },
};
