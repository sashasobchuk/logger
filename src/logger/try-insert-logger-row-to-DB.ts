import { LoggerEntity } from "../entities";
import { checkLoggerInDB } from "./check-logger-in-db";
import { db_createLogger } from "./db_create-logger";
import { db_updateLogger } from "./db_update-logger";
import { memory_addLogger } from "./memory_addLogger";
import { LoggerType } from "./types";
import { memory_updateLogger } from "./memory_update-logger";

export async function tryInsertLoggerRowToDB(loggerEntity: LoggerEntity,loggers:LoggerType[]) {
  /** при перезагрузці апдейтим або створюємо нові логери в базі*/
  const {name} = loggerEntity
  return checkLoggerInDB(name)
    .then((logger) => {
      //todo після бази оновляти чи створювати в памяті
      if (!logger) {
        /** якщо нема то створюжмо в базі*/
       return  db_createLogger(loggerEntity)
          .then((data)=>{
            /** і додаємо його в памяті*/
          return   memory_addLogger(logger,loggers)
          })
      } else {
        //todo можна буде продумати в яких випадках обновляти
        /** якщо є апдейтим його в базі*/
        return db_updateLogger(loggerEntity)
          .then(data=>{
            /** і апдейтим його в памяті*/
           return  memory_updateLogger(logger,loggers)
          })
      }
    }).catch(e=>{
      debugger
      console.error(e)
  });

}


