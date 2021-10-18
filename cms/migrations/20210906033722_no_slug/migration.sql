-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "password" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "status" TEXT,
    "content" JSONB,
    "publishDate" TIMESTAMP(3),
    "author" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Post_tags_Tag_posts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE INDEX "Post.author_index" ON "Post"("author");

-- CreateIndex
CREATE UNIQUE INDEX "_Post_tags_Tag_posts_AB_unique" ON "_Post_tags_Tag_posts"("A", "B");

-- CreateIndex
CREATE INDEX "_Post_tags_Tag_posts_B_index" ON "_Post_tags_Tag_posts"("B");

-- AddForeignKey
ALTER TABLE "Post" ADD FOREIGN KEY ("author") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Post_tags_Tag_posts" ADD FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Post_tags_Tag_posts" ADD FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
