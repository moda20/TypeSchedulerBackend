-- CreateTable
CREATE TABLE `apiKeys` (
    `id` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `key` VARCHAR(255) NOT NULL,
    `createdById` INTEGER NOT NULL,
    `lastUsedAt` DATETIME(3) NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `id`(`id`),
    UNIQUE INDEX `apiKeys_name_key`(`name`),
    UNIQUE INDEX `apiKeys_key_key`(`key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `apiKeys` ADD CONSTRAINT `apiKeys_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
