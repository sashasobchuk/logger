import { Injectable } from "@nestjs/common";
import { DataSource, EntityManager, Logger } from "typeorm";
import { LoggerEntity, User } from "../entities";
import { createPoll } from "../logger/create-pooll";
import { methodDecoratorBuilder } from "../logger/method-decorator-builder";
import { defaultLogData } from "../logger/default-log-data";
// import { LoggerType } from "../logger/types";

const { Pool } = require("pg");


// const pool = createPoll()


type pgConfg = {
  user: string,
  host: string,
  database: string,
  password: string,
  port: number
}

const sqlSelectQuery = "select * from logger";



// function returnMethodDecorators(loggers: LoggerType[]) {
//
// }



export const methodDecorator = methodDecoratorBuilder(
  defaultLogData
);


@Injectable()
export class UsersService {
  entityManager: EntityManager;

  constructor(private connection: DataSource) {
    this.entityManager = this.connection.createEntityManager();
  }

  @methodDecorator("getUser", { text: "текст з першого",params:false })
  async getUser(id: number) {
    const user = await this.entityManager.findOne(User, { where: { id: id } });

    this.secondTestFunction('param1')

    return user;
  }

  @methodDecorator('secondTestFunc',{text:'текст 22'})
  async secondTestFunction(param1){
    this.testFunction_3(param1)
  }

  @methodDecorator('TestFunc3',{text:'3 текст'})
  async testFunction_3(param1){

  }

  async createUser(user: Partial<User>) {
    const newUser = this.entityManager.create(User, user);
    return this.entityManager.save(newUser);
  }
}


// type Logger = {
//   name: string,
//   params?: boolean,
//   result?: boolean,
//   executionTime?: boolean
//   beginTime:boolean,
//   endTime:boolean,
//   text?:boolean|null
// }



