/*
  Warnings:

  - Made the column `workType` on table `projects` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "projects" ALTER COLUMN "workType" SET NOT NULL;
