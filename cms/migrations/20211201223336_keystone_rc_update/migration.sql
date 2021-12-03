/*
  Warnings:

  - You are about to drop the `_Event_posts_many` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Event_projects_Project_events` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Event_subscribers_User_eventSubs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Event_tags_Tag_events` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Post_author_User_posts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Post_tags_Tag_posts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Project_children_Project_parents` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Project_members_User_memberOf` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Project_posts_many` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Project_subscribers_User_projectSubs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Project_tags_Tag_projects` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Tag_subscribers_User_tagSubs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Event_posts_many" DROP CONSTRAINT "_Event_posts_many_A_fkey";

-- DropForeignKey
ALTER TABLE "_Event_posts_many" DROP CONSTRAINT "_Event_posts_many_B_fkey";

-- DropForeignKey
ALTER TABLE "_Event_projects_Project_events" DROP CONSTRAINT "_Event_projects_Project_events_A_fkey";

-- DropForeignKey
ALTER TABLE "_Event_projects_Project_events" DROP CONSTRAINT "_Event_projects_Project_events_B_fkey";

-- DropForeignKey
ALTER TABLE "_Event_subscribers_User_eventSubs" DROP CONSTRAINT "_Event_subscribers_User_eventSubs_A_fkey";

-- DropForeignKey
ALTER TABLE "_Event_subscribers_User_eventSubs" DROP CONSTRAINT "_Event_subscribers_User_eventSubs_B_fkey";

-- DropForeignKey
ALTER TABLE "_Event_tags_Tag_events" DROP CONSTRAINT "_Event_tags_Tag_events_A_fkey";

-- DropForeignKey
ALTER TABLE "_Event_tags_Tag_events" DROP CONSTRAINT "_Event_tags_Tag_events_B_fkey";

-- DropForeignKey
ALTER TABLE "_Post_author_User_posts" DROP CONSTRAINT "_Post_author_User_posts_A_fkey";

-- DropForeignKey
ALTER TABLE "_Post_author_User_posts" DROP CONSTRAINT "_Post_author_User_posts_B_fkey";

-- DropForeignKey
ALTER TABLE "_Post_tags_Tag_posts" DROP CONSTRAINT "_Post_tags_Tag_posts_A_fkey";

-- DropForeignKey
ALTER TABLE "_Post_tags_Tag_posts" DROP CONSTRAINT "_Post_tags_Tag_posts_B_fkey";

-- DropForeignKey
ALTER TABLE "_Project_children_Project_parents" DROP CONSTRAINT "_Project_children_Project_parents_A_fkey";

-- DropForeignKey
ALTER TABLE "_Project_children_Project_parents" DROP CONSTRAINT "_Project_children_Project_parents_B_fkey";

-- DropForeignKey
ALTER TABLE "_Project_members_User_memberOf" DROP CONSTRAINT "_Project_members_User_memberOf_A_fkey";

-- DropForeignKey
ALTER TABLE "_Project_members_User_memberOf" DROP CONSTRAINT "_Project_members_User_memberOf_B_fkey";

-- DropForeignKey
ALTER TABLE "_Project_posts_many" DROP CONSTRAINT "_Project_posts_many_A_fkey";

-- DropForeignKey
ALTER TABLE "_Project_posts_many" DROP CONSTRAINT "_Project_posts_many_B_fkey";

-- DropForeignKey
ALTER TABLE "_Project_subscribers_User_projectSubs" DROP CONSTRAINT "_Project_subscribers_User_projectSubs_A_fkey";

-- DropForeignKey
ALTER TABLE "_Project_subscribers_User_projectSubs" DROP CONSTRAINT "_Project_subscribers_User_projectSubs_B_fkey";

-- DropForeignKey
ALTER TABLE "_Project_tags_Tag_projects" DROP CONSTRAINT "_Project_tags_Tag_projects_A_fkey";

-- DropForeignKey
ALTER TABLE "_Project_tags_Tag_projects" DROP CONSTRAINT "_Project_tags_Tag_projects_B_fkey";

-- DropForeignKey
ALTER TABLE "_Tag_subscribers_User_tagSubs" DROP CONSTRAINT "_Tag_subscribers_User_tagSubs_A_fkey";

-- DropForeignKey
ALTER TABLE "_Tag_subscribers_User_tagSubs" DROP CONSTRAINT "_Tag_subscribers_User_tagSubs_B_fkey";

-- DropTable
DROP TABLE "_Event_posts_many";

-- DropTable
DROP TABLE "_Event_projects_Project_events";

-- DropTable
DROP TABLE "_Event_subscribers_User_eventSubs";

-- DropTable
DROP TABLE "_Event_tags_Tag_events";

-- DropTable
DROP TABLE "_Post_author_User_posts";

-- DropTable
DROP TABLE "_Post_tags_Tag_posts";

-- DropTable
DROP TABLE "_Project_children_Project_parents";

-- DropTable
DROP TABLE "_Project_members_User_memberOf";

-- DropTable
DROP TABLE "_Project_posts_many";

-- DropTable
DROP TABLE "_Project_subscribers_User_projectSubs";

-- DropTable
DROP TABLE "_Project_tags_Tag_projects";

-- DropTable
DROP TABLE "_Tag_subscribers_User_tagSubs";

-- CreateTable
CREATE TABLE "_Post_author" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Project_members" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Event_subscribers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Project_subscribers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Tag_subscribers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Post_tags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Project_posts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Event_posts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Project_tags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Event_tags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Project_children" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Event_projects" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Post_author_AB_unique" ON "_Post_author"("A", "B");

-- CreateIndex
CREATE INDEX "_Post_author_B_index" ON "_Post_author"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Project_members_AB_unique" ON "_Project_members"("A", "B");

-- CreateIndex
CREATE INDEX "_Project_members_B_index" ON "_Project_members"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Event_subscribers_AB_unique" ON "_Event_subscribers"("A", "B");

-- CreateIndex
CREATE INDEX "_Event_subscribers_B_index" ON "_Event_subscribers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Project_subscribers_AB_unique" ON "_Project_subscribers"("A", "B");

-- CreateIndex
CREATE INDEX "_Project_subscribers_B_index" ON "_Project_subscribers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Tag_subscribers_AB_unique" ON "_Tag_subscribers"("A", "B");

-- CreateIndex
CREATE INDEX "_Tag_subscribers_B_index" ON "_Tag_subscribers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Post_tags_AB_unique" ON "_Post_tags"("A", "B");

-- CreateIndex
CREATE INDEX "_Post_tags_B_index" ON "_Post_tags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Project_posts_AB_unique" ON "_Project_posts"("A", "B");

-- CreateIndex
CREATE INDEX "_Project_posts_B_index" ON "_Project_posts"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Event_posts_AB_unique" ON "_Event_posts"("A", "B");

-- CreateIndex
CREATE INDEX "_Event_posts_B_index" ON "_Event_posts"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Project_tags_AB_unique" ON "_Project_tags"("A", "B");

-- CreateIndex
CREATE INDEX "_Project_tags_B_index" ON "_Project_tags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Event_tags_AB_unique" ON "_Event_tags"("A", "B");

-- CreateIndex
CREATE INDEX "_Event_tags_B_index" ON "_Event_tags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Project_children_AB_unique" ON "_Project_children"("A", "B");

-- CreateIndex
CREATE INDEX "_Project_children_B_index" ON "_Project_children"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Event_projects_AB_unique" ON "_Event_projects"("A", "B");

-- CreateIndex
CREATE INDEX "_Event_projects_B_index" ON "_Event_projects"("B");

-- AddForeignKey
ALTER TABLE "_Post_author" ADD FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Post_author" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Project_members" ADD FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Project_members" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Event_subscribers" ADD FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Event_subscribers" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Project_subscribers" ADD FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Project_subscribers" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Tag_subscribers" ADD FOREIGN KEY ("A") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Tag_subscribers" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Post_tags" ADD FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Post_tags" ADD FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Project_posts" ADD FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Project_posts" ADD FOREIGN KEY ("B") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Event_posts" ADD FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Event_posts" ADD FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Project_tags" ADD FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Project_tags" ADD FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Event_tags" ADD FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Event_tags" ADD FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Project_children" ADD FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Project_children" ADD FOREIGN KEY ("B") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Event_projects" ADD FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Event_projects" ADD FOREIGN KEY ("B") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
