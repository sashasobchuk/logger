import {LoggerEntity} from "../types";


export function memory_updateLogger(logger: LoggerEntity, loggers: LoggerEntity[]):LoggerEntity[] {

  let prevLogger = loggers?.find(log => log.name === logger.name);
  prevLogger = logger;

  return loggers
}



