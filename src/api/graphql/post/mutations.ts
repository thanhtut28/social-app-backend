import { AuthenticationError } from "apollo-server-express";
import { IS_NOT_LOGGEDIN } from "../../../constants";
import { db } from "../../../db";
import { builder } from "../../builder";

builder.mutationFields(t => ({
   createPost: t.prismaField({
      type: "Post",
      args: {
         title: t.arg({
            type: "String",
         }),
         image: t.arg({
            type: "String",
            required: true,
         }),
      },
      resolve: (_query, _root, { title, image }, { userId }) => {
         if (!userId) throw new AuthenticationError(IS_NOT_LOGGEDIN);
         return db.post.create({
            data: {
               authorId: userId,
               title: title,
               image: image,
            },
         });
      },
   }),
   deletePost: t.field({
      type: "Boolean",
      args: {
         postId: t.arg({
            type: "Int",
            required: true,
         }),
      },
      resolve: async (_root, { postId }) => {
         await db.post.delete({
            where: {
               id: postId,
            },
         });
         return true;
      },
   }),
   updatePost: t.prismaField({
      type: "Post",
      nullable: true,
      args: {
         title: t.arg({
            type: "String",
         }),
         image: t.arg({
            type: "String",
         }),
         postId: t.arg({
            type: "Int",
            required: true,
         }),
      },
      resolve: async (_query, _root, { title, image, postId }, { userId }) => {
         const post = await db.post.findFirst({
            where: {
               id: postId,
            },
         });

         if (post?.authorId === userId) {
            return db.post.update({
               where: {
                  id: post.id,
               },
               data: {
                  ...(title && { title }),
                  ...(image && { image }),
               },
            });
         }

         return null;
      },
   }),
}));
