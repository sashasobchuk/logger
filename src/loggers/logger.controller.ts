import { Body, Controller, Get, Param, Put, Query } from "@nestjs/common";
import { LoggerService } from "./logger.service";
// import { methodDecorator } from "../users/users.service";
import { query } from "express";
import {defaultLogData, LoggerBodyType, methodDecoratorBuilder} from "../logger-realtime/src";
import {methodDecorator} from "../users/users.service";
import {updateLogger} from "../logger-realtime/src/export";
import {LoggerEntity} from "../entities";



@Controller("loggers")
export class LoggerController {

  constructor(
    private loggerService: LoggerService
  ) {
  }

  @Put("/:name")
  async updateLogger(
    @Param() param: { name: string },
    @Body() loggerFields: Partial<LoggerBodyType>
  ) {
    await methodDecorator(param.name, loggerFields, true);

    return this.loggerService.updateLogger(param.name, loggerFields);
  }

  @Put("")
  async updateLoggers(
    @Body() loggersFields: Partial<LoggerEntity>[]
  ) {
    await Promise.all(loggersFields.map(loggerFields => {
      //todo винести в сервіс
      if (!loggerFields.name) {
        return console.error(`Realtime Dont have name`, loggerFields);
      }

      methodDecorator(loggerFields.name, loggerFields, true);
    }));

    await Promise.all(loggersFields.map(loggerFields => {
      //todo винести в сервіс
      if (!loggerFields.name) {
        return console.error(`DB Dont have name`, loggerFields);
      }
      updateLogger(loggerFields.name,loggerFields)
      // this.loggerService.updateLogger(loggerFields.name, loggerFields);
    }));


    return loggersFields;
  }


}
