import { Body, Controller, Get, Param, Put, Query } from "@nestjs/common";
import { LoggerService } from "./logger.service";
import {  methodDecorator } from "../users/users.service";
import { query } from "express";
import { LoggerType } from "../logger/types";



@Controller('loggers')
export class LoggerController {

  constructor(
    private loggerService:LoggerService
  ) {}

  @Put('/:name')
  async  updateLogger(
    @Param() param:{name:string},
    @Body() bodyOnChange:Partial<LoggerType>
  ){
    //todo 111 не робиця ріалтайм обновка, лише після перезагрузки чогось виправити

    // todo зробити щоб можна було обновляти зразу декілька логерів а не один

    let loggerFields:Partial<LoggerType> = this.loggerService.createLoggerFieldsOnUpdate(bodyOnChange)

    await methodDecorator(param.name,loggerFields,true)

    return this.loggerService.updateLogger(param.name,loggerFields)
  }




}
