import { builder } from "../../builder";
import { db } from "../../../db";

builder.prismaObject("Post", {
   findUnique: post => ({ id: post.id }),
   fields: t => ({
      id: t.exposeID("id"),
      title: t.exposeString("title"),
      image: t.expose("image", {
         type: "String",
         nullable: true,
      }),
      createdAt: t.expose("createdAt", {
         type: "Date",
      }),
      authorId: t.exposeInt("authorId"),
      author: t.relation("author"),
      comments: t.relation("comments"),
      // likes: t.relation("likes"),
      likeStatus: t.field({
         type: "Boolean",
         args: {
            userId: t.arg({ type: "Int", required: true }),
         },
         resolve: async (post, { userId }) => {
            if (!userId) {
               return false;
            }

            const like = await db.like.findFirst({
               where: {
                  authorId: userId,
                  postId: post.id,
               },
            });

            if (!like) {
               return false;
            }

            return like?.status;
         },
      }),
      likeCount: t.exposeInt("likeCount"),
   }),
});

export const GetAllPostsInput = builder.inputType("GetAllPostsInput", {
   fields: t => ({
      userId: t.int({ required: true }),
      limit: t.int({ required: true }),
      cursor: t.int(),
   }),
});
