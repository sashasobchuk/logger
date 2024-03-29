import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { LoggerEntity } from "../entities";
import { LoggerType } from "../logger/types";

@Injectable()
export class LoggerService {

  constructor(
    private connection: DataSource
  ) {
  }

  async updateLogger(name: string, logger: Partial<LoggerType>) {
    return this.connection.createEntityManager()
      .update(LoggerEntity,
        {name:name},
        logger
      ).catch(e=>{
        console.log(`custom Error`,e);
      })
  }

  createLoggerFieldsOnUpdate(bodyOnChange:Partial<LoggerType>){
    /** забрати поля з undefined*/
    console.log(`bodyOnChange: `,bodyOnChange)
    let newLoggerOnChange:Partial<LoggerType> = {}

    if(typeof bodyOnChange.result !=='undefined'){
      newLoggerOnChange.result = bodyOnChange.result
    }
    if(typeof bodyOnChange.showName !=='undefined'){
      newLoggerOnChange.showName = bodyOnChange.showName
    }
    if(typeof bodyOnChange.text !=='undefined'){
      newLoggerOnChange.text = bodyOnChange.text
    }
    if(typeof bodyOnChange.executionTime !=='undefined'){
      newLoggerOnChange.executionTime = bodyOnChange.executionTime
    }
    if(typeof bodyOnChange.endTime !=='undefined'){
      newLoggerOnChange.endTime = bodyOnChange.endTime
    }
    if(typeof bodyOnChange.params !=='undefined'){
      newLoggerOnChange.params = bodyOnChange.params
    }
    if(typeof bodyOnChange.beginTime !=='undefined'){
      newLoggerOnChange.beginTime = bodyOnChange.beginTime
    }

    return newLoggerOnChange
  }

}
