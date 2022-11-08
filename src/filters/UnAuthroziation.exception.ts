/*
 * @Author: Pacific_D
 * @Date: 2022-11-03 20:14:00
 * @LastEditTime: 2022-11-03 20:15:16
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \nest-boilerplate\src\filters\UnAuthroziation.exception.ts
 */
import { HttpException, HttpStatus } from "@nestjs/common"

class UnAuthroziationException extends HttpException {
  constructor() {
    super("Unauthroziation!", HttpStatus.UNAUTHORIZED)
  }
}

export default UnAuthroziationException
