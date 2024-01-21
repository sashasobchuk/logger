import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
// import {LoggerEntity} from "../entities/Logger.entity";
import {db_updateLogger, LoggerBodyType} from "../logger-realtime/src";
import { LoggerEntity } from "../entities";
import {updateLogger} from "../logger-realtime/src/export/update-logger";
// import { LoggerType } from "../../../loger-library/loger-realtime/dist/types";
//
@Injectable()
export class LoggerService {

  constructor(
    private connection: DataSource
  ) {}

  async updateLogger(name: string, logger: Partial<LoggerBodyType>) {

    // return db_updateLogger(
    //     {
    //       ...logger
    //     })

    return updateLogger(name,logger)
    return this.connection.createEntityManager()
      .update(LoggerEntity,
        {name:name},
        logger
      ).catch(e=>{
        console.log(`custom Error`,e);
      })
  }

}
