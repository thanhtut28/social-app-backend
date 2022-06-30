import { builder } from "../../builder";
import {} from "@pothos/core";

builder.prismaObject("Post", {
   findUnique: post => ({ id: post.id }),
   fields: t => ({
      id: t.exposeID("id"),
      title: t.exposeString("title"),
      image: t.expose("image", {
         type: "String",
         nullable: true,
      }),
      createdAt: t.expose("createdAt", {
         type: "Date",
      }),
      authorId: t.exposeInt("authorId"),
      author: t.relation("author"),
      comments: t.relation("comments"),
   }),
});

// export const UpdatePostInput = builder.inputType('')
