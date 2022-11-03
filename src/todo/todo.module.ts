/*
 * @Author: Pacific_D
 * @Date: 2022-08-30 21:06:25
 * @LastEditTime: 2022-11-03 18:15:20
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \nest-boilerplate\src\todo\todo.module.ts
 */
import { TypeOrmModule } from "@nestjs/typeorm"
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"
import TodoService from "./todo.service"
import { TodoController } from "./todo.controller"
import Todo from "./entities/todo.entity"
import { JwtService } from "@nestjs/jwt"
import AccessUserInfoMiddleware from "../middlewares/AccessUserInfoMiddleware/AccessUserInfo.middleware"

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodoController],
  providers: [TodoService, JwtService]
})
class TodoModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AccessUserInfoMiddleware).forRoutes("*")
  }
}

export default TodoModule
