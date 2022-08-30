/* eslint-disable prettier/prettier */
/*
 * @Author: PacificD
 * @Date: 2021-10-07 22:24:07
 * @LastEditors: Pacific_D
 * @LastEditTime: 2022-08-30 19:46:49
 * @Description:
 */
import { TypeOrmModuleOptions } from "@nestjs/typeorm"

const ormConfig: TypeOrmModuleOptions = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "123456",
  database: "todo",
  charset: "utf8", //设置chatset编码为utf8
  synchronize: true,
  autoLoadEntities: true //自动加载实体
}

export default ormConfig
