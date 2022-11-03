/*
 * @Author: Pacific_D
 * @Date: 2022-11-03 18:09:39
 * @LastEditTime: 2022-11-03 18:10:25
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \nest-boilerplate\src\middlewares\AccessUserInfoMiddleware\UserID.decorator.ts
 */
import { createParamDecorator, ExecutionContext } from "@nestjs/common"

const UserID = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  return request.userID // extract userID from request
})

export default UserID
