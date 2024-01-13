import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { UsersController } from "./users/users.controller";
import { UsersService } from "./users/users.service";
import getTypeOrmModule from "./get-typeorm-config";
import { LoggerController } from "./loggers/logger.controller";
import { LoggerService } from "./loggers/logger.service";


@Module({
  imports: [
    getTypeOrmModule(),
  ],
  controllers: [AppController,UsersController,LoggerController],
  providers: [AppService,UsersService,LoggerService],
})
export class AppModule {}
