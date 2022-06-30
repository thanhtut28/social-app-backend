import { builder } from "../../builder";

builder.prismaObject("Comment", {
   fields: t => ({
      id: t.exposeID("id"),
      comment: t.exposeString("comment"),
      createdAt: t.expose("createdAt", {
         type: "Date",
      }),
      author: t.relation("author"),
      authorId: t.exposeInt("authorId"),
      post: t.relation("post"),
      postId: t.exposeInt("postId"),
   }),
});
