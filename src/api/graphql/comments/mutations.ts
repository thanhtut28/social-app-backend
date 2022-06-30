import { db } from "../../../db";
import { builder } from "../../builder";

builder.mutationFields(t => ({
   createComment: t.prismaField({
      type: "Comment",
      args: {
         authorId: t.arg({ type: "Int", required: true }),
         postId: t.arg({ type: "Int", required: true }),
         comment: t.arg({ type: "String", required: true }),
      },
      resolve: (_query, _root, { authorId, postId, comment }) => {
         return db.comment.create({
            data: {
               authorId,
               postId,
               comment,
            },
         });
      },
   }),
   updateComment: t.prismaField({
      type: "Comment",
      nullable: true,
      args: {
         authorId: t.arg({ type: "Int", required: true }),
         newComment: t.arg({ type: "String", required: true }),
         commentId: t.arg({ type: "Int", required: true }),
      },
      resolve: async (_query, _root, { authorId, newComment, commentId }) => {
         const comment = await db.comment.findFirst({
            where: {
               id: commentId,
               authorId,
            },
         });

         if (comment?.authorId === authorId) {
            return db.comment.update({
               where: {
                  id: commentId,
               },
               data: {
                  comment: newComment,
               },
            });
         }

         return null;
      },
   }),
}));
