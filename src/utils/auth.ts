import { User } from "@prisma/client";
import { sign } from "jsonwebtoken";

export const createAccessToken = (user: User) => {
   return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: "15min",
   });
};

export const createRefreshToken = (user: User) => {
   return sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET!, {
      expiresIn: "7d",
   });
};
