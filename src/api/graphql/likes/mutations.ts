import { AuthenticationError } from "apollo-server-express";
import { IS_NOT_LOGGEDIN } from "../../../constants";
import { db } from "../../../db";
import { builder } from "../../builder";

builder.mutationFields(t => ({
   likePost: t.field({
      type: "Boolean",
      args: {
         postId: t.arg({ type: "Int", required: true }),
      },
      resolve: async (_root, { postId }, { userId }) => {
         if (!userId) throw new AuthenticationError(IS_NOT_LOGGEDIN);
         const like = await db.like.findFirst({
            where: {
               authorId: userId,
               postId,
            },
         });

         if (like) {
            const data = await db.$transaction([
               db.like.update({
                  where: {
                     id: like.id,
                  },
                  data: {
                     status: !like.status,
                  },
               }),
               db.post.update({
                  where: {
                     id: postId,
                  },
                  data: {
                     likeCount: {
                        ...(like.status ? { decrement: 1 } : { increment: 1 }),
                     },
                  },
               }),
            ]);
            console.log("already liked", data);

            return true;
         }
         const data = await db.$transaction([
            db.like.create({
               data: {
                  authorId: userId,
                  postId,
                  status: true,
               },
            }),
            db.post.update({
               where: {
                  id: postId,
               },
               data: {
                  likeCount: {
                     increment: 1,
                  },
               },
            }),
         ]);

         console.log("like", data);
         return true;
      },
   }),
}));
