import { verify } from "jsonwebtoken";
import { db } from "../../db";
import { builder } from "../builder";

builder.queryType({
   fields: t => ({
      allUsers: t.prismaField({
         type: ["User"],
         resolve: (query, root, args, context) => {
            return db.user.findMany();
         },
      }),
      me: t.prismaField({
         type: "User",
         nullable: true,
         resolve: (query, root, args, context) => {
            const authorization = context.req.headers["authorization"];

            if (!authorization) {
               return null;
            }

            try {
               const token = authorization.split(" ")[1];
               const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);

               return db.user.findFirst({ where: { id: payload.userId } });
            } catch (err) {
               console.log(err);
               return null;
            }
         },
      }),
   }),
});
