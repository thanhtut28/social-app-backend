import { db } from "../../../db";
import { builder } from "../../builder";

builder.mutationFields(t => ({
   followUser: t.prismaField({
      type: "Follows",
      args: {
         followerId: t.arg({ type: "Int", required: true }),
         followingId: t.arg({ type: "Int", required: true }),
      },
      resolve: (_query, _root, { followerId, followingId }) => {
         return db.follows.create({
            data: {
               followerId,
               followingId,
            },
         });
      },
   }),
}));
