import { builder } from "../../builder";

builder.prismaObject("Like", {
   fields: t => ({
      id: t.exposeInt("id"),
      status: t.exposeBoolean("status"),
      author: t.relation("author"),
      post: t.relation("post"),
      authorId: t.exposeInt("authorId"),
      postId: t.exposeInt("postId"),
   }),
});
