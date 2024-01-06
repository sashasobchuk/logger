import { LoggerType } from "./types";


export function updateMemoryLoggers (
  name:string,
  loggers: LoggerType[],
  logBodyOnChange: Partial<LoggerType>
){
  loggers = loggers.map((logger) => {
    if(logger.name ===name){
      logger = { ...logger, ...logBodyOnChange }

    }
    // console.log(logger);
    return(logger.name !== name
      ? logger
      : { ...logger, ...logBodyOnChange }
  )});
  return loggers
}

