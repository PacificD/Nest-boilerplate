/*
 * @Author: Pacific_D
 * @Date: 2022-08-30 21:10:22
 * @LastEditTime: 2022-08-30 22:16:10
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \todo\src\todo\entities\todo.entity.ts
 */
import {
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from "typeorm"
import * as shortid from "shortid"

@Entity()
class Todo {
  @PrimaryColumn()
  id: string

  @Column()
  content: string

  @Column({ default: 0 }) //0. todo, 1. done
  state: 0 | 1

  @Column()
  user: string //userID

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date

  constructor(content: string, state: 0 | 1, user: string) {
    this.id = shortid.generate()
    this.content = content
    this.state = state
    this.user = user
  }
}

export default Todo
