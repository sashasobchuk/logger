import {storage} from '../storage.js.js'
// import {memoryFindLogger} from "../memory/memory-find-logger";
// import {db_updateLogger} from "../db/db_update-logger";
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