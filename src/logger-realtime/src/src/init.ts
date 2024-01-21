// import {poolParams} from "./storage.js";
import {DBParams, LoggerEntity} from "./types";
import {db_table_once_createLogger} from "./db/db_table_once_create_logger";
import {getLoggersFromDb} from "./get-loggers-from-db";

export let poolParams:DBParams
const { Pool } = require("pg");

export async function initLogger(createPoolParams:DBParams,memory_loggers): Promise<unknown>{
    if(!createPoolParams){
        return new Promise((resolve,reject) => reject(`нема createPoolParams`))
    }

     poolParams = createPoolParams;

    // return new Promise(((resolve, reject) => resolve()))
    // return new Promise((res)=>res())

}

export function createPoll() {
    if(!poolParams){
        return console.log(`1111111111111111`)
    }

    return new Pool(poolParams);
}





