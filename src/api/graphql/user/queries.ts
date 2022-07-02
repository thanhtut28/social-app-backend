import { AuthenticationError } from "apollo-server-express";
import { verify } from "jsonwebtoken";
import { db } from "../../../db";
import { builder } from "../../builder";

builder.queryFields(t => ({
   allUsers: t.prismaField({
      type: ["User"],
      resolve: query => {
         return db.user.findMany({
            ...query,
         });
      },
   }),
   me: t.prismaField({
      type: "User",
      nullable: true,
      resolve: (query, root, args, { userId }) => {
         if (!userId) throw new AuthenticationError("not authorized");

         return db.user.findFirst({
            ...query,
            where: {
               id: userId,
            },
         });
      },
   }),
}));
