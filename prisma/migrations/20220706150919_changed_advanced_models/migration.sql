/*
  Warnings:

  - A unique constraint covering the columns `[parentId]` on the table `Comment` will be added. If there are existing duplicate values, this will fail.
  - Made the column `image` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "parentId" INTEGER;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "image" SET NOT NULL;

-- CreateTable
CREATE TABLE "CollectionsOnPosts" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "CollectionsOnPosts_pkey" PRIMARY KEY ("userId","postId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Comment_parentId_key" ON "Comment"("parentId");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionsOnPosts" ADD CONSTRAINT "CollectionsOnPosts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionsOnPosts" ADD CONSTRAINT "CollectionsOnPosts_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
