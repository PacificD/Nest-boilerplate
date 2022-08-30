/*
 * @Author: Pacific_D
 * @Date: 2022-08-30 21:08:01
 * @LastEditTime: 2022-08-30 22:44:24
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \todo\src\todo\dto\update-todo.dto.ts
 */
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumberString, IsString } from "class-validator"

class UpdateTodoDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly id: string

  @ApiProperty()
  @IsNotEmpty()
  readonly content: string

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  readonly state: 0 | 1 //0. todo 1. done
}

export default UpdateTodoDto
