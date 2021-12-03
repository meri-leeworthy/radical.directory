/*
  Warnings:

  - You are about to drop the column `slug` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[idSlug]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_slug_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "slug",
ADD COLUMN     "idSlug" TEXT NOT NULL DEFAULT E'';

-- CreateIndex
CREATE UNIQUE INDEX "User_idSlug_key" ON "User"("idSlug");
