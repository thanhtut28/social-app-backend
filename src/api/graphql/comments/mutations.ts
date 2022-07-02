import { AuthenticationError } from "apollo-server-express";
import { IS_NOT_LOGGEDIN } from "../../../constants";
import { db } from "../../../db";
import { builder } from "../../builder";

builder.mutationFields(t => ({
   createComment: t.prismaField({
      type: "Comment",
      args: {
         postId: t.arg({ type: "Int", required: true }),
         comment: t.arg({ type: "String", required: true }),
      },
      resolve: (_query, _root, { postId, comment }, { userId }) => {
         if (!userId) throw new AuthenticationError(IS_NOT_LOGGEDIN);
         return db.comment.create({
            data: {
               authorId: userId,
               postId,
               comment,
            },
         });
      },
   }),
   updateComment: t.prismaField({
      type: "Comment",
      args: {
         newComment: t.arg({ type: "String", required: true }),
         commentId: t.arg({ type: "Int", required: true }),
      },
      resolve: async (_query, _root, { newComment, commentId }, { userId }) => {
         if (!userId) throw new AuthenticationError(IS_NOT_LOGGEDIN);
         const comment = await db.comment.findFirst({
            where: {
               id: commentId,
            },
         });

         if (comment?.authorId === userId) {
            return db.comment.update({
               where: {
                  id: commentId,
               },
               data: {
                  comment: newComment,
               },
            });
         }

         throw new Error(`You cannot update other comments`);
      },
   }),
}));
