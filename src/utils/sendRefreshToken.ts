import { Response } from "express";
import { JWT_COOKIE } from "../constants";

export const sendRefreshToken = (res: Response, token: string) => {
   return res.cookie(JWT_COOKIE, token, {
      httpOnly: true,
      maxAge: 100 * 60 * 60 * 24 * 365,
   });
};
