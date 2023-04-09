import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './interfaces/todo.interface';
import { get } from 'http';

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
  createTodo(@Body() newTodo) {
    this.todosService.create(newTodo);
    this.findAll();
  }
}
