-- CreateEnum
CREATE TYPE "TaskType" AS ENUM ('DAYLY', 'WEEKLY', 'MONTHLY', 'YEARLY');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('EMAIL', 'APP', 'SMS');

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "TaskType" NOT NULL DEFAULT 'DAYLY',
    "description" TEXT,
    "dueDate" TIMESTAMP(3),
    "notifyOption" "NotificationType"[] DEFAULT ARRAY['APP']::"NotificationType"[],
    "notifyAt" TEXT DEFAULT '30s',
    "userId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_slug_key" ON "Tag"("slug");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
