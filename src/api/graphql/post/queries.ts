import { db } from "../../../db";
import { builder } from "../../builder";

builder.queryFields(t => ({
   allPost: t.prismaField({
      type: ["Post"],
      resolve: query => {
         return db.post.findMany({
            ...query,
         });
      },
   }),
}));
