import { builder } from "./builder";
import "./graphql";

builder.queryType({});
builder.mutationType({
   authScopes: {
      isLoggedIn: true,
   },
});

export const schema = builder.toSchema({});
