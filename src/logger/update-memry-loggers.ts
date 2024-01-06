import { LoggerType } from "./types";
import { updateLogger } from "./update-logger";

export function createNewMemoryLoggers (
  name:string,
  loggers: LoggerType[],
  updateFields: Partial<LoggerType>
){
  loggers = loggers.map((logger) => {
    if(logger.name ===name){
     logger = updateLogger(logger,updateFields)
    }

    return logger
  });
  return loggers
}

