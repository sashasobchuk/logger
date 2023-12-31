import { createPoll } from "./create-pooll";
import { LoggerEntity } from "../entities";


export async function db_createLogger(loggerEntity: LoggerEntity){
  const {name,params,
  result,executionTime,beginTime,endTime,
  text,showName,id} = loggerEntity
  const pool = createPoll();


 return new Promise(((resolve, reject) => {
   pool.query(`
  INSERT INTO "logger" ("name", "showName","params", "result",
   "executionTime","beginTime","endTime","text")
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
`, [name,!!showName,  !!params, !!result, !!executionTime,
     !!beginTime,!!endTime,text],(error,result)=>{
     if (error) {
       console.log(error);
       reject(error);
     } else {
       resolve(loggerEntity);
     }
     pool.end();

   })

 }))
}



