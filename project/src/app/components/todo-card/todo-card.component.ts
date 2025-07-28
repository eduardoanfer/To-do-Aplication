import { Component, computed, inject, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { TodoKeyLocalStorage } from 'src/app/models/enum/todoKeyLocalStorage';
import { TodoSignalService } from 'src/app/services/todo-signal.service';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, NgTemplateOutlet, MatCardModule, MatTabsModule, MatIconModule, MatButtonModule],
  templateUrl: './todo-card.component.html',
})
export class TodoCardComponent implements OnInit {
  private todoSignalService = inject(TodoSignalService);

  public todosSignal = this.todoSignalService.todoState;
  public todoList = computed(() => this.todosSignal());

  public ngOnInit(): void {
    this.todoSignalService.saveTodosInLocalStorage();
  }

  private getTodosFromLocalStorage(): void {
    const todosData = localStorage.getItem(TodoKeyLocalStorage.TODO_LIST);
    if (todosData) {
      this.todosSignal.set(JSON.parse(todosData));
    }
  }

  public handleCompletedTodo(todoId: number): void {
    if (todoId) {
      this.todosSignal.mutate((todos) => {
        const todo = todos.find((t) => t?.id === todoId);
        if (todo) {
          todo.completed = true;
        }
      });
    }
  }

  public handleDeleteTodo(todoId: number): void {
    if (todoId) {
      const indexOfTodo = this.todoList().findIndex((todo) => todo?.id === todoId);
      if (indexOfTodo !== -1) {
        this.todosSignal.update((todos) => {
          return todos.filter((todo) => todo.id !== todoId);
        });
        this.todoSignalService.saveTodosInLocalStorage();
      }
    }
  }
}
