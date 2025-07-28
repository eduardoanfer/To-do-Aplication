import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TodoSignalService } from 'src/app/services/todo-signal.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule],
  templateUrl: './todo-form.component.html',
})
export class TodoFormComponent {
  // componente de formulário dentro do meu componente( class) 
  // inject permite injetar dependências
  private todoSignalService = inject(TodoSignalService);
  private dialogRefService = inject(MatDialogRef<HeaderComponent>);
  public allTodos = this.todoSignalService.todoState();


  public todosForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [
      Validators.required, 
      Validators.minLength(5),
    ]),
  });
  public headleCreateNewTodo()
  {
    if(this.todosForm && this.todosForm.valid)
    {
      const title = String(this.todosForm.value.title);
      const description = String(this.todosForm.value.description);
      const id = this.allTodos.length > 0 ? this.allTodos[this.allTodos.length - 1].id + 1 : 1;
      const completed = false;
      this.todoSignalService.updateTodos({id, title, description, completed});
      this.dialogRefService.close();
    }
  }
  public handleCloseModal(): void {
    this.dialogRefService.close();
  }
}
