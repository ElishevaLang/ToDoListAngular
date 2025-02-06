import { Component, Input } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo';
import { AddTodoComponent } from "../add-todo/add-todo.component";
import { DeleteTodoComponent } from '../delete-todo/delete-todo.component';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
  standalone: true,
  imports: [DeleteTodoComponent], // Mark it as standalone
})
export class TodoItemComponent {
  @Input() todo!: Todo;

  constructor(private todoService: TodoService) {}

  toggleComplete() {
    this.todoService.toggleComplete(this.todo.id).subscribe(); // עובד עכשיו כי toggleComplete מחזיר Observable
  }

  deleteTask() {
    this.todoService.deleteTodo(this.todo.id).subscribe(); // עובד עכשיו כי deleteTodo מחזיר Observable
  }
}
