import { Component, Input } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-delete-todo',
  templateUrl: './delete-todo.component.html',
  styleUrls: ['./delete-todo.component.scss']
})
export class DeleteTodoComponent {
  @Input() todo!: Todo;

  constructor(private todoService: TodoService) {}

  deleteTask() {
    if (!this.todo || !this.todo.id) {
      console.error('Error: Invalid todo item');
      return;
    }

    this.todoService.deleteTodo(this.todo.id).pipe(
      catchError((error) => {
        console.error('Failed to delete todo:', error);
        return of(null); 
      })
    ).subscribe({
      next: (response) => {
        if (response) {
          console.log('Todo deleted successfully');
        }
      },
      error: (error) => console.error('Unexpected error:', error),
      complete: () => console.log('Delete task completed')
    });
  }
}
