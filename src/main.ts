/*
 * @Author: Pacific_D
 * @Date: 2022-08-30 17:22:57
 * @LastEditTime: 2022-11-08 18:34:31
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \nest-boilerplate\src\main.ts
 */
import { ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { ConfigService } from "@nestjs/config"
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"
import { AppModule } from "./app.module"
import HttpExceptionFilter from "./filters/HttpException"
;(async () => {
  const app = await NestFactory.create(AppModule, {
    logger: ["debug", "error", "log", "verbose", "warn"]
  })
  const configService = app.get(ConfigService)

  //配置全局管道
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  )

  //开启CORS
  app.enableCors({
    credentials: true,
    methods: "GET,POST,PATCH,DELETE",
    origin: "*"
  })

  // 全局注册错误的过滤器
  app.useGlobalFilters(new HttpExceptionFilter())

  //配置swagger
  configService.get("enableSwagger") &&
    (() => {
      const options = new DocumentBuilder()
        .setTitle("todo-backend")
        .setDescription("Todo API")
        .setVersion("1.0")
        .addTag("User")
        .addTag("todo")
        .build()
      const document = SwaggerModule.createDocument(app, options)
      SwaggerModule.setup("swagger", app, document)
    })()

  await app.listen(configService.get("port"))
})()
