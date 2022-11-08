/*
 * @Author: Pacific_D
 * @Date: 2022-11-08 18:14:14
 * @LastEditTime: 2022-11-08 20:31:59
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \nest-boilerplate\src\config\configuration.factory.ts
 */
import { registerAs } from "@nestjs/config"

export default [
  () => ({
    PORT: process.env.PORT || 4000,
    enableSwagger: process.env.ENABLE_SWAGGER || false
  }),
  // namespace: database
  registerAs("database", () => ({
    type: process.env.DATABASE_TYPE || "mysql",
    host: process.env.DATABASE_HOST || "localhost",
    port: Number(process.env.DATABASE_PORT) || 3306,
    user: process.env.DATABASE_USER || "root",
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
    charset: process.env.DATABASE_CHARSET || "utf8"
  })),
  // namespace: JWT
  registerAs("JWT", () => ({
    secret: process.env.JWT_SECRET
  }))
]
