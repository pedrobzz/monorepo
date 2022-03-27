import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { __prod__ } from "./config/constants";
import { Post } from "./entities/Post";

const mikroOrmConfig = {
  dbName: "monorepo-db",
  type: "postgresql",
  debug: !__prod__,
  user: "postgres",
  password: "postgres",
  entities: [Post],
  allowGlobalContext: true,

  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
} as Parameters<typeof MikroORM.init>[0];

export default mikroOrmConfig;
