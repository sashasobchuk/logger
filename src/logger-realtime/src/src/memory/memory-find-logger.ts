import {LoggerEntity, LoggerBodyType} from "../types";


export function memoryFindLogger(loggers:LoggerEntity[], name:string):undefined | LoggerBodyType{
  return  loggers.find(l => l.name === name)
}




