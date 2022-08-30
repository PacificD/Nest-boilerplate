/*
 * @Author: PacificD
 * @Date: 2021-10-07 22:36:14
 * @LastEditors: Pacific_D
 * @LastEditTime: 2022-08-30 22:00:07
 * @Description:
 */
import { Module } from "@nestjs/common"
import UserService from "./user.service"
import UserController from "./user.controller"
import { JwtModule } from "@nestjs/jwt"
import jwtConstants from "../config/jwtConstants"
import JwtStrategy from "./jwt.strategy"
import { TypeOrmModule } from "@nestjs/typeorm"
import User from "./entities/user.entity"

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: "1d" //token expires time
      }
    })
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [JwtStrategy]
})
class UserModule {}

export default UserModule
