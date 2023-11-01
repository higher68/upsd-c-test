-- CreateTable
CREATE TABLE `Company` (
    `company_uid` VARCHAR(191) NOT NULL,
    `corporate_name` VARCHAR(191) NOT NULL,
    `representative_name` VARCHAR(191) NOT NULL,
    `phone_number` VARCHAR(191) NOT NULL,
    `postal_code` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`company_uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `user_uid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `company_uid` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`user_uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Client` (
    `client_uid` VARCHAR(191) NOT NULL,
    `corporate_name` VARCHAR(191) NOT NULL,
    `representative_name` VARCHAR(191) NOT NULL,
    `phone_number` VARCHAR(191) NOT NULL,
    `postal_code` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `company_uid` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`client_uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ClientBankAccount` (
    `account_id` INTEGER NOT NULL AUTO_INCREMENT,
    `client_uid` VARCHAR(191) NOT NULL,
    `bank_name` VARCHAR(191) NOT NULL,
    `branch_name` VARCHAR(191) NOT NULL,
    `account_number` VARCHAR(191) NOT NULL,
    `account_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`account_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InvoiceData` (
    `invoice_id` INTEGER NOT NULL AUTO_INCREMENT,
    `issue_date` DATETIME(3) NOT NULL,
    `payment_amount` DOUBLE NOT NULL,
    `fee` DOUBLE NOT NULL,
    `fee_rate` DOUBLE NOT NULL,
    `consumption_tax` DOUBLE NOT NULL,
    `consumption_tax_rate` DOUBLE NOT NULL,
    `invoice_amount` DOUBLE NOT NULL,
    `payment_due_date` DATETIME(3) NOT NULL,
    `status` ENUM('UNPROCESSED', 'IN_PROGRESS', 'PAID', 'ERROR') NOT NULL,
    `company_uid` VARCHAR(191) NOT NULL,
    `client_uid` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`invoice_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_company_uid_fkey` FOREIGN KEY (`company_uid`) REFERENCES `Company`(`company_uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Client` ADD CONSTRAINT `Client_company_uid_fkey` FOREIGN KEY (`company_uid`) REFERENCES `Company`(`company_uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClientBankAccount` ADD CONSTRAINT `ClientBankAccount_client_uid_fkey` FOREIGN KEY (`client_uid`) REFERENCES `Client`(`client_uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InvoiceData` ADD CONSTRAINT `InvoiceData_company_uid_fkey` FOREIGN KEY (`company_uid`) REFERENCES `Company`(`company_uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InvoiceData` ADD CONSTRAINT `InvoiceData_client_uid_fkey` FOREIGN KEY (`client_uid`) REFERENCES `Client`(`client_uid`) ON DELETE RESTRICT ON UPDATE CASCADE;
