/*
  Warnings:

  - The values [DAYLY] on the enum `TaskType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TaskType_new" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY');
ALTER TABLE "Task" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "Task" ALTER COLUMN "type" TYPE "TaskType_new" USING ("type"::text::"TaskType_new");
ALTER TYPE "TaskType" RENAME TO "TaskType_old";
ALTER TYPE "TaskType_new" RENAME TO "TaskType";
DROP TYPE "TaskType_old";
ALTER TABLE "Task" ALTER COLUMN "type" SET DEFAULT 'DAILY';
COMMIT;

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "type" SET DEFAULT 'DAILY';
