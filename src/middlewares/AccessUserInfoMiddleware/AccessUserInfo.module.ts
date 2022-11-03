/*
 * @Author: Pacific_D
 * @Date: 2022-11-02 23:16:30
 * @LastEditTime: 2022-11-02 23:22:06
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \nest-boilerplate\src\middlewares\AccessUserInfoMiddleware\AccessUserInfo.module.ts
 */
import { Module } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import AccessUserInfoMiddleware from "./AccessUserInfoMiddleware"

@Module({
  providers: [AccessUserInfoMiddleware, JwtService],
  exports: [AccessUserInfoMiddleware]
})
class AccessUserInfoMiddlewareModule {}

export default AccessUserInfoMiddlewareModule
