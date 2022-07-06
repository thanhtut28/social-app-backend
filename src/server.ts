import "dotenv/config";
import express, { Request } from "express";
import { ApolloServer } from "apollo-server-express";
import { schema } from "./api/schema";
import cors from "cors";
import { verify } from "jsonwebtoken";
import { createAccessToken, createRefreshToken } from "./utils/auth";
import { sendRefreshToken } from "./utils/sendRefreshToken";
import cookieParser from "cookie-parser";
import { db } from "./db";
import { isAuth } from "./utils/isAuth";

// import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

(async () => {
   const apolloServer = new ApolloServer({
      schema: schema,
      context: async ({ req, res }) => ({ req, res, userId: isAuth(req) }),
      // plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
   });

   const app = express();

   app.use(
      cors({
         origin: [
            process.env.APOLLO_STUDIO_URL!,
            process.env.FRONTEND_URL!,
            "http://192.168.1.4:3000",
         ],
         credentials: true,
      })
   );
   app.use(cookieParser());

   app.post("/refresh_token", async (req, res) => {
      const token = req.cookies.uid;
      if (!token) {
         return res.send({ ok: false, accessToken: "" });
      }

      let payload: any = null;
      try {
         payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
      } catch (err) {
         console.log(err);
         return res.send({ ok: false, accessToken: "" });
      }

      const user = await db.user.findFirst({ where: { id: payload.userId } });
      if (!user) {
         return res.send({ ok: false, accessToken: "" });
      }

      sendRefreshToken(res, createRefreshToken(user));

      return res.send({ ok: true, accessToken: createAccessToken(user) });
   });

   await apolloServer.start();

   apolloServer.applyMiddleware({ app, cors: false });

   app.listen(4000, () => {
      console.log("the server is running");
   });
})();
