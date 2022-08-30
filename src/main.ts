/*
 * @Author: Pacific_D
 * @Date: 2022-08-30 17:22:57
 * @LastEditTime: 2022-08-30 21:34:03
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \todo\src\main.ts
 */
import { ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"
import { AppModule } from "./app.module"
import HttpExceptionFilter from "./filters/HttpException"

const port = 4096

;(async () => {
  const app = await NestFactory.create(AppModule)

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
  const options = new DocumentBuilder()
    .setTitle("todo-backend")
    .setDescription("Todo API")
    .setVersion("1.0")
    .addTag("User")
    .addTag("todo")
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup("swagger", app, document)

  await app.listen(port)
})()
