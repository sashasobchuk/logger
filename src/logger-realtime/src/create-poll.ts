import {
  pgHost,
  pguser,
  POSTGRES_DATABASE,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER
} from "./get-typeorm-config";
import {DBParams} from "./types";
import {initLogger, poolParams} from "./init";
// import {poolParams} from "./storage.js";
const { Pool } = require("pg");

// export function createPoll() {
//   if(!poolParams){
//     return console.log(`1111111111111111`)
//   }
//
//   return new Pool(poolParams);
// }






