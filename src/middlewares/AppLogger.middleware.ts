/*
 * @Author: Pacific_D
 * @Date: 2022-11-02 22:57:22
 * @LastEditTime: 2022-11-03 21:14:21
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \nest-boilerplate\src\middlewares\AppLogger.middleware.ts
 */
import { NestMiddleware, Injectable, Logger } from "@nestjs/common"
import { Request, Response, NextFunction } from "express"

@Injectable()
class AppLogger implements NestMiddleware {
  private logger = new Logger("HTTP")

  async use(request: Request, response: Response, next: NextFunction) {
    const { ip, method, originalUrl: url, body } = request
    const userAgent = request.get("user-agent") || ""

    response.on("close", () => {
      const { statusCode } = response
      const contentLength = response.get("content-length")

      this.logger.log(
        `${method} ${url}, statusCode: ${statusCode}, body: ${JSON.stringify(
          body
        )}, contentLength: ${contentLength}, ` +
          `userAgent: ${userAgent}, ip: ${ip}`
      )
    })

    next()
  }
}

export default AppLogger
