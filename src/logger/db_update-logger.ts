import { createPoll } from "./create-pooll";
import { LoggerEntity } from "../entities";


export async function db_updateLogger(
  {
    name,
    params,
    result,
    executionTime, beginTime,
    endTime,
    text,
    showName,
    changeOnRebuild
  }: LoggerEntity
){
  const pool = createPoll();


 return new Promise(((resolve, reject) => {
   pool.query(`
     update "logger"  set 
     "params" = $1,
     "result" = $2,
     "executionTime" = $3,
     "beginTime" = $4,
     "endTime" = $5,
     "text" = $6,
     "showName" = $7,
     "changeOnRebuild" = $8
     where "name" = $9
   `, [
     !!params,
     !!result,
     !!executionTime,
     !!beginTime,
     !!endTime,
     text,
     !!showName,
     changeOnRebuild,
       name
     ],
     (error, result) => {
       if (error) {
         debugger;
         console.log(`db_updateLogger`,error);
         reject(error);
       } else {
         resolve(result);
       }
       pool.end();

     }
   )

 }))
}



