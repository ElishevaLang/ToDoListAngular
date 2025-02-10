import { createAction, props } from '@ngrx/store';
import { Todo } from '../models/todo';

export const addTodo = createAction(
  '[Todo List] Add Todo',
  props<{ todo: Todo }>()
);

export const markCompleted = createAction(
  '[Todo List] Mark Completed',
  props<{ id: number }>()
);

export const deleteTodo = createAction(
  '[Todo List] Delete Todo',
  props<{ id: number }>()
);

export const setFilter = createAction(
  '[Todo List] Set Filter',
  props<{ filter: string }>()
);
