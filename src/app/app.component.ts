import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './components/todo-list/todo-list.component'; // ייבוא הרכיב

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TodoListComponent], // נוסיף את TodoListComponent ל-imports
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'To-Do App';
}
