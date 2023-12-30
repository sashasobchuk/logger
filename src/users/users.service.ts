import { Injectable } from "@nestjs/common";
import { DataSource, EntityManager } from "typeorm";
import { User } from "../entities";
import * as entities from "../entities";
import {
  pgHost,
  pguser,
  POSTGRES_DATABASE,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER
} from "../get-typeorm-config";

const { Pool } = require("pg");

function createPoll() {
  return new Pool({
    type: "postgres",
    port: POSTGRES_PORT,
    password: POSTGRES_PASSWORD,
    username: POSTGRES_USER,
    database: POSTGRES_DATABASE,
    host: pgHost,
    user: pguser

  });
}

// const pool = createPoll()


type pgConfg = {
  user: string,
  host: string,
  database: string,
  password: string,
  port: number
}

const sqlSelectQuery = "select * from logger";


export type LoggerType = {
  id: number,
  name: string,
  params: boolean,
  result: boolean,
  executionTime: boolean

  showAny: boolean | undefined

}

function methodDecoratorBuilder(
  // poolParam:pgConfg
) {

  let loggers: LoggerType[] = [];
  const pool = createPoll();

  pool.query(`select * from "logger"`, (error, result) => {
    if (error) {
      console.error("Error executing SELECT query", error);
      debugger
    } else {
      loggers = result.rows;
    }

    pool.end();
  });

  return function methodDecorator(name: string,updateName?:string,updateBody?:Partial<LoggerType>) {

    // console.log(loggers);
    // debugger
    let showAny: boolean = false;
    let dbChecked: boolean = false;
    if(updateName){



      let logger = loggers.find(logger => logger.name === name);
      loggers = loggers.map(logger=>logger.name !== name
      ?logger
      :{...logger,...updateBody})
    }

    return function(target, key, descriptor) {
      const originalMethod = descriptor.value;


      // Перевизначити функцію
      descriptor.value = async function(...args) {

        // const logger = await  checkLoggerInDB(name)

        const logger = loggers.find(logger => logger.name === name);

        debugger
        //todo 1111111 тут находить логер далі треба це втикнути в память
        //далі зробити апдейт
        // debugger


        // Запам'ятати час початку виконання
        // const startTime:Date = new Date();

        // Викликати оригінальну функцію
        const result = await originalMethod.apply(this, args);

        // Запам'ятати час закінчення виконання
        // const endTime:Date = new Date();

        // Вивести час виконання та результат
        // console.log(`Час початку: ${startTime.toISOString()}`);
        if (logger.result) {
          console.log(`Результат: ${JSON.stringify(result, null, 2)}`);
        } else {
          console.log("нема логера");
        }

        return result;
      };

      return descriptor;
    };

  };

}

export const methodDecorator = methodDecoratorBuilder(
  // {
  // database:POSTGRES_DATABASE,
  // host:POSTGRES_HOST,
  // user:POSTGRES_USER,
  // password:POSTGRES_PASSWORD,
  // port:POSTGRES_PORT
// }
);


@Injectable()
export class UsersService {
  entityManager: EntityManager;

  constructor(private connection: DataSource) {
    this.entityManager = this.connection.createEntityManager();
  }

  @methodDecorator("getUser")
  async getUser(id: number) {
    const user = await this.entityManager.findOne(
      User, { where: { id: id } });
    return user;
  }

  async createUser(user: Partial<User>) {
    const newUser = this.entityManager.create(User, user);
    return this.entityManager.save(newUser);
  }
}

async function checkLoggerInDB(name: string): Promise<undefined | Logger> {

  return new Promise<undefined | User>((resolve, reject) => {
    const pool = createPoll();
    pool.query(`select * from "logger" where "logger".name = $1`, [name], (error, result) => {
      if (error) {
        debugger;
        reject(error);
      } else {
        // Resolve the Promise with the result.rows[0]
        resolve(result.rows[0]);
      }
      pool.end();

    });
  });

}

type Logger = {
  name: string,
  params?: boolean,
  result?: boolean,
  executionTime?: boolean
}

async function insertLoggerRowToDB(
  {
    name,
    params,
    result,
    executionTime
  }: Logger) {

  const pool = new Pool({
    type: "postgres",
    port: POSTGRES_PORT,
    password: POSTGRES_PASSWORD,
    username: POSTGRES_USER,
    database: POSTGRES_DATABASE,
    host: pgHost,
    user: pguser
  });

  return new Promise<void>((resolve, reject) => {
    pool.query(`
  INSERT INTO "logger" ("name", "params", "result", "executionTime")
  VALUES ($1, $2, $3, $4);
`, [name, !!params, !!result, !!executionTime], (error, result) => {
      if (error) {
        debugger;
        console.log(error);
        reject(error);
      } else {
        // Resolve the Promise with the result.rows[0]
        resolve(result.rows[0]);
      }
      pool.end();

    });
  });

  //  pool.query(`
  //
  //  INSERT INTO "logger" ("name", "params", "result", "executionTime")
  //  VALUES (name, !!params, !!result, executionTime);
  // `,[name], (error, result) => {
  //    if (error) {
  //      debugger
  //    } else {
  //      return result.rows[0]
  //    }
  //    pool.end();
  //  })
}


