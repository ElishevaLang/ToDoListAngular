import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos: Todo[] = [];
  private todosSubject = new BehaviorSubject<Todo[]>([]);
  private filter = 'all';

  constructor() {
    try {
      const storedTodos = localStorage.getItem('todos');
      if (storedTodos) {
        this.todos = JSON.parse(storedTodos);
      }
      this.updateFilteredTodos();
    } catch (error) {
      console.error('Error loading todos from localStorage:', error);
      this.todos = [];
    }
  }

  getTodos(): Observable<Todo[]> {
    return this.todosSubject.asObservable().pipe(
      catchError((error) => {
        console.error('Error getting todos:', error);
        return of([]); 
      })
    );
  }

  setFilter(filter: string) {
    console.log('Filtering by:', filter);
    this.filter = filter;
    this.updateFilteredTodos();
  }

  private updateFilteredTodos() {
    let filteredTodos: Todo[];
    try {
      if (this.filter === 'completed') {
        filteredTodos = this.todos.filter((todo) => todo.isCompleted);
      } else if (this.filter === 'incomplete') {
        filteredTodos = this.todos.filter((todo) => !todo.isCompleted);
      } else {
        filteredTodos = [...this.todos]; 
      }
      this.todosSubject.next(filteredTodos);
    } catch (error) {
      console.error('Error filtering todos:', error);
      this.todosSubject.next([]); 
    }
  }

  addTodo(title: string, description: string): Observable<void> {
    if (!title || title.trim().length < 3) {
      console.error('Error: Task title must be at least 3 characters long.');
      return throwError(() => new Error('Invalid title'));
    }

    const newTodo: Todo = {
      id: Date.now(),
      title,
      description: description || '', 
      isCompleted: false,
    };

    try {
      this.todos.push(newTodo);
      this.saveTodos();
      return of();
    } catch (error) {
      console.error('Error adding todo:', error);
      return throwError(() => new Error('Failed to add todo'));
    }
  }

  toggleComplete(id: number): Observable<void> {
    try {
      const todo = this.todos.find((todo) => todo.id === id);
      if (!todo) {
        console.error('Error: Task not found');
        return throwError(() => new Error('Task not found'));
      }

      todo.isCompleted = !todo.isCompleted;
      this.saveTodos();
      return of();
    } catch (error) {
      console.error('Error toggling completion:', error);
      return throwError(() => new Error('Failed to toggle completion'));
    }
  }

  deleteTodo(id: number): Observable<void> {
    try {
      const initialLength = this.todos.length;
      this.todos = this.todos.filter((todo) => todo.id !== id);
      if (this.todos.length === initialLength) {
        console.error('Error: Task not found');
        return throwError(() => new Error('Task not found'));
      }

      this.saveTodos();
      return of();
    } catch (error) {
      console.error('Error deleting todo:', error);
      return throwError(() => new Error('Failed to delete todo'));
    }
  }

  private saveTodos() {
    try {
      localStorage.setItem('todos', JSON.stringify(this.todos));
      this.updateFilteredTodos();
    } catch (error) {
      console.error('Error saving todos to localStorage:', error);
    }
  }
}
