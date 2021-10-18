/*
  Warnings:

  - You are about to drop the column `src` on the `Image` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Image" DROP COLUMN "src",
ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "description" JSONB;

-- CreateTable
CREATE TABLE "Formation" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "acronym" TEXT,
    "description" JSONB,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "description" JSONB,
    "eventStart" TIMESTAMP(3),
    "eventEnd" TIMESTAMP(3),
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "url" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Formation_people_User_formations" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Formation_posts_many" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Event_posts_many" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Formation_tags_Tag_formations" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Formation_children_Formation_parents" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Event_formations_Formation_events" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Formation_people_User_formations_AB_unique" ON "_Formation_people_User_formations"("A", "B");

-- CreateIndex
CREATE INDEX "_Formation_people_User_formations_B_index" ON "_Formation_people_User_formations"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Formation_posts_many_AB_unique" ON "_Formation_posts_many"("A", "B");

-- CreateIndex
CREATE INDEX "_Formation_posts_many_B_index" ON "_Formation_posts_many"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Event_posts_many_AB_unique" ON "_Event_posts_many"("A", "B");

-- CreateIndex
CREATE INDEX "_Event_posts_many_B_index" ON "_Event_posts_many"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Formation_tags_Tag_formations_AB_unique" ON "_Formation_tags_Tag_formations"("A", "B");

-- CreateIndex
CREATE INDEX "_Formation_tags_Tag_formations_B_index" ON "_Formation_tags_Tag_formations"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Formation_children_Formation_parents_AB_unique" ON "_Formation_children_Formation_parents"("A", "B");

-- CreateIndex
CREATE INDEX "_Formation_children_Formation_parents_B_index" ON "_Formation_children_Formation_parents"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Event_formations_Formation_events_AB_unique" ON "_Event_formations_Formation_events"("A", "B");

-- CreateIndex
CREATE INDEX "_Event_formations_Formation_events_B_index" ON "_Event_formations_Formation_events"("B");

-- AddForeignKey
ALTER TABLE "_Formation_people_User_formations" ADD FOREIGN KEY ("A") REFERENCES "Formation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Formation_people_User_formations" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Formation_posts_many" ADD FOREIGN KEY ("A") REFERENCES "Formation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Formation_posts_many" ADD FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Event_posts_many" ADD FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Event_posts_many" ADD FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Formation_tags_Tag_formations" ADD FOREIGN KEY ("A") REFERENCES "Formation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Formation_tags_Tag_formations" ADD FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Formation_children_Formation_parents" ADD FOREIGN KEY ("A") REFERENCES "Formation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Formation_children_Formation_parents" ADD FOREIGN KEY ("B") REFERENCES "Formation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Event_formations_Formation_events" ADD FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Event_formations_Formation_events" ADD FOREIGN KEY ("B") REFERENCES "Formation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
