import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import ScopeAuthPlugin from "@pothos/plugin-scope-auth";
// This is the default location for the generator, but this can be
// customized as described above.
// Using a type only import will help avoid issues with undeclared
// exports in esm mode
import type PrismaTypes from "../../prisma/pothos-types";
import type { Context } from "../context";
import { db as prisma } from "../db";

export const builder = new SchemaBuilder<{
   Context: Context;
   PrismaTypes: PrismaTypes;
   Scalars: {
      Date: {
         Input: Date;
         Output: Date;
      };
   };
   AuthScopes: {
      isLoggedIn: boolean;
   };
}>({
   plugins: [ScopeAuthPlugin, PrismaPlugin],
   prisma: {
      client: prisma,
   },
   authScopes: context => ({
      isLoggedIn: !!context.userId,
   }),
});

builder.scalarType("Date", {
   serialize: (date: any) => date.toISOString(),
   parseValue: (date: any) => new Date(date),
});
