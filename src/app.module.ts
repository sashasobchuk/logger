import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { TypeOrmModule } from "@nestjs/typeorm";

import * as entities from './entities'
import { UsersController } from "./users/users.controller";
import { UsersService } from "./users/users.service";
import getTypeOrmModule from "./get-typeorm-config";


@Module({
  imports: [
    getTypeOrmModule(),
  ],
  controllers: [AppController,UsersController],
  providers: [AppService,UsersService],
})
export class AppModule {}
