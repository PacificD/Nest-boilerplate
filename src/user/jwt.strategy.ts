/*
 * @Author: Pacific_D
 * @Date: 2022-08-30 19:47:32
 * @LastEditTime: 2022-08-30 22:13:42
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \todo\src\user\jwt.strategy.ts
 */
import { ExtractJwt, Strategy } from "passport-jwt"
import { PassportStrategy } from "@nestjs/passport"
import { Injectable } from "@nestjs/common"
import jwtConstants from "../config/jwtConstants"
import UserDto from "./dto/user.dto"

export interface IDecodedJWT {
  userID: string
  username: string
  iat: number
  exp: number
}

@Injectable()
class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret
    })
  }

  async validate(payload: UserDto) {
    return { username: payload.username, password: payload.password }
  }
}

export default JwtStrategy
