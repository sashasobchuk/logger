import {createPoll} from "../init";

export function db_table_once_createLogger(){
  const pool = createPoll();
  return new Promise(((resolve, reject) => {
    pool.query(`
    CREATE TABLE IF NOT EXISTS logger (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    showName BOOLEAN NOT NULL DEFAULT false,
    params BOOLEAN NOT NULL DEFAULT false,
    result BOOLEAN NOT NULL DEFAULT false,
    executionTime BOOLEAN NOT NULL DEFAULT false,
    beginTime BOOLEAN NOT NULL DEFAULT false,
    endTime BOOLEAN NOT NULL DEFAULT false,
    changeOnRebuild BOOLEAN NOT NULL DEFAULT false,
    text VARCHAR DEFAULT NULL
);
    `,(error,result)=>{
      if (error) {
        console.log(`db_createLogger`,error);
        reject(error);
      } else {
        resolve(result);
      }
      pool.end();

    })

  }))

}