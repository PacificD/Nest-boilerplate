/*
 * @Author: Pacific_D
 * @Date: 2022-08-30 21:32:50
 * @LastEditTime: 2022-11-03 20:23:13
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \nest-boilerplate\src\filters\HttpException.ts
 */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger
} from "@nestjs/common"
import { Request, Response } from "express"

@Catch(HttpException)
class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(),
      response = ctx.getResponse<Response>(),
      request = ctx.getRequest<Request>(),
      path = request.originalUrl

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR
    const exceptionResponse = exception.getResponse()
    let message: string, error: string
    if (typeof exceptionResponse === "object") {
      if (exceptionResponse.hasOwnProperty("message")) {
        message = exceptionResponse["message"]
      }
      if (exceptionResponse.hasOwnProperty("error")) {
        error = exceptionResponse["error"]
      } else {
        error = "请求失败"
      }
    } else {
      error = exceptionResponse
      message = exceptionResponse
    }
    Logger.error(`'${path}': ${error}, MESSAGE: ${message}`)

    const errorResponse = {
      statusCode: status,
      message: error,
      url: request.originalUrl, // 错误的url地址,
      data: {
        error: message
      } // 获取全部的错误信息
    }
    // 设置返回的状态码、请求头、发送错误信息
    response.status(status)
    response.header("Content-Type", "application/json; charset=utf-8")
    response.send(errorResponse)
  }
}

export default HttpExceptionFilter
