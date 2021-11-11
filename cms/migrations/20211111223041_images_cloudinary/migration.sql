/*
  Warnings:

  - You are about to drop the column `filename` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `filesize` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `mimetype` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Image` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Image" DROP COLUMN "filename",
DROP COLUMN "filesize",
DROP COLUMN "mimetype",
DROP COLUMN "url",
ADD COLUMN     "image" JSONB;
