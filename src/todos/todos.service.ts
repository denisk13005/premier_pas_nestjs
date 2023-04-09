import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './interfaces/todo.interface';

@Injectable()
export class TodosService {
  todos: Todo[] = [
    { id: 1, description: 'test1', done: false },
    { id: 2, done: false },
  ];
  // attention au type des id !! number dans l'interface mais string dans le paramètre de requête !!
  findOne(id: string) {
    return this.todos.filter((el) => el.id === Number(id));
  }
  findAll(): Todo[] {
    return this.todos;
  }
  create(todo: Todo) {
    this.todos = [...this.todos, todo];
  }
  update(id: string, updateTodo: Todo) {
    const index: number = this.todos.findIndex((el) => el.id === +id); // + remplace Number()
    const todoToUpdate: Todo = this.todos.find((el) => el.id === +id); // + remplace Number()

    if (!todoToUpdate) {
      return new NotFoundException('todo not found');
    }
    if (updateTodo.hasOwnProperty('done')) {
      todoToUpdate.done = updateTodo.done;
    }
    if (updateTodo.description) {
      todoToUpdate.description = updateTodo.description;
    }
    this.todos.splice(index, 1, todoToUpdate);
    console.log(index, 'index');
  }
}
