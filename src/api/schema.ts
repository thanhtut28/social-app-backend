import { builder } from "./builder";
import "./graphql";

builder.queryType({});
builder.mutationType({});

export const schema = builder.toSchema({});
