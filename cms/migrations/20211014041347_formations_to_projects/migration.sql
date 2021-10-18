/*
  Warnings:

  - You are about to drop the `Formation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Event_formations_Formation_events` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Formation_children_Formation_parents` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Formation_people_User_formations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Formation_posts_many` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Formation_tags_Tag_formations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Event_formations_Formation_events" DROP CONSTRAINT "_Event_formations_Formation_events_A_fkey";

-- DropForeignKey
ALTER TABLE "_Event_formations_Formation_events" DROP CONSTRAINT "_Event_formations_Formation_events_B_fkey";

-- DropForeignKey
ALTER TABLE "_Formation_children_Formation_parents" DROP CONSTRAINT "_Formation_children_Formation_parents_A_fkey";

-- DropForeignKey
ALTER TABLE "_Formation_children_Formation_parents" DROP CONSTRAINT "_Formation_children_Formation_parents_B_fkey";

-- DropForeignKey
ALTER TABLE "_Formation_people_User_formations" DROP CONSTRAINT "_Formation_people_User_formations_A_fkey";

-- DropForeignKey
ALTER TABLE "_Formation_people_User_formations" DROP CONSTRAINT "_Formation_people_User_formations_B_fkey";

-- DropForeignKey
ALTER TABLE "_Formation_posts_many" DROP CONSTRAINT "_Formation_posts_many_A_fkey";

-- DropForeignKey
ALTER TABLE "_Formation_posts_many" DROP CONSTRAINT "_Formation_posts_many_B_fkey";

-- DropForeignKey
ALTER TABLE "_Formation_tags_Tag_formations" DROP CONSTRAINT "_Formation_tags_Tag_formations_A_fkey";

-- DropForeignKey
ALTER TABLE "_Formation_tags_Tag_formations" DROP CONSTRAINT "_Formation_tags_Tag_formations_B_fkey";

-- DropTable
DROP TABLE "Formation";

-- DropTable
DROP TABLE "_Event_formations_Formation_events";

-- DropTable
DROP TABLE "_Formation_children_Formation_parents";

-- DropTable
DROP TABLE "_Formation_people_User_formations";

-- DropTable
DROP TABLE "_Formation_posts_many";

-- DropTable
DROP TABLE "_Formation_tags_Tag_formations";

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',
    "acronym" TEXT NOT NULL DEFAULT E'',
    "description" JSONB NOT NULL DEFAULT E'[{"type":"paragraph","children":[{"text":""}]}]',

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Project_people_User_projects" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Project_posts_many" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Project_tags_Tag_projects" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Project_children_Project_parents" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Event_projects_Project_events" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Project_people_User_projects_AB_unique" ON "_Project_people_User_projects"("A", "B");

-- CreateIndex
CREATE INDEX "_Project_people_User_projects_B_index" ON "_Project_people_User_projects"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Project_posts_many_AB_unique" ON "_Project_posts_many"("A", "B");

-- CreateIndex
CREATE INDEX "_Project_posts_many_B_index" ON "_Project_posts_many"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Project_tags_Tag_projects_AB_unique" ON "_Project_tags_Tag_projects"("A", "B");

-- CreateIndex
CREATE INDEX "_Project_tags_Tag_projects_B_index" ON "_Project_tags_Tag_projects"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Project_children_Project_parents_AB_unique" ON "_Project_children_Project_parents"("A", "B");

-- CreateIndex
CREATE INDEX "_Project_children_Project_parents_B_index" ON "_Project_children_Project_parents"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Event_projects_Project_events_AB_unique" ON "_Event_projects_Project_events"("A", "B");

-- CreateIndex
CREATE INDEX "_Event_projects_Project_events_B_index" ON "_Event_projects_Project_events"("B");

-- AddForeignKey
ALTER TABLE "_Project_people_User_projects" ADD FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Project_people_User_projects" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Project_posts_many" ADD FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Project_posts_many" ADD FOREIGN KEY ("B") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Project_tags_Tag_projects" ADD FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Project_tags_Tag_projects" ADD FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Project_children_Project_parents" ADD FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Project_children_Project_parents" ADD FOREIGN KEY ("B") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Event_projects_Project_events" ADD FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Event_projects_Project_events" ADD FOREIGN KEY ("B") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
