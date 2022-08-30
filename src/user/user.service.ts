/*
 * @Author: PacificD
 * @Date: 2021-10-07 22:36:14
 * @LastEditors: Pacific_D
 * @LastEditTime: 2022-08-30 21:48:31
 * @Description:
 */
import { Injectable } from "@nestjs/common"
import { statusCodeEnum, Result } from "../config/resultType"
import { JwtService } from "@nestjs/jwt"
import UserDto from "./dto/user.dto"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import User from "./entities/user.entity"

@Injectable()
class UserService {
  //inject userRepository
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  signToken(userID: string, username: string): string {
    return this.jwtService.sign({
      userID,
      username
    })
  }

  async login(userLoginDto: UserDto): Promise<Result> {
    const checkResult = await this.userRepository.find({
      where: {
        username: userLoginDto.username,
        password: userLoginDto.password
      }
    })

    if (checkResult.length) {
      //success
      return Result.success({
        username: userLoginDto.username,
        token: this.signToken(checkResult[0].id, userLoginDto.username)
      })
    } else {
      //username or password error
      return Result.fail(
        statusCodeEnum.BAD_REQUEST,
        "Fail! Username or password error!"
      )
    }
  }

  async register(userRegisterDto: UserDto): Promise<Result> {
    const checkResult = await this.userRepository.find({
      where: {
        username: userRegisterDto.username
      }
    })

    if (checkResult.length) {
      return Result.fail(
        statusCodeEnum.BAD_REQUEST,
        "Fail! Username already exists!"
      )
    }

    const newUser = new User(userRegisterDto.username, userRegisterDto.password)
    this.userRepository.insert(newUser)

    return Result.success({
      username: userRegisterDto.username,
      token: this.signToken(newUser.id, userRegisterDto.username)
    })
  }
}

export default UserService
