import { Injectable } from "@nestjs/common";
import { DataSource, EntityManager, Logger } from "typeorm";
import { User } from "../entities";

import {defaultLogData, methodDecoratorBuilder} from '../logger-realtime/src'
import {
  pgHost,
  pguser,
  POSTGRES_DATABASE,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER
} from "../get-typeorm-config";



export const methodDecorator = methodDecoratorBuilder(
  defaultLogData,
    {
      type:'postgres',
      port:POSTGRES_PORT,
      password:POSTGRES_PASSWORD,
      username:POSTGRES_USER,
      database:POSTGRES_DATABASE,
      host:pgHost,
      user:pguser
    }
);



@Injectable()
export class UsersService {
  entityManager: EntityManager;

  constructor(private connection: DataSource) {
    this.entityManager = this.connection.createEntityManager();
  }

  @methodDecorator("getUser", { text: "текст з першого",params:false })
  async getUser(id: number) {
    const user = await this.entityManager.findOne(User, { where: { id: id } })

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



