import { builder } from "./builder";
import "./graphql";

builder.queryType({
   // authScopes: {
   //    isLoggedIn: true,
   // },
});
builder.mutationType({
   // authScopes: {
   //    isLoggedIn: true,
   // },
});

export const schema = builder.toSchema({});
