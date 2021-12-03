/*
  Warnings:

  - You are about to drop the column `idSlug` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_idSlug_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "idSlug";
