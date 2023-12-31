import { LoggerType } from "./types";
import { tryInsertLoggerRowToDB } from "./try-insert-logger-row-to-DB";
import { updateMemoryLoggers } from "./update-memry-loggers";
import { findLogger } from "./find-logger";
import { fillMemoryFromDb } from "./fill-memory-from-db";


export function methodDecoratorBuilder(defaultLogBody: Omit<LoggerType, "showAny" | "id" | "name" | "text">) {

  let loggers: LoggerType[] = [];

  const fillingMemoryPromise =fillMemoryFromDb(loggers)

  // const fillingMemoryPromise = new

  return function methodDecorator(name: string, logBody?: Partial<LoggerType>, update?: boolean) {
    //todo 111111 зробити щоб створювалось в бд при додаванні (зробити пошук і якшо нема додавання)

    const onDefault = { name, ...defaultLogBody, ...logBody };

    fillingMemoryPromise.then(loggers=>{
      //@ts-ignore
     let newLoggers =   tryInsertLoggerRowToDB({name, ...defaultLogBody, ...logBody },loggers);

        return newLoggers
      })
      .then((newLoggers)=>{
        if(newLoggers){
          loggers=newLoggers
        }
      })
      .catch(e=>{
      console.log(e);
    })

    let showAny: boolean = false;
    let dbChecked: boolean = false;

    if (update) {
      /** if для апдейту в системі*/
      loggers = updateMemoryLoggers(name,loggers,logBody)
    }

    return  function(target, key, descriptor) {
      const originalMethod = descriptor.value;

      // Перевизначити функцію
      descriptor.value = async function(...args) {
        let logger = findLogger(loggers,name)

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







