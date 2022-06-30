import { builder } from "../../builder";

export const Follows = builder.prismaObject("Follows", {
   name: "follows",
   fields: t => ({
      follower: t.relation("follower"),
      following: t.relation("following"),
      followerId: t.exposeInt("followerId"),
      followingId: t.exposeInt("followingId"),
   }),
});
