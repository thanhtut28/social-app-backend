import { User } from "@prisma/client";
import { compare, hash } from "bcryptjs";
import { JWT_COOKIE } from "../../constants";
import { db } from "../../db";
import { createAccessToken, createRefreshToken } from "../../utils/auth";
import { sendRefreshToken } from "../../utils/sendRefreshToken";
import { builder } from "../builder";
import { UserRef } from "./User";

interface ILoginResponse {
   acessToken: string;
   user: User;
}

const LoginInput = builder.inputType("LoginInput", {
   fields: t => ({
      email: t.string({ required: true }),
      password: t.string({ required: true }),
   }),
});

const SignUpInput = builder.inputType("SignUpInput", {
   fields: t => ({
      name: t.string({ required: true }),
      email: t.string({ required: true }),
      password: t.string({ required: true }),
   }),
});

const LoginResponse = builder.objectRef<ILoginResponse>("LoginResponse").implement({
   fields: t => ({
      accessToken: t.exposeString("acessToken"),
      user: t.field({
         type: UserRef,
         resolve: response => response.user,
      }),
   }),
});

const ChangePasswordInput = builder.inputType("ChangeInputPassword", {
   fields: t => ({
      email: t.string({ required: true }),
      password: t.string({ required: true }),
      newPassword: t.string({ required: true }),
   }),
});

builder.mutationType({
   fields: t => ({
      signUp: t.prismaField({
         type: "User",
         nullable: true,
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
   }),
});
