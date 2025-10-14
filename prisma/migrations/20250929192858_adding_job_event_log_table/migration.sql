-- AlterTable
ALTER TABLE `proxy` MODIFY `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);

-- AlterTable
ALTER TABLE `proxy_job` MODIFY `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);

-- CreateTable
CREATE TABLE `job_event_log` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `job_log_id` VARCHAR(255) NOT NULL,
    `event` TEXT NOT NULL,
    `event_message` LONGTEXT NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `handled_on` DATETIME(0) NULL,

    INDEX `type`(`type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cache_files` ADD CONSTRAINT `cache_files_job_log_id_fkey` FOREIGN KEY (`job_log_id`) REFERENCES `schedule_job_log`(`job_log_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `output_files` ADD CONSTRAINT `output_files_job_log_id_fkey` FOREIGN KEY (`job_log_id`) REFERENCES `schedule_job_log`(`job_log_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `schedule_job_log` ADD CONSTRAINT `schedule_job_log_job_id_fkey` FOREIGN KEY (`job_id`) REFERENCES `schedule_job`(`job_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `job_event_log` ADD CONSTRAINT `job_event_log_job_log_id_fkey` FOREIGN KEY (`job_log_id`) REFERENCES `schedule_job_log`(`job_log_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
