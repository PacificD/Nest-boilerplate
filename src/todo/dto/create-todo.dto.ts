/*
 * @Author: Pacific_D
 * @Date: 2022-08-30 22:10:48
 * @LastEditTime: 2022-08-30 22:10:48
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \todo\src\todo\dto\create-todo.dto.ts
 */
/*
 * @Author: Pacific_D
 * @Date: 2022-08-30 21:06:48
 * @LastEditTime: 2022-08-30 21:14:53
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \todo\src\todo\dto\create-todo.dto.ts
 */
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

class CreateTodoDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly content: string
}

export default CreateTodoDto
