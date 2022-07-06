import { builder } from "../../builder";

builder.prismaObject("Comment", {
   fields: t => ({
      id: t.exposeInt("id"),
      comment: t.exposeString("comment"),
      createdAt: t.expose("createdAt", {
         type: "Date",
      }),
      author: t.relation("author"),
      authorId: t.exposeInt("authorId"),
      post: t.relation("post"),
      postId: t.exposeInt("postId"),
      parentId: t.expose("parentId", {
         type: "Int",
         nullable: true,
      }),
      parent: t.relation("parent", { nullable: true }),
      children: t.relation("children", { nullable: true }),
   }),
});

export const GetCommentsInput = builder.inputType("GetCommentsInput", {
   fields: t => ({
      postId: t.int({ required: true }),
      limit: t.int({ required: true }),
      cursor: t.int(),
   }),
});
