import { Request } from "express";
import { verify } from "jsonwebtoken";

export const isAuth = (req: Request) => {
   const authorization = req.headers["authorization"];

   if (!authorization) {
      return null;
   }

   try {
      const token = authorization.split(" ")[1];
      const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
      return payload.userId;
   } catch (err) {
      console.log(`Error: ${err}`);
      return null;
   }
};
