import { LoggerType } from "./types";


export function  memory_addLogger(logger: LoggerType, loggers: LoggerType[]):LoggerType[]{
  loggers.push(logger)
  return loggers
}



