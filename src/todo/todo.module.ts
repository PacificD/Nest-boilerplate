/*
 * @Author: Pacific_D
 * @Date: 2022-08-30 21:06:25
 * @LastEditTime: 2022-08-30 22:02:52
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \todo\src\todo\todo.module.ts
 */
import { TypeOrmModule } from "@nestjs/typeorm"
import { Module } from "@nestjs/common"
import TodoService from "./todo.service"
import { TodoController } from "./todo.controller"
import Todo from "./entities/todo.entity"
import { JwtService } from "@nestjs/jwt"

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodoController],
  providers: [TodoService, JwtService]
})
class TodoModule {}

export default TodoModule
