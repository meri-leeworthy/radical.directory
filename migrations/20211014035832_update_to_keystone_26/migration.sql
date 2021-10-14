/*
  Warnings:

  - You are about to drop the column `town` on the `User` table. All the data in the column will be lost.
  - Made the column `name` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Made the column `eventStart` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Made the column `url` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Formation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `acronym` on table `Formation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Formation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `filename` on table `Image` required. This step will fail if there are existing NULL values in that column.
  - Made the column `url` on table `Image` required. This step will fail if there are existing NULL values in that column.
  - Made the column `mimetype` on table `Image` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Image` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `content` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `slug` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Role` required. This step will fail if there are existing NULL values in that column.
  - Made the column `canManageContent` on table `Role` required. This step will fail if there are existing NULL values in that column.
  - Made the column `canManageUsers` on table `Role` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Tag` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Tag` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DEFAULT E'',
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "description" SET DEFAULT E'[{"type":"paragraph","children":[{"text":""}]}]',
ALTER COLUMN "eventStart" SET NOT NULL,
ALTER COLUMN "url" SET NOT NULL,
ALTER COLUMN "url" SET DEFAULT E'';

-- AlterTable
ALTER TABLE "Formation" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DEFAULT E'',
ALTER COLUMN "acronym" SET NOT NULL,
ALTER COLUMN "acronym" SET DEFAULT E'',
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "description" SET DEFAULT E'[{"type":"paragraph","children":[{"text":""}]}]';

-- AlterTable
ALTER TABLE "Image" ALTER COLUMN "filename" SET NOT NULL,
ALTER COLUMN "filename" SET DEFAULT E'',
ALTER COLUMN "url" SET NOT NULL,
ALTER COLUMN "url" SET DEFAULT E'',
ALTER COLUMN "mimetype" SET NOT NULL,
ALTER COLUMN "mimetype" SET DEFAULT E'',
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "description" SET DEFAULT E'';

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "title" SET DEFAULT E'',
ALTER COLUMN "content" SET NOT NULL,
ALTER COLUMN "content" SET DEFAULT E'[{"type":"paragraph","children":[{"text":""}]}]',
ALTER COLUMN "slug" SET NOT NULL,
ALTER COLUMN "slug" SET DEFAULT E'';

-- AlterTable
ALTER TABLE "Role" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DEFAULT E'',
ALTER COLUMN "canManageContent" SET NOT NULL,
ALTER COLUMN "canManageContent" SET DEFAULT false,
ALTER COLUMN "canManageUsers" SET NOT NULL,
ALTER COLUMN "canManageUsers" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Tag" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DEFAULT E'',
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "description" SET DEFAULT E'[{"type":"paragraph","children":[{"text":""}]}]';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "town",
ADD COLUMN     "postcode" TEXT,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DEFAULT E'',
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "email" SET DEFAULT E'',
ALTER COLUMN "password" SET NOT NULL;

-- RenameIndex
ALTER INDEX "Post.author_index" RENAME TO "Post_author_idx";

-- RenameIndex
ALTER INDEX "Post.slug_unique" RENAME TO "Post_slug_key";

-- RenameIndex
ALTER INDEX "User.email_unique" RENAME TO "User_email_key";

-- RenameIndex
ALTER INDEX "User.role_index" RENAME TO "User_role_idx";
