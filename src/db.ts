import { PrismaClient } from "@prisma/client";
import colors from "colors";

export const db = new PrismaClient({
   log: [
      {
         emit: "event",
         level: "query",
      },
      {
         emit: "stdout",
         level: "error",
      },
      {
         emit: "stdout",
         level: "info",
      },
      {
         emit: "stdout",
         level: "warn",
      },
   ],
});

db.$on("query", e => {
   console.log(colors.green("Query: ") + e.query);
   console.log(colors.blue("Params: ") + e.params);
   console.log(colors.yellow("Duration: ") + e.duration + "ms");
});
