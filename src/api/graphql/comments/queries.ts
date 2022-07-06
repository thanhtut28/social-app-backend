import { AuthenticationError } from "apollo-server-express";
import { IS_NOT_LOGGEDIN } from "../../../constants";
import { db } from "../../../db";
import { builder } from "../../builder";
import { GetCommentsInput } from "./type";

builder.queryFields(t => ({
   getComments: t.prismaField({
      type: ["Comment"],
      args: {
         input: t.arg({
            type: GetCommentsInput,
            required: true,
         }),
      },
      resolve: (query, _root, { input: { postId, limit, cursor } }, { userId }) => {
         if (!userId) throw new AuthenticationError(IS_NOT_LOGGEDIN);

         return db.comment.findMany({
            ...query,
            ...(cursor && {
               skip: 1,
               cursor: {
                  id: cursor,
               },
            }),
            where: {
               postId,
            },
            take: limit,
            orderBy: {
               createdAt: "asc",
               // likeCount: "desc",
            },
         });
      },
   }),
}));
