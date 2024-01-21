import {LoggerEntity, LoggerBodyType} from "./types";

export function createNewMemoryLoggers (
  name:string,
  loggers: LoggerEntity[],
  updateFields: Partial<LoggerBodyType>
){
  loggers = loggers.map((logger) => {
    if(logger.name ===name){
     logger = { ...logger, ...updateFields }
    }

    return logger
  });
  return loggers
}

