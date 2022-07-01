import { Prisma, User } from "@prisma/client";
import { Request, Response } from "express";

export interface Context {
   req: Request;
   res: Response;
   userId: number | null;
}
