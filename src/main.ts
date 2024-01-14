import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import {initLogger} from "./logger-realtime/src/init";
import {pgHost, pguser, POSTGRES_DATABASE, POSTGRES_PASSWORD, POSTGRES_PORT, POSTGRES_USER} from "./get-typeorm-config";
import {initLogger} from "./logger-realtime/src";


async function bootstrap() {

    // await initLogger({
    //     type:'postgres',
    //     port:POSTGRES_PORT,
    //     password:POSTGRES_PASSWORD,
    //     username:POSTGRES_USER,
    //     database:POSTGRES_DATABASE,
    //     host:pgHost,
    //     user:pguser
    // })

    const app = await NestFactory.create(AppModule);
    await app.listen(5000);
}
bootstrap();
