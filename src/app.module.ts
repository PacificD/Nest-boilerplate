/*
 * @Author: Pacific_D
 * @Date: 2022-08-30 17:32:15
 * @LastEditTime: 2022-08-30 21:18:37
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \todo\src\app.module.ts
 */
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import UserModule from "./user/user.module"
import ormConfig from "./config/ormConfig"
import TodoModule from "./todo/todo.module"

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), UserModule, TodoModule],
  controllers: [],
  providers: []
})
export class AppModule {}
