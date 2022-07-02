import { AuthenticationError } from "apollo-server-express";
import { IS_NOT_LOGGEDIN } from "../../../constants";
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
      resolve: (query, _, { input: { limit, cursor } }, { userId }) => {
         if (!userId) throw new AuthenticationError(IS_NOT_LOGGEDIN);
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
