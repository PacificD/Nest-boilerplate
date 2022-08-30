/*
 * @Author: PacificD
 * @Date: 2021-10-07 22:36:14
 * @LastEditors: Pacific_D
 * @LastEditTime: 2022-08-30 20:01:09
 * @Description:
 */
import { ApiProperty } from "@nestjs/swagger"
import { MaxLength, MinLength } from "class-validator"

class UserDto {
  @ApiProperty()
  @MinLength(2)
  @MaxLength(16)
  readonly username: string

  @ApiProperty()
  @MinLength(6)
  @MaxLength(16)
  readonly password: string
}

export default UserDto
