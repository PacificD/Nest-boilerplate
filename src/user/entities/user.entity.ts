/*
 * @Author: Pacific_D
 * @Date: 2022-08-30 20:06:00
 * @LastEditTime: 2022-08-30 21:43:23
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \todo\src\user\entities\user.entity.ts
 */
import { Column, Entity, PrimaryColumn } from "typeorm"
import * as shortid from "shortid"

@Entity()
class User {
  @PrimaryColumn()
  id: string

  @Column()
  username: string

  @Column()
  password: string

  constructor(username: string, password: string) {
    this.id = shortid.generate()
    this.username = username
    this.password = password
  }
}

export default User
