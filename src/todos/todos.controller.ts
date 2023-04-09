import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './interfaces/todo.interface';
import { get } from 'http';
import { CreateTodoDto } from './dto/create-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  // récupérer un todo par son id !! attention au type tjs string dans un param !!
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(id);
  }
  // récupérer tous les todos
  @Get()
  findAll(): Todo[] {
    return this.todosService.findAll();
  }
  // créer un nouveau todo
  @Post()
  createTodo(@Body() newTodo: CreateTodoDto) {
    this.todosService.create(newTodo);
    return this.findAll();
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodo: CreateTodoDto) {
    this.todosService.update(id, updateTodo);
    return this.findAll();
  }
}
