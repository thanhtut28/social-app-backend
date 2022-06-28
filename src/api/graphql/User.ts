import { builder } from "../builder";

export const UserRef = builder.prismaObject("User", {
   fields: t => ({
      id: t.exposeID("id"),
      name: t.exposeString("name"),
      email: t.exposeString("email"),
      password: t.exposeString("password"),
   }),
});
