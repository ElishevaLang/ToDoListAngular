import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos: Todo[] = [];
  private todosSubject = new BehaviorSubject<Todo[]>([]);
  private filter = 'all';

  constructor() {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      this.todos = JSON.parse(storedTodos);
    }
    this.updateFilteredTodos();
  }

  getTodos(): Observable<Todo[]> {
    return this.todosSubject.asObservable();
  }

  setFilter(filter: string) {
    console.log('Filtering byjjjjjjjjjjjj:', filter);

    this.filter = filter;
    this.updateFilteredTodos();
  }

  private updateFilteredTodos() {
    let filteredTodos;
    if (this.filter === 'completed') {
      filteredTodos = this.todos.filter(todo => todo.isCompleted);
    } else if (this.filter === 'incomplete') {
      filteredTodos = this.todos.filter(todo => !todo.isCompleted);
    } else {
      filteredTodos = this.todos;
    }
    this.todosSubject.next(filteredTodos);
  }

  // 🔹 **תיקון:** עכשיו `addTodo()` מחזירה `Observable<void>`  
  addTodo(title: string, description: string): Observable<void> {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      description,
      isCompleted: false,
    };
    this.todos.push(newTodo);
    this.saveTodos();
    return of(); // ✅ מחזיר Observable ריק כדי לאפשר `subscribe()`
  }

  toggleComplete(id: number): Observable<void> {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.isCompleted = !todo.isCompleted;
      this.saveTodos();
    }
    return of();
  }

  deleteTodo(id: number): Observable<void> {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.saveTodos();
    return of();
  }

  private saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
    this.updateFilteredTodos();
  }
}
