/*
 * @Author: Pacific_D
 * @Date: 2022-08-30 17:32:15
 * @LastEditTime: 2022-11-08 20:32:31
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \nest-boilerplate\src\app.module.ts
 */
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"
import configurationFactory from "./config/configuration.factory"
import UserModule from "./user/user.module"
import TodoModule from "./todo/todo.module"
import AppLoggerMiddleware from "./middlewares/AppLogger.middleware"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: configurationFactory
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const databaseConfig = configService.get("database")
        return {
          ...databaseConfig,
          synchronize: true,
          autoLoadEntities: true
        }
      }
    }),

    UserModule,
    TodoModule
  ],
  controllers: [],
  providers: []
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppLoggerMiddleware).forRoutes("*")
  }
}
