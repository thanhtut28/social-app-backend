import { User } from "@prisma/client";
import { builder } from "../../builder";

interface ILoginResponse {
   acessToken: string;
   user: User;
}

export const LoginInput = builder.inputType("LoginInput", {
   fields: t => ({
      email: t.string({ required: true }),
      password: t.string({ required: true }),
   }),
});

export const SignUpInput = builder.inputType("SignUpInput", {
   fields: t => ({
      name: t.string({ required: true }),
      email: t.string({ required: true }),
      password: t.string({ required: true }),
   }),
});

export const ChangePasswordInput = builder.inputType("ChangeInputPassword", {
   fields: t => ({
      email: t.string({ required: true }),
      password: t.string({ required: true }),
      newPassword: t.string({ required: true }),
   }),
});

export const LoginResponse = builder.objectRef<ILoginResponse>("LoginResponse");

builder.objectType(LoginResponse, {
   fields: t => ({
      accessToken: t.exposeString("acessToken"),
      user: t.field({
         type: UserRef,
         resolve: response => response.user,
      }),
   }),
});

export const UserRef = builder.prismaObject("User", {
   findUnique: user => ({ id: user.id }),
   name: "User",
   fields: t => ({
      id: t.exposeID("id"),
      name: t.exposeString("name"),
      email: t.exposeString("email"),
      // password: t.exposeString("password"),
      posts: t.relation("posts"),
      following: t.relation("following"),
      followers: t.relation("followedBy"),
   }),
});
