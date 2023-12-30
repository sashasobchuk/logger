import {DynamicModule} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import * as entities  from './entities'

let POSTGRES_HOST='127.0.0.1'

export let POSTGRES_PORT=5432
export let POSTGRES_USER='postgres'
export let POSTGRES_PASSWORD='5432'
export let POSTGRES_DATABASE='sasha'
export let PORT=3000
export let MODE='DEV'
export let RUN_MIGRATIONS=true
export let pgtype = 'postgres'
export let pgHost = 'localhost'
export let pguser= 'postgres'


async function getTypeOrmModule(): Promise<DynamicModule> {

    return  TypeOrmModule.forRoot({
      type:'postgres',
      port: POSTGRES_PORT,
      password:POSTGRES_PASSWORD,
      username:POSTGRES_USER,
      database:POSTGRES_DATABASE,
      entities:  Object.values(entities),
      synchronize: true,
      logging: false,
      host:pgHost,

    });
}

export default getTypeOrmModule;
