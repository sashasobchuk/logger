import { LoggerType } from "./types";


export function updateMemoryLoggers (
  name:string,
  loggers: LoggerType[],
  logBody: Partial<LoggerType>
){
  loggers = loggers.map(logger => logger.name !== name
    ? logger
    : { ...logger, ...logBody });
  return loggers
}

