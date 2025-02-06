import { createSelector } from '@ngrx/store';
import { TodoState } from './reducer';

export const selectTodoState = (state: any) => state.todo;

export const selectTodos = createSelector(
  selectTodoState,
  (state: TodoState) => state.todos
);

export const selectFilter = createSelector(
  selectTodoState,
  (state: TodoState) => state.filter
);

export const selectFilteredTodos = createSelector(
  selectTodos,
  selectFilter,
  (todos, filter) => {
    switch (filter) {
      case 'completed':
        return todos.filter(todo => todo.isCompleted);
      case 'incomplete':
        return todos.filter(todo => !todo.isCompleted);
      default:
        return todos;
    }
  }
);
