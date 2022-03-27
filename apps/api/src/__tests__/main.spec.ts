import { MikroORM, IDatabaseDriver, Connection } from "@mikro-orm/core";
import { Server } from "http";
import supertest from "supertest";
import retrieveServer from "../main";

let server: Server;
let orm: MikroORM<IDatabaseDriver<Connection>>;

describe("Main", () => {
  beforeAll(async () => {
    const result = await retrieveServer;
    orm = result.orm;
    server = result.server;
  });
  afterAll(() => {
    server.close();
    orm.close();
  });
  it("Should return 'Hello, World!'", async () => {
    const result = await supertest(server).get("/");
    expect(result.body.message).toBe("Hello, World!");
  });
});
