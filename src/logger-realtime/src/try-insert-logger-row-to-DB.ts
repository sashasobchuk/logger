import { checkLoggerInDB } from "./check-logger-in-db";
import {LoggerEntity, LoggerBodyType} from "./types";
import {memory_addLogger, memory_updateLogger} from "./memory";
import {db_createLogger, db_updateLogger} from "./db";

export async function tryInsertLoggerRowToDB(logger_toDB: LoggerEntity,loggers:LoggerEntity[]) {
  /** при перезагрузці апдейтим або створюємо нові логери в базі*/
  const {name} = logger_toDB
  return checkLoggerInDB(name)
      //TODO правлю тайпскрипт
    .then((db_logger) => {

      //todo після бази оновляти чи створювати в памяті
      if (!db_logger) {
        /** якщо нема то створюжмо в базі*/
       return  db_createLogger(logger_toDB)
          .then((data)=>{
            /** і додаємо його в памяті*/
          return   memory_addLogger(db_logger,loggers)
          })
      } else {
        //todo можна буде продумати в яких випадках обновляти
        /** якщо є і потрібно оновити апдейтим його в базі*/
        if(!db_logger.changeOnRebuild){
          /** пропистити оновленя даних на ребілд (буде залишатись апдейт з бази)*/
          return
        }
        return db_updateLogger(logger_toDB)
          .then(data=>{
            /** і апдейтим його в памяті*/
           return  memory_updateLogger(db_logger,loggers)
          })
      }
    }).catch(e=>{
      debugger
      console.error(e)
  });

}


