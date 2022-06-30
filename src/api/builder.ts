import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
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
}>({
   plugins: [PrismaPlugin],
   prisma: {
      client: prisma,
   },
});

builder.scalarType("Date", {
   serialize: (date: any) => date.toISOString(),
   parseValue: (date: any) => new Date(date),
});
