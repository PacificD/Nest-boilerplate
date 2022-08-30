/*
 * @Author: Pacific_D
 * @Date: 2022-08-30 21:14:19
 * @LastEditTime: 2022-08-30 22:43:32
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \todo\src\todo\todo.controller.ts
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
  UseGuards,
  Req
} from "@nestjs/common"
import TodoService from "./todo.service"
import { ApiOperation, ApiTags } from "@nestjs/swagger"
import { AuthGuard } from "@nestjs/passport"
import { Request } from "express"
import { JwtService } from "@nestjs/jwt"
import { IDecodedJWT } from "../user/jwt.strategy"

@Controller("todo")
@UseGuards(AuthGuard("jwt"))
@ApiTags("todo")
export class TodoController {
  constructor(
    private readonly todoService: TodoService,
    private readonly jwtService: JwtService
  ) {}

  //add new todo
  @Post()
  @ApiOperation({
    summary: "add a todo"
  })
  addTodo(@Body() createTodoDto: CreateTodoDto, @Req() request: Request) {
    const decodedJWT = this.jwtService.decode(
      request.headers.authorization
    ) as IDecodedJWT
    return this.todoService.add(createTodoDto, decodedJWT.userID)
  }

  //remove a todo - resul API
  @Delete(":id")
  @ApiOperation({
    summary: "delete a todo by ID"
  })
  deleteTodo(@Param("id") id: string, @Req() request: Request) {
    const decodedJWT = this.jwtService.decode(
      request.headers.authorization
    ) as IDecodedJWT
    return this.todoService.remove(id, decodedJWT.userID)
  }

  //find user's todo
  @Get("")
  @ApiOperation({
    summary: "get all todoes by token"
  })
  getAllTodo(@Req() request: Request) {
    const decodedJWT = this.jwtService.decode(
      request.headers.authorization
    ) as IDecodedJWT
    return this.todoService.findAll(decodedJWT.userID)
  }

  //update a todo
  @Patch()
  @ApiOperation({
    summary: "update a todo"
  })
  updateTodo(@Body() updateTodoDto: UpdateTodoDto, @Req() request: Request) {
    const decodedJWT = this.jwtService.decode(
      request.headers.authorization
    ) as IDecodedJWT
    return this.todoService.update(updateTodoDto, decodedJWT.userID)
  }
}
