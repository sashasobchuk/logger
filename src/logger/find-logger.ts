import { LoggerType } from "./types";


export function findLogger(loggers:LoggerType[], name:string):undefined | LoggerType{
  return  loggers.find(l => l.name === name)
}




