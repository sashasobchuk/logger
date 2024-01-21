import {DBParams, LoggerEntity, LoggerBodyType} from "../types";
import {tryInsertLoggerRowToDB} from "../try-insert-logger-row-to-DB";
import {createNewMemoryLoggers} from "../update-memry-loggers";
import {memoryFindLogger} from "./memory-find-logger";
import {getLoggersFromDb} from "../get-loggers-from-db";
import {initLogger} from "../init";

import {storage} from '../storage.js'
import {db_table_once_createLogger} from "../db";

let {loggers} = storage

export function methodDecoratorBuilder(
    defaultLogBody: Omit<LoggerBodyType, "showAny" | "id" | "name" | "text">,
    dbParams: DBParams
) {


    const loggersFromDBPromise =
        initLogger(dbParams, loggers)
        .then(()=> db_table_once_createLogger())
        .then(() => getLoggersFromDb(loggers))
        .then((res) => {
                //todo можна ше це в ініціалізацію впихнути
                loggers = res;
                return res as unknown as  LoggerEntity
            }).catch(e => {
            console.log(e);
        })


    return function methodDecorator(name: string, logBodyOnChange?: Partial<LoggerBodyType>, update?: boolean) {
        //todo 11111111 реалізувати showAny


        //todo додати ссилку ну  гітхаб через packege.json -repository
        let showAny: boolean = false;
        let dbChecked: boolean = false;
        const onDefault = {name, ...defaultLogBody, ...logBodyOnChange};


        if (update) {
            /** if для апдейту в системі*/
            loggersFromDBPromise
                .then((resLoggers) => {
                    if (!resLoggers) {
                        console.error(`4239407 error`)
                    }
                    loggers = createNewMemoryLoggers(name, loggers, logBodyOnChange);
                })
            return;
        }

        return function (target, key, descriptor) {
            /** тут лише раз спрацює при створенні*/

            /** тут беру дані і пхну в базу і память*/
            let dbInserted: boolean = false;
            if (!dbInserted) {
                /** впихаєм дані з параметрів в базу*/
                loggersFromDBPromise.then(loggers => {
                    //@ts-ignore
                    tryInsertLoggerRowToDB({name, ...defaultLogBody, ...logBodyOnChange} as any, loggers)
                        .then((newLoggers) => {
                            /** впихаєм дані що заінсертили в память */
                            dbChecked = true;
                            if (newLoggers) {
                                loggers = newLoggers as any;
                            }
                        })
                        .catch(e => {
                            console.log(e);
                        })
                })
            }


            const originalMethod = descriptor.value;

            // Перевизначити функцію
            descriptor.value = async function (...args) {
                let logger = memoryFindLogger(loggers, name);

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







