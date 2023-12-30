import { Injectable } from "@nestjs/common";
import { DataSource, EntityManager, Logger } from "typeorm";
import { LoggerEntity, User } from "../entities";
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
  // id: number,
  name: string,
  showName:boolean
  params: boolean,
  result: boolean,
  executionTime: boolean
  beginTime: boolean
  endTime: boolean
  text?: string

  // showAny: boolean | undefined

}

function returnMethodDecorators(loggers: LoggerType[]) {

}

function methodDecoratorBuilder(
  // poolParam:pgConfg
  defaultLogBody: Omit<LoggerType, "showAny" | "id" | "name" | "text">
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
  return function methodDecorator(name: string, logBody?: Partial<LoggerType>, update?: boolean) {
    //todo 111111 зробити щоб створювалось в бд при додаванні (зробити пошук і якшо нема додавання)

    console.log(`111111111111111`, loggers);
    const onDefault = { name, ...defaultLogBody, ...logBody };
    //@ts-ignore
    tryInsertLoggerRowToDB({ name, ...defaultLogBody, ...logBody });

    let showAny: boolean = false;
    let dbChecked: boolean = false;

    if (update) {
      /** if для апдейту*/
      loggers = loggers.map(logger => logger.name !== name
        ? logger
        : { ...logger, ...logBody });

    }

    return function(target, key, descriptor) {
      const originalMethod = descriptor.value;
      // let logger2 = logger

      // Перевизначити функцію
      descriptor.value = async function(...args) {
        let logger: undefined | LoggerType = loggers.find(l => l.name === name);

        if (!!logger.text) {
          console.log(`custom Text: ${logger.text}`);
        }
        if (logger.params) {
          console.log(`params: ${JSON.stringify(args, null, 2)}`);
        }

        // Запам'ятати час початку виконання
        const startTime: Date = new Date();
        if (logger.beginTime) {
          console.log(`begin Time: ${startTime.toISOString()}`);
        }

        // Викликати оригінальну функцію
        const result = await originalMethod.apply(this, args);

        // Запам'ятати час закінчення виконання
        const endTime: Date = new Date();

        // Вивести час виконання та результат
        if (logger.endTime) {
          console.log(`end Time: ${endTime.toISOString()}`);
        }
        if (logger.executionTime) {
          console.log(`execution Time: ${endTime.getTime() - startTime.getTime()}`);
        }
        if (logger?.result) {
          console.log(`result: ${JSON.stringify(result, null, 2)}`);
        }

        return result;
      };

      return descriptor;
    };

  };

}

const defaultLogData: Omit<LoggerType, "showAny" | "id" | "name" | "text"> = {
  endTime: false,
  beginTime: false,
  executionTime: false,
  params: false,
  result: false,
  showName:false
};
export const methodDecorator = methodDecoratorBuilder(
  defaultLogData
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

  @methodDecorator("getUser", { text: "bran",params:true })
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

  return new Promise<undefined | Logger>((resolve, reject) => {
    const pool = createPoll();
    pool.query(`select * from "logger" where "logger".name = $1`, [name],
      (error, result) => {
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

// type Logger = {
//   name: string,
//   params?: boolean,
//   result?: boolean,
//   executionTime?: boolean
//   beginTime:boolean,
//   endTime:boolean,
//   text?:boolean|null
// }

async function tryInsertLoggerRowToDB(
  {
    name,
    params,
    result,
    executionTime, beginTime,
    endTime,
    text,
    showName
  }: LoggerEntity
) {
  // return
  const pool = createPoll();
  checkLoggerInDB(name)
    .then(logger => {
      if (!logger) {
        /** якщо нема то створюжмо*/
        return new Promise<void>((resolve, reject) => {

          pool.query(`
  INSERT INTO "logger" ("name", "showName","params", "result",
   "executionTime","beginTime","endTime","text")
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
`, [name,!!showName,  !!params, !!result, !!executionTime,
          !!beginTime,!!endTime,text], (error, result) => {
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
      } else {
        //todo можна буде продумати в яких випадках обновляти
        /** якщо є апдейтим його*/
        return new Promise<void>((resolve, reject) => {
          debugger
          pool.query(`
  update "logger" 
  set 
  "params" = $1,
  "result" = $2,
  "executionTime" = $3,
  "beginTime" = $4,
  "endTime" = $5,
  "text" = $6,
  "showName" = $7
`, [!!params, !!result, !!executionTime
            , !!beginTime, !!endTime, text,!!showName],
            (error, result) => {
            if (error) {
              debugger;
              console.log(error);
              reject(error);
            } else {
              debugger
              // resolve(result.rows[0]);
            }
            pool.end();

          });
        });

      }
    });
  return;

}


