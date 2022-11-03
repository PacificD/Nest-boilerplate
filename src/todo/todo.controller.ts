/*
 * @Author: Pacific_D
 * @Date: 2022-08-30 21:14:19
 * @LastEditTime: 2022-11-03 18:58:28
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \nest-boilerplate\src\todo\todo.controller.ts
 */
import CreateTodoDto from "./dto/create-todo.dto"
import UpdateTodoDto from "./dto/update-todo.dto"
import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Get,
  Patch,
  UseGuards
} from "@nestjs/common"
import TodoService from "./todo.service"
import { ApiOperation, ApiTags } from "@nestjs/swagger"
import { AuthGuard } from "@nestjs/passport"
import UserID from "../middlewares/AccessUserInfoMiddleware/UserID.decorator"

@Controller("todo")
@UseGuards(AuthGuard("jwt"))
@ApiTags("todo")
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  //add new todo
  @Post()
  @ApiOperation({
    summary: "add a todo"
  })
  addTodo(@Body() createTodoDto: CreateTodoDto, @UserID() userID) {
    return this.todoService.add(createTodoDto, userID)
  }

  //remove a todo - resul API
  @Delete(":id")
  @ApiOperation({
    summary: "delete a todo by ID"
  })
  deleteTodo(@Param("id") id: string, @UserID() userID) {
    return this.todoService.remove(id, userID)
  }

  //find user's todo
  @Get("")
  @ApiOperation({
    summary: "get all todoes by token"
  })
  getAllTodo(@UserID() userID) {
    return this.todoService.findAll(userID)
  }

  //update a todo
  @Patch()
  @ApiOperation({
    summary: "update a todo"
  })
  updateTodo(@Body() updateTodoDto: UpdateTodoDto, @UserID() userID) {
    return this.todoService.update(updateTodoDto, userID)
  }
}
