import { createPoll } from "./create-pooll";
import { LoggerType } from "./types";
import { LoggerEntity } from "../entities";


export function fillMemoryFromDb(loggers:LoggerType[]):Promise<LoggerEntity>{
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


