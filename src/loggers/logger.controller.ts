import { Body, Controller, Get, Param, Put, Query } from "@nestjs/common";
import { LoggerService } from "./logger.service";
import { methodDecorator } from "../users/users.service";
import { query } from "express";
import { LoggerType } from "../logger/types";
import { updateLogger } from "../logger/update-logger";


@Controller("loggers")
export class LoggerController {

  constructor(
    private loggerService: LoggerService
  ) {
  }

  @Put("/:name")
  async updateLogger(
    @Param() param: { name: string },
    @Body() loggerFields: Partial<LoggerType>
  ) {
    //todo 111 не робиця ріалтайм обновка, лише після перезагрузки чогось виправити
    // todo зробити щоб можна було обновляти зразу декілька логерів а не один

    await methodDecorator(param.name, loggerFields, true);

    return this.loggerService.updateLogger(param.name, loggerFields);
  }

  @Put("")
  async updateLoggers(
    @Body() loggersFields: Partial<LoggerType>[]
  ) {
    await Promise.all(loggersFields.map(loggerFields => {
      if (!loggerFields.name) {
        return console.error(`Realtime Dont have name`, loggerFields);
      }

      methodDecorator(loggerFields.name, loggerFields, true);
    }));

    await Promise.all(loggersFields.map(loggerFields => {
      if (!loggerFields.name) {
        return console.error(`DB Dont have name`, loggerFields);
      }

      this.loggerService.updateLogger(loggerFields.name, loggerFields);
    }));


    return loggersFields;
  }


}
