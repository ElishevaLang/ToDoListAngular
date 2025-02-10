import { Component, Input } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo';
import { DeleteTodoComponent } from '../delete-todo/delete-todo.component';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
  standalone: true,
  imports: [DeleteTodoComponent], 
})
export class TodoItemComponent {
  @Input() todo!: Todo;

  constructor(private todoService: TodoService) {}

  toggleComplete() {
    if (!this.todo || !this.todo.id) {
      console.error('Error: Invalid todo item');
      return;
    }

    this.todoService.toggleComplete(this.todo.id).pipe(
      catchError((error) => {
        console.error('Failed to toggle todo status:', error);
        return of(null); 
      })
    ).subscribe({
      next: (response) => {
        if (response) {
          console.log('Todo status toggled successfully');
        }
      },
      error: (error) => console.error('Unexpected error:', error),
      complete: () => console.log('Toggle complete')
    });
  }

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
      complete: () => console.log('Delete complete')
    });
  }
}
