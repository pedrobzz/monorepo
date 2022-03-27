import { EntityManager, Connection } from "@mikro-orm/core";
import { IDatabaseDriver } from "@mikro-orm/core/drivers/IDatabaseDriver";

export type Context = { em: EntityManager<IDatabaseDriver<Connection>> };
