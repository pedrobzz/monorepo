import express from "express";
import helloRoute from "./routes/Hello/hello.controller";
import cors from "cors";
import { Connection, IDatabaseDriver, MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./config/constants";

import mikroOrmConfig from "./mikro-orm.config";

import { ApolloServer, ExpressContext } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { PostResolver } from "./resolvers/PostResolver";

const app = express();

app.use(cors());

app.use("/", helloRoute);

const main = async () => {
  console.info("[environment: ", process.env.NODE_ENV, "]");
  let tries = 5;
  let apolloServer: ApolloServer<ExpressContext>;
  let orm: MikroORM<IDatabaseDriver<Connection>>;
  while (tries) {
    console.log("Tries: ", tries);
    try {
      orm = await MikroORM.init(mikroOrmConfig);
      console.log("MikroORM Initialized");
      await orm.getMigrator().up();

      apolloServer = new ApolloServer({
        schema: await buildSchema({
          resolvers: [PostResolver],
          validate: false,
        }),
        context: () => ({
          em: orm.em,
        }),
      });
      await apolloServer.start();
      break;
    } catch {
      await new Promise(r => setTimeout(r, 5000));
      tries -= 1;
      console.log("Tries: ", tries);
    }
  }

  apolloServer.applyMiddleware({ app });

  const server = app.listen(4000, () => {
    console.log("listening at 4000!");
  });
  return { orm, server };
};
const result = main();
export default result;
