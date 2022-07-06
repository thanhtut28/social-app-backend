import { db } from "../../../db";
import { builder } from "../../builder";

builder.mutationFields(t => ({
   savedToCollections: t.field({
      type: "Boolean",
      args: {
         postId: t.arg({ type: "Int", required: true }),
      },
      resolve: async (root, { postId }, { userId }) => {
         if (!userId) return false;
         await db.collectionsOnPosts.create({
            data: {
               userId,
               postId,
            },
         });
         return true;
      },
   }),
}));
