/*
  Warnings:

  - You are about to drop the column `author` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `_Project_people_User_projects` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_author_fkey";

-- DropForeignKey
ALTER TABLE "_Project_people_User_projects" DROP CONSTRAINT "_Project_people_User_projects_A_fkey";

-- DropForeignKey
ALTER TABLE "_Project_people_User_projects" DROP CONSTRAINT "_Project_people_User_projects_B_fkey";

-- DropIndex
DROP INDEX "Post_author_idx";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "location" JSONB;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "author";

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "acronym" DROP NOT NULL,
ALTER COLUMN "acronym" DROP DEFAULT;

-- DropTable
DROP TABLE "_Project_people_User_projects";

-- CreateTable
CREATE TABLE "_Post_author_User_posts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Project_members_User_memberOf" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Event_subscribers_User_eventSubs" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Project_subscribers_User_projectSubs" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Tag_subscribers_User_tagSubs" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Event_tags_Tag_events" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Post_author_User_posts_AB_unique" ON "_Post_author_User_posts"("A", "B");

-- CreateIndex
CREATE INDEX "_Post_author_User_posts_B_index" ON "_Post_author_User_posts"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Project_members_User_memberOf_AB_unique" ON "_Project_members_User_memberOf"("A", "B");

-- CreateIndex
CREATE INDEX "_Project_members_User_memberOf_B_index" ON "_Project_members_User_memberOf"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Event_subscribers_User_eventSubs_AB_unique" ON "_Event_subscribers_User_eventSubs"("A", "B");

-- CreateIndex
CREATE INDEX "_Event_subscribers_User_eventSubs_B_index" ON "_Event_subscribers_User_eventSubs"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Project_subscribers_User_projectSubs_AB_unique" ON "_Project_subscribers_User_projectSubs"("A", "B");

-- CreateIndex
CREATE INDEX "_Project_subscribers_User_projectSubs_B_index" ON "_Project_subscribers_User_projectSubs"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Tag_subscribers_User_tagSubs_AB_unique" ON "_Tag_subscribers_User_tagSubs"("A", "B");

-- CreateIndex
CREATE INDEX "_Tag_subscribers_User_tagSubs_B_index" ON "_Tag_subscribers_User_tagSubs"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Event_tags_Tag_events_AB_unique" ON "_Event_tags_Tag_events"("A", "B");

-- CreateIndex
CREATE INDEX "_Event_tags_Tag_events_B_index" ON "_Event_tags_Tag_events"("B");

-- AddForeignKey
ALTER TABLE "_Post_author_User_posts" ADD FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Post_author_User_posts" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Project_members_User_memberOf" ADD FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Project_members_User_memberOf" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Event_subscribers_User_eventSubs" ADD FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Event_subscribers_User_eventSubs" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Project_subscribers_User_projectSubs" ADD FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Project_subscribers_User_projectSubs" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Tag_subscribers_User_tagSubs" ADD FOREIGN KEY ("A") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Tag_subscribers_User_tagSubs" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Event_tags_Tag_events" ADD FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Event_tags_Tag_events" ADD FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
