import { Body, Controller, Get, Param, Put, Query } from "@nestjs/common";
import { LoggerService } from "./logger.service";
import { LoggerType, methodDecorator } from "../users/users.service";
import { query } from "express";



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

    methodDecorator(param.name,loggerOnChange,true)

    return this.loggerService.updateLogger(param.name,loggerOnChange)
  }


}
