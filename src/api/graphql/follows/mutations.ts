import { db } from "../../../db";
import { builder } from "../../builder";

builder.mutationFields(t => ({
   followUser: t.field({
      type: "Boolean",
      args: {
         followingId: t.arg({ type: "Int", required: true }),
      },
      resolve: async (_root, { followingId }, { userId }) => {
         if (!userId) throw new Error("user is not logged in");
         const isFollowed = !!(await db.follows.findFirst({
            where: { followerId: userId, followingId },
         }));

         if (isFollowed) {
            // toggle follow ==> unfollow user
            await db.follows.delete({
               where: {
                  followerId_followingId: {
                     followerId: userId,
                     followingId,
                  },
               },
            });
            return true;
         }

         await db.follows.create({
            data: {
               followerId: userId,
               followingId,
            },
         });
         return true;
      },
   }),
}));
