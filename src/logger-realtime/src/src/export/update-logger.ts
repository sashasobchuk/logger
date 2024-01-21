import {storage} from '../storage.js.js'
import {LoggerBodyType} from "../types";
import {memoryFindLogger} from "../memory";
import {db_updateLogger} from "../db";
let {loggers} = storage
export async function updateLogger(name:string, logger:Partial<LoggerBodyType>) {
    /*on export to update out of lib*/

    const memoryLogger = memoryFindLogger(loggers,name)

    return db_updateLogger({
        ...memoryLogger,...logger
    })

}