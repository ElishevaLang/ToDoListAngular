import { Component, Input } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo';
@Component({
  selector: 'app-delete-todo',
  imports: [],
  templateUrl: './delete-todo.component.html',
  styleUrl: './delete-todo.component.scss'
})
export class DeleteTodoComponent {
  @Input() todo!: Todo;

  constructor(private todoService: TodoService) {}
  deleteTask() {
    this.todoService.deleteTodo(this.todo.id).subscribe(); 
  }
}


