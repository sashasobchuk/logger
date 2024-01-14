// import { createPoll } from "./create-poll";
import {LoggerEntity, LoggerBodyType} from "./types";
// import {LoggerEntity} from "./db/LoggerEntity";
import {createPoll} from "./init";
// import { LoggerEntity } from "../entities";


export function getLoggersFromDb(loggers:LoggerBodyType[]):Promise<LoggerEntity[]>{
  const pool = createPoll();

  return new Promise((resolve, reject) => {
    pool.query(`select * from "logger"`, (error, result) => {
      if (error) {
        console.error("Error executing SELECT query", error);
        debugger
      } else {

        loggers = result.rows;
        resolve(result.rows)
        return result.rows
      }

      pool.end();
    });

  })


}


