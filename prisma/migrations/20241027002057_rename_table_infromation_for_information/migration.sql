/*
  Warnings:

  - You are about to drop the `infromation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "assists" DROP CONSTRAINT "assists_informationId_fkey";

-- DropForeignKey
ALTER TABLE "infromation" DROP CONSTRAINT "infromation_projectId_fkey";

-- DropTable
DROP TABLE "infromation";

-- CreateTable
CREATE TABLE "information" (
    "id" SERIAL NOT NULL,
    "state" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT,
    "precipitation" TEXT,
    "temperature" TEXT,
    "humidity" TEXT,
    "wind" TEXT,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "information_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "information" ADD CONSTRAINT "information_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assists" ADD CONSTRAINT "assists_informationId_fkey" FOREIGN KEY ("informationId") REFERENCES "information"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
