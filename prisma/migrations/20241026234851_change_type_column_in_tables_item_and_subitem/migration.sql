/*
  Warnings:

  - You are about to alter the column `incidence` on the `items` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `incidence` on the `subitems` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "items" ALTER COLUMN "incidence" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "subitems" ALTER COLUMN "incidence" SET DATA TYPE DOUBLE PRECISION;
