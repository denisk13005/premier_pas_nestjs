import { Injectable } from '@nestjs/common';
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
    const index: number = this.todos.findIndex((el) => el.id === Number(id));
    this.todos.splice(index, 1, updateTodo);
    console.log(index, 'index');
  }
}
