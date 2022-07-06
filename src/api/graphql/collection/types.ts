import { builder } from "../../builder";

builder.prismaObject("CollectionsOnPosts", {
   fields: t => ({
      postId: t.exposeInt("postId"),
      userId: t.exposeInt("userId"),
      post: t.relation("post"),
      user: t.relation("user"),
   }),
});
