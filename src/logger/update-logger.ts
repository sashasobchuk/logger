import { LoggerType } from "./types";


export function updateLogger(logger:LoggerType,updateFields: Partial<LoggerType>):LoggerType{
  /** create new object with updated new fields*/
    return { ...logger, ...updateFields }
}


