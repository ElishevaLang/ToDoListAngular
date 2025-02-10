import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { TodoService } from '../../services/todo.service'; 
import { Todo } from '../../models/todo';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-add-todo',
  standalone: true, 
  imports: [FormsModule],  
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent {
  newTask: Todo = { id: 0, title: '', description: '', isCompleted: false };

  constructor(private todoService: TodoService) {} 

  addTodo() {
    if (this.newTask.title.trim().length < 3) {
      console.error('Error: Task title must be at least 3 characters long.');
      return;
    }

    this.todoService.addTodo(this.newTask.title, this.newTask.description || '')
      .pipe(
        catchError((error) => {
          console.error('Failed to add todo:', error);
          return of(null); 
        })
      )
      .subscribe({
        next: (response) => {
          if (response) {
            console.log('Task Added:', this.newTask);
            this.newTask = { id: 0, title: '', description: '', isCompleted: false };
          }
        },
        error: (error) => console.error('Unexpected error:', error),
        complete: () => console.log('Add task completed')
      });
  }
}
