import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { TodoService } from '../../services/todo.service'; 
import { Todo } from '../../models/todo';

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
    if (this.newTask.title.trim().length >= 3) {
      this.todoService.addTodo(this.newTask.title, this.newTask.description || '')
        .subscribe(() => { // ✅ עכשיו `subscribe()` עובד כי `addTodo()` מחזירה `Observable<void>`
          console.log('Task Added:', this.newTask);
          this.newTask = { id: 0, title: '', description: '', isCompleted: false };
        });
    }
  }
}
