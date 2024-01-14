// import { createPoll } from "./create-poll";
// import {LoggerEntity} from "./LoggerEntity";
import {createPoll} from "../init";
import {LoggerEntity} from "../types";
// import { LoggerEntity } from "../entities";


export async function db_createLogger(loggerEntity: LoggerEntity){
  const {name,params,
  result,executionTime,beginTime,endTime,
  text,showName,id,changeOnRebuild} = loggerEntity
  const pool = createPoll();


 return new Promise(((resolve, reject) => {
   pool.query(`
  INSERT INTO "logger" ("name", "showName","params", "result",
   "executionTime","beginTime","endTime","text","changeOnRebuild")
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9); 
`, [name,!!showName,  !!params, !!result, !!executionTime,
     !!beginTime,!!endTime,text,changeOnRebuild],(error,result)=>{
     if (error) {
       console.log(`db_createLogger`,error);
       reject(error);
     } else {
       resolve(loggerEntity);
     }
     pool.end();

   })

 }))
}



