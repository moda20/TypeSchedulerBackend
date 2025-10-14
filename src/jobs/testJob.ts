import { JobConsumer } from "@jobConsumer/jobConsumer";
import { JobDTO, JobLogDTO, JobOptions } from "@typesDef/models/job";

class TestJob extends JobConsumer {
  constructor() {
    super();
  }

  async run(job: JobDTO, jobLog: JobLogDTO, options: JobOptions) {
    this.logEvent("You are running the test job");
    this.logEvent("will sleep");
    this.emitError("testing error");
    this.emitWarning("texting warning");
    await this.options?.utils?.sleep(15);
    this.logEvent("finished sleeping");
    await this.exportResultsToFile({
      job_log_id: jobLog.id,
      fileName: "test",
      results: { test: "test" },
    });
    await this.exportCacheFiles({
      job_log_id: jobLog.id,
      fileName: "test",
      data: { test: "test" },
      newFile: true,
    });
    this.logEvent("Testing Final Log");
    // testing the default gotify service
    this.notification.sendJobFinishNotification(
      job.id!.toString(),
      job.name,
      "test results",
    );
    // testing he gotify service that is injected via notification services
    if (this.notificationServices["gotify"]) {
      this.notificationServices["gotify"].sendMessage(
        "test results from injected services",
      );
    }

    return this.complete(jobLog, "");
  }
}

export default new TestJob();
