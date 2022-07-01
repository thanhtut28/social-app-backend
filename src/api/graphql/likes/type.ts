import { builder } from "../../builder";

builder.prismaObject("Like", {
   fields: t => ({
      id: t.exposeID("id"),
      status: t.exposeBoolean("status"),
      author: t.relation("author"),
      post: t.relation("post"),
      authorId: t.exposeInt("authorId"),
      postId: t.exposeInt("postId"),
   }),
});
