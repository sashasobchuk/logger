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
    {
      result:logger.result,
      executionTime:logger.executionTime,
    }
      )
  }

}
