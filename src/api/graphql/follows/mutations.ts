import { AuthenticationError } from "apollo-server-express";
import { IS_NOT_LOGGEDIN } from "../../../constants";
import { db } from "../../../db";
import { builder } from "../../builder";

builder.mutationFields(t => ({
   followUser: t.field({
      type: "Boolean",
      args: {
         followingId: t.arg({ type: "Int", required: true }),
      },
      resolve: async (_root, { followingId }, { userId }) => {
         if (!userId) throw new AuthenticationError(IS_NOT_LOGGEDIN);
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
