/*
 * @Author: Pacific_D
 * @Date: 2022-08-30 21:16:13
 * @LastEditTime: 2022-11-03 21:11:48
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \nest-boilerplate\src\todo\todo.service.ts
 */
import { Injectable, HttpException, HttpStatus } from "@nestjs/common"
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
    throw new HttpException("Fail!", HttpStatus.INTERNAL_SERVER_ERROR)
  }

  async remove(id: string, userID: string): Promise<Result> {
    let result: Result

    const checkUser = await this.todoRepository.find({
      where: {
        id,
        user: userID
      }
    })
    // mismatch user
    if (checkUser.length === 0)
      throw new HttpException("Fail! Invaild operate!", HttpStatus.BAD_REQUEST)

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
    if (!["0", "1"].includes(state + "") || !state)
      throw new HttpException(
        "Fail! state must be 0 or 1!",
        HttpStatus.BAD_REQUEST
      )

    const checkUser = await this.todoRepository.find({
      where: {
        id: updateTodoDto.id,
        user: userID
      }
    })
    // mismatch user
    if (checkUser.length === 0)
      throw new HttpException("Fail! Invaild operate!", HttpStatus.BAD_REQUEST)

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
