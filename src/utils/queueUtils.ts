import { queuedTasksExecutionConfig, Task } from "@typesDef/api/jobs";
import currentRunsManager from "@utils/CurrentRunsManager";
import { sleep } from "@utils/jobUtils";
import logger from "@utils/loggers";
import PQueue from "p-queue";

export class JobQueue {
  queue: PQueue;
  batches: Array<Task<any>[]> = [];
  enqueuedBatchCursor = 0;
  queueInputs: queuedTasksExecutionConfig;
  constructor(queueInputs: queuedTasksExecutionConfig) {
    this.queue = new PQueue({
      concurrency: queueInputs.waitBetweenBatches
        ? queueInputs.batchCount
        : queueInputs.targetJobs.length,
      autoStart: true,
      intervalCap: queueInputs.batchCount,
      interval: queueInputs.batchDelay,
    });
    this.splitToBatches(queueInputs.targetTasks);
    this.queueInputs = queueInputs;
    currentRunsManager.queues.push(this);
  }

  splitToBatches = (tasks: Task<any>[] = []) => {
    this.batches.push(
      ...(tasks?.reduce(
        (p, c) => {
          p[p.length - 1]?.length < this.queueInputs.batchCount
            ? p[p.length - 1].push(c)
            : p.push([c]);
          return p;
        },
        [] as Array<Task<any>[]>,
      ) ?? []),
    );
    logger.info(`Splitting ${tasks.length} in ${this.batches.length} batches`);
  };

  enqueueNextBatch = async () => {
    if (this.batches[this.enqueuedBatchCursor]?.length) {
      if (this.queueInputs.waitBetweenBatches) {
        this.queue.addAll(this.batches[this.enqueuedBatchCursor]);
        this.queue
          .onIdle()
          .then(() => sleep(this.queueInputs.batchDelay / 1000))
          .then(() => {
            return this.enqueueNextBatch();
          });
        this.enqueuedBatchCursor++;
      } else {
        this.queue.addAll(this.batches.flat());
      }
    } else {
      // queue is empty
      this.queue.clear();
      this.enqueuedBatchCursor = 0;
    }
  };
}
