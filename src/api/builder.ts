import SchemaBuilder from "@pothos/core";
import { PrismaClient } from "@prisma/client";
import PrismaPlugin from "@pothos/plugin-prisma";
// This is the default location for the generator, but this can be
// customized as described above.
// Using a type only import will help avoid issues with undeclared
// exports in esm mode
import type PrismaTypes from "../../prisma/pothos-types";
import type { Context } from "../context";

const prisma = new PrismaClient();

export const builder = new SchemaBuilder<{
   Context: Context;
   PrismaTypes: PrismaTypes;
}>({
   plugins: [PrismaPlugin],
   prisma: {
      client: prisma,
   },
});
