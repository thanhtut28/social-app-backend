import { hash, compare } from "bcryptjs";
import { JWT_COOKIE } from "../../../constants";
import { db } from "../../../db";
import { createRefreshToken, createAccessToken } from "../../../utils/auth";
import { sendRefreshToken } from "../../../utils/sendRefreshToken";
import { builder } from "../../builder";
import { SignUpInput, LoginResponse, LoginInput, ChangePasswordInput } from "./types";

builder.mutationFields(t => ({
   signUp: t.prismaField({
      type: "User",
      nullable: true,
      skipTypeScopes: true,
      args: {
         input: t.arg({
            type: SignUpInput,
            required: true,
         }),
      },
      resolve: async (_query, _root, { input }) => {
         const hashedPassword = await hash(input.password, 12);

         return db.user.create({
            data: {
               name: input.name,
               email: input.email,
               password: hashedPassword,
            },
         });
      },
   }),
   signIn: t.field({
      type: LoginResponse,
      nullable: true,
      skipTypeScopes: true,
      args: {
         input: t.arg({
            type: LoginInput,
            required: true,
         }),
      },
      resolve: async (_root, { input }, { res }) => {
         if (input.email === "" || input.password === "") return null;
         const user = await db.user.findFirst({ where: { email: input.email } });
         if (!user) {
            return null;
         }

         const verify = await compare(input.password, user.password);
         if (!verify) {
            return null;
         }

         sendRefreshToken(res, createRefreshToken(user));

         return { acessToken: createAccessToken(user), user };
      },
   }),
   logout: t.field({
      type: "Boolean",
      resolve: (_root, _args, { res }) => {
         try {
            res.clearCookie(JWT_COOKIE);
            return true;
         } catch (err) {
            console.log(err);
            return false;
         }
      },
   }),
   changePassword: t.field({
      type: "String",
      args: {
         input: t.arg({
            type: ChangePasswordInput,
            required: true,
         }),
      },
      resolve: async (_root, { input: { email, password, newPassword } }, { req }) => {
         const user = await db.user.findFirst({ where: { email } });

         if (!user) {
            return "user not found";
         }

         const verify = await compare(password, user.password);

         if (!verify) {
            return "password incorrect";
         }

         try {
            const hashedPassword = await hash(newPassword, 12);

            await db.user.update({
               where: {
                  id: user.id,
               },
               data: {
                  password: hashedPassword,
               },
            });

            return "changed password successfully";
         } catch (err) {
            return `Error: ${err}`;
         }
      },
   }),
}));
