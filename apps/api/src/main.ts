import express from "express";
import helloRoute from "./routes/Hello/hello.controller";
import cors from "cors";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./config/constants";

import mikroOrmConfig from "./mikro-orm.config";

import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { PostResolver } from "./resolvers/PostResolver";

const app = express();

app.use(cors());

app.use("/", helloRoute);

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver],
      validate: false,
    }),
    context: () => ({
      em: orm.em,
    }),
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  const server = app.listen(3003, () => {
    console.log("listening at 3003!");
  });
  return { orm, server };
};
const result = main();
export default result;
