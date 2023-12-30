import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "../entities";

@Controller('users')
export class UsersController {

  constructor(private userService:UsersService) {}


  @Get('/:id')
  async getUser(@Param() param:{id:number}){
    console.log(`111`,param);
     return  this.userService.getUser(param.id)
  }

  @Post('/')
  async createUser(
    @Body() body:Partial<User>,
  ):Promise<any>{
    debugger
    return this.userService.createUser(body)
  }




}
