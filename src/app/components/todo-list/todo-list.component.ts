// import { Component } from '@angular/core';
// import { Observable } from 'rxjs';
// import { TodoService } from '../../services/todo.service';
// import { Todo } from '../../models/todo';
// import { TodoItemComponent } from '../todo-item/todo-item.component';
// import { FormsModule } from '@angular/forms';  // Import FormsModule
// import { AddTodoComponent } from '../add-todo/add-todo.component';


// @Component({
//   selector: 'app-todo-list',
//   templateUrl: './todo-list.component.html',
//   styleUrls: ['./todo-list.component.css'],
//   standalone: true,
//   imports: [AddTodoComponent, TodoItemComponent, FormsModule]  // Add FormsModule here
// })
// // export class TodoListComponent {
// //   todos$!: Observable<Todo[]>;
// //   filter = 'all';

// //   constructor(private todoService: TodoService) {
// //     this.loadTodos();
// //   }

// //   loadTodos() {
// //     this.todos$ = this.todoService.getTodos(); // Refresh the list after any action
// //   }

// //   addTodo(title: string, description: string) {
// //     this.todoService.addTodo(title, description).subscribe(() => {
// //       this.loadTodos(); // Reload after adding a task
// //     });
// //   }

// //   markCompleted(id: number) {
// //     this.todoService.toggleComplete(id).subscribe(() => {
// //       this.loadTodos(); // Reload after marking as completed
// //     });
// //   }

// //   deleteTodo(id: number) {
// //     this.todoService.deleteTodo(id).subscribe(() => {
// //       this.loadTodos(); // Reload after deleting a task
// //     });
// //   }

// //   setFilter(filter: string) {
// //     this.todos$ = this.todoService.filterTodos(filter);
// //   }
// // }
// export class TodoListComponent {
//   todos$!: Observable<Todo[]>;
//   filter = 'all';

//   constructor(private todoService: TodoService) {
//     this.todos$ = this.todoService.getTodos(); // הרשימה תקבל עדכונים אוטומטית
//   }

//   addTodo(title: string, description: string) {
//     this.todoService.addTodo(title, description);
//   }

//   markCompleted(id: number) {
//     this.todoService.toggleComplete(id);
//   }

//   deleteTodo(id: number) {
//     this.todoService.deleteTodo(id);
//   }

//   setFilter(filter: string) {
//     this.todos$ = this.todoService.filterTodos(filter);
//   }
// }

//=================================================================================================================
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { FormsModule } from '@angular/forms';
import { AddTodoComponent } from '../add-todo/add-todo.component';
import { CommonModule } from '@angular/common'; // ✅ ייבוא CommonModule


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  standalone: true,
  imports: [AddTodoComponent, TodoItemComponent, FormsModule,CommonModule]
})
export class TodoListComponent {
  todos$!: Observable<Todo[]>;
  filter = 'all';

  constructor(private todoService: TodoService) {
    this.todos$ = this.todoService.getTodos(); // הרשימה תקבל עדכונים אוטומטית
  }

  addTodo(title: string, description: string) {
    this.todoService.addTodo(title, description);
  }

  markCompleted(id: number) {
    this.todoService.toggleComplete(id);
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id);
  }

  setFilter(filter: string) {
    console.log('Filtering by:', filter);
    this.filter = filter;
    this.todoService.setFilter(filter); // ⬅️ זה הסינון הנכון
  }
}
