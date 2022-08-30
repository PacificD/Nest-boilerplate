/*
 * @Author: Pacific_D
 * @Date: 2022-08-30 21:16:13
 * @LastEditTime: 2022-08-30 23:01:43
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \todo\src\todo\todo.service.ts
 */
import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import Todo from "./entities/todo.entity"
import CreateTodoDto from "./dto/create-todo.dto"
import UpdateTodoDto from "./dto/update-todo.dto"
import { Result, statusCodeEnum } from "../config/resultType"

@Injectable()
class TodoService {
  //inject todoRepository
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>
  ) {}

  async add(createTodoDto: CreateTodoDto, userID: string): Promise<Result> {
    const newTodo = new Todo(createTodoDto.content, 0, userID)

    const insertRes = await this.todoRepository.insert(newTodo)
    if (insertRes.raw.affectedRows) {
      return Result.success({
        id: newTodo.id,
        content: newTodo.content,
        createdTime: newTodo.createdAt,
        user: newTodo.user
      })
    }
    return Result.fail(statusCodeEnum.INTERNAL_SERVER_ERROR, "Fail!")
  }

  async remove(id: string, userID: string): Promise<Result> {
    let result: Result

    const checkUser = await this.todoRepository.find({
      where: {
        id,
        user: userID
      }
    })
    if (checkUser.length === 0) {
      // mismatch user
      return Result.fail(statusCodeEnum.BAD_REQUEST, "Fail! Invaild operate!")
    }
    await this.todoRepository.softDelete(id).then(res => {
      result = res.affected
        ? Result.success("successfully remove!")
        : Result.fail(statusCodeEnum.NOT_FOUND, "Fail! Can not find todo!")
    })
    return result
  }

  async findAll(userID: string): Promise<Result> {
    let result: Result
    await this.todoRepository
      .find({
        where: {
          user: userID
        },
        order: {
          updatedAt: "DESC"
        }
      })
      .then(res => {
        result = res.length
          ? Result.success(res)
          : Result.fail(statusCodeEnum.NOT_FOUND, "Empty!")
      })

    return result
  }

  async update(updateTodoDto: UpdateTodoDto, userID: string): Promise<Result> {
    let result: Result
    const state = updateTodoDto.state
    if (!["0", "1"].includes(state + "") || !state) {
      return Result.fail(
        statusCodeEnum.BAD_REQUEST,
        "Fail! state must be 0 or 1!"
      )
    }
    const checkUser = await this.todoRepository.find({
      where: {
        id: updateTodoDto.id,
        user: userID
      }
    })
    if (checkUser.length === 0) {
      // mismatch user
      return Result.fail(statusCodeEnum.BAD_REQUEST, "Fail! Invaild operate!")
    }

    await this.todoRepository
      .update(
        //UPDATE todo SET content,time WHERE id = updateTodoDto.id;
        updateTodoDto.id,
        {
          content: updateTodoDto.content,
          state: updateTodoDto.state
        }
      )
      .then(res => {
        result = res.affected
          ? Result.success("successfully update!")
          : Result.fail(statusCodeEnum.NOT_FOUND, "Fail! Todo does not exist!")
      })

    return result
  }
}

export default TodoService
