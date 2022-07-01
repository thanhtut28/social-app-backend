import { db } from "../../../db";
import { builder } from "../../builder";
import { GetAllPostsInput } from "./types";

builder.queryFields(t => ({
   allPosts: t.prismaField({
      type: ["Post"],
      args: {
         input: t.arg({
            type: GetAllPostsInput,
            required: true,
         }),
      },
      resolve: (query, _, { input: { userId, limit, cursor } }) => {
         return db.post.findMany({
            ...query,
            ...(cursor && {
               skip: 1,
               cursor: {
                  id: cursor,
               },
            }),
            where: {
               NOT: {
                  authorId: userId,
               },
            },
            take: limit,
            orderBy: {
               createdAt: "desc",
               // likeCount: "desc",
            },
         });
      },
   }),
}));
