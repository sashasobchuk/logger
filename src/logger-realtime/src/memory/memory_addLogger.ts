import {LoggerEntity, LoggerBodyType} from "../types";


export function  memory_addLogger<T>(logger: LoggerEntity, loggers:T):T{
  // @ts-ignore
  loggers.push(logger)
  return loggers
}



