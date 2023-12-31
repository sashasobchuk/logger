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
    @Body() loggerOnChange:Partial<LoggerType>
  ){
    //todo 111 не робиця ріалтайм обновка, лише після перезагрузки чогось виправити

    // todo зробити щоб можна було обновляти зразу декілька логерів а не один
    methodDecorator(param.name,loggerOnChange,true)

    return this.loggerService.updateLogger(param.name,loggerOnChange)
  }


}
