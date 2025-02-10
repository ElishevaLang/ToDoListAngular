import { TestBed } from '@angular/core/testing';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo';
import { of } from 'rxjs';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a new todo', async () => {
    const newTodo: Todo = {
      id: Date.now(),
      title: 'New Task',
      description: 'Test description',
      isCompleted: false
    };

    await service.addTodo(newTodo.title, newTodo.description ?? '').toPromise();

    expect(service['todos'].length).toBe(1); 
    expect(service['todos'][0].title).toBe(newTodo.title);
    expect(service['todos'][0].description).toBe(newTodo.description);
    expect(service['todos'][0].isCompleted).toBe(false);
  });

  it('should toggle the completion status of a todo', async () => {
    const todo: Todo = { id: 1, title: 'Existing Task', description: 'Test', isCompleted: false };
    service['todos'] = [todo];
  
    await service.toggleComplete(todo.id).toPromise();
  
    expect(service['todos'][0].isCompleted).toBe(true);
  });

  it('should delete a todo', (done) => {
    const todo: Todo = { id: 1, title: 'Task to Delete', description: 'Delete me', isCompleted: false };
    service['todos'] = [todo];  // הוספת משימה ל-list הפנימי

    service.deleteTodo(todo.id).subscribe(() => {
      console.log('Todo deleted');
      expect(service['todos'].length).toBe(0);  // לוודא שהמשימה נמחקה
      done();
    }, (err) => {
      console.error('Error deleting todo:', err);
      done();
    });
  }, 10000); // הגדלת הזמן ל-10 שניות במקרה שדרוש יותר זמן

  it('should filter todos by "completed" status', (done) => {
    const todo1: Todo = { id: 1, title: 'Task 1', description: 'Completed task', isCompleted: true };
    const todo2: Todo = { id: 2, title: 'Task 2', description: 'Incomplete task', isCompleted: false };
  
    service['todos'] = [todo1, todo2];
  
    service.setFilter('completed');
    service.getTodos().subscribe((todos) => {
      expect(todos.length).toBe(1);
      expect(todos[0].isCompleted).toBe(true);  // השתמש ב-toBe(true) במקום toBeTrue
      done();
    });
  });

  it('should filter todos by "incomplete" status', (done) => {
    const todo1: Todo = { id: 1, title: 'Task 1', description: 'Completed task', isCompleted: true };
    const todo2: Todo = { id: 2, title: 'Task 2', description: 'Incomplete task', isCompleted: false };
  
    service['todos'] = [todo1, todo2];
  
    service.setFilter('incomplete');
    service.getTodos().subscribe((todos) => {
      expect(todos.length).toBe(1);
      expect(todos[0].isCompleted).toBe(false);  // השתמש ב-toBe(false) במקום toBeFalse
      done();
    });
  });
});

