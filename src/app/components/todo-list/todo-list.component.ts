import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { FormsModule } from '@angular/forms';
import { AddTodoComponent } from '../add-todo/add-todo.component';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  standalone: true,
  imports: [AddTodoComponent, TodoItemComponent, FormsModule, CommonModule]
})
export class TodoListComponent {
  todos$!: Observable<Todo[]>;
  filter = 'all';

  constructor(private todoService: TodoService) {
    this.loadTodos(); 
  }

  loadTodos() {
    this.todos$ = this.todoService.getTodos().pipe(
      catchError((error) => {
        console.error('Failed to load todos:', error);
        return of([]); 
      })
    );
  }

  addTodo(title: string, description: string) {
    if (title.trim().length < 3) {
      console.error('Error: Task title must be at least 3 characters long.');
      return;
    }

    this.todoService.addTodo(title, description).pipe(
      catchError((error) => {
        console.error('Failed to add todo:', error);
        return of(null);
      })
    ).subscribe({
      next: (response) => {
        if (response) {
          console.log('Task added successfully');
          this.loadTodos(); 
        }
      },
      error: (error) => console.error('Unexpected error:', error),
      complete: () => console.log('Add task process completed')
    });
  }

  markCompleted(id: number) {
    this.todoService.toggleComplete(id).pipe(
      catchError((error) => {
        console.error('Failed to mark task as completed:', error);
        return of(null);
      })
    ).subscribe({
      next: (response) => {
        if (response) {
          console.log('Task marked as completed');
          this.loadTodos();
        }
      },
      error: (error) => console.error('Unexpected error:', error),
      complete: () => console.log('Toggle complete process completed')
    });
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).pipe(
      catchError((error) => {
        console.error('Failed to delete todo:', error);
        return of(null);
      })
    ).subscribe({
      next: (response) => {
        if (response) {
          console.log('Task deleted successfully');
          this.loadTodos();
        }
      },
      error: (error) => console.error('Unexpected error:', error),
      complete: () => console.log('Delete task process completed')
    });
  }

  setFilter(filter: string) {
    console.log('Filtering by:', filter);
    this.filter = filter;
    this.todoService.setFilter(filter); 
  }
}
