import {
  pgHost,
  pguser,
  POSTGRES_DATABASE,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER
} from "../get-typeorm-config";
const { Pool } = require("pg");

export function createPoll() {
  return new Pool({
    type: "postgres",
    port: POSTGRES_PORT,
    password: POSTGRES_PASSWORD,
    username: POSTGRES_USER,
    database: POSTGRES_DATABASE,
    host: pgHost,
    user: pguser

  });
}






