import { Injectable, signal } from '@angular/core';
import { Todo } from '../models/model/todo-model';
import { TodoKeyLocalStorage } from '../models/enum/todoKeyLocalStorage';

@Injectable({
  providedIn: 'root'
})
export class TodoSignalService {
 public todoState = signal<Array<Todo>>([]);

 constructor() {
   this.getTodosFromLocalStorage();
 }

 public updateTodos({id, title, description, completed}: Todo) {
  this.todoState.mutate((todos)=> {
    if(todos != null)
    {
      todos.push(new Todo(id, title, description, completed));
    }
  });
  this.saveTodosInLocalStorage();
 }
 public saveTodosInLocalStorage(): void {
  localStorage.setItem(TodoKeyLocalStorage.TODO_LIST, JSON.stringify(this.todoState()));
 }

 private getTodosFromLocalStorage(): void {
  const todosData = localStorage.getItem(TodoKeyLocalStorage.TODO_LIST);
  if (todosData) {
    this.todoState.set(JSON.parse(todosData));
  }
 }
}
