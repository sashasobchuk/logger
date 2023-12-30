import { Injectable } from "@nestjs/common";
import { LoggerType } from "../users/users.service";
import { DataSource } from "typeorm";
import { Logger } from "../entities";

@Injectable()
export class LoggerService {

  constructor(
    private connection: DataSource
  ) {
  }

  async updateLogger(name: string, logger: Partial<LoggerType>) {
    return this.connection.createEntityManager()
      .update(Logger,
        {name:name},
    {
      result:logger.result,
      executionTime:logger.executionTime,
    }
      )
  }

}
