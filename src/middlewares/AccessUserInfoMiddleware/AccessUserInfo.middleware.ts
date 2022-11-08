/*
 * @Author: Pacific_D
 * @Date: 2022-11-02 23:12:28
 * @LastEditTime: 2022-11-03 20:20:05
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \nest-boilerplate\src\middlewares\AccessUserInfoMiddleware\AccessUserInfo.middleware.ts
 */
4
import {
  UnauthorizedException,
  Injectable,
  NestMiddleware
} from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { Request, Response, NextFunction } from "express"
import { IDecodedJWT } from "../../user/jwt.strategy"

declare module "express" {
  export interface Request {
    userID?: string
  }
}

@Injectable()
class AccessUserInfoMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.header("authorization")

    if (!authHeader) {
      throw new UnauthorizedException()
    }

    const decodedJWT = this.jwtService.decode(authHeader) as IDecodedJWT

    req.userID = decodedJWT.userID

    next()
  }
}

export default AccessUserInfoMiddleware
