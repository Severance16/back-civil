/*
  Warnings:

  - The values [Hidrahulica] on the enum `WorksTypes` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "WorksTypes_new" AS ENUM ('Residencial', 'Institucional', 'Urbana', 'Comercial', 'Industrial', 'Vial', 'Hidraulica');
ALTER TABLE "projects" ALTER COLUMN "workType" TYPE "WorksTypes_new" USING ("workType"::text::"WorksTypes_new");
ALTER TYPE "WorksTypes" RENAME TO "WorksTypes_old";
ALTER TYPE "WorksTypes_new" RENAME TO "WorksTypes";
DROP TYPE "WorksTypes_old";
COMMIT;
