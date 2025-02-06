import { createAction, props } from '@ngrx/store';
import { Todo } from '../models/todo';

// Action for adding a to-do
export const addTodo = createAction(
  '[Todo List] Add Todo',
  props<{ todo: Todo }>()
);

// Action for marking a to-do as completed
export const markCompleted = createAction(
  '[Todo List] Mark Completed',
  props<{ id: number }>()
);

// Action for deleting a to-do
export const deleteTodo = createAction(
  '[Todo List] Delete Todo',
  props<{ id: number }>()
);

// Action for setting the filter
export const setFilter = createAction(
  '[Todo List] Set Filter',
  props<{ filter: string }>()
);
