import { createPoll } from "./create-pooll";
import { LoggerEntity } from "../entities";

export async function checkLoggerInDB(name: string): Promise<undefined | LoggerEntity> {

  return new Promise<undefined | LoggerEntity>((resolve, reject) => {
    const pool = createPoll();
    pool.query(`select * from "logger" where "logger".name = $1`, [name],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows[0]);
        }
        pool.end();

      });
  });

}
