import { LoggerType } from "./types";


export function memory_updateLogger(logger: LoggerType, loggers: LoggerType[]):LoggerType[] {

  let prevLogger = loggers.find(log => log.name === logger.name);
  prevLogger = logger;

  return loggers
}



