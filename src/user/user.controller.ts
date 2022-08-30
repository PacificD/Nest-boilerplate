/*
 * @Author: PacificD
 * @Date: 2021-10-07 22:36:14
 * @LastEditors: Pacific_D
 * @LastEditTime: 2022-08-30 21:04:12
 * @Description:
 */
import { Controller, Post, Body } from "@nestjs/common"
import UserService from "./user.service"
import { ApiOperation, ApiTags } from "@nestjs/swagger"
import UserDto from "./dto/user.dto"

@ApiTags("User")
@Controller("user")
class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("login")
  @ApiOperation({
    summary: "Login to get token"
  })
  login(@Body() userLoginDto: UserDto) {
    return this.userService.login(userLoginDto)
  }

  @Post("register")
  register(@Body() userRegisterDto: UserDto) {
    return this.userService.register(userRegisterDto)
  }
}

export default UserController
