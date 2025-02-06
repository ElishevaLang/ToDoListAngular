import { createReducer, on } from '@ngrx/store';
import { addTodo, markCompleted, deleteTodo, setFilter } from './actions';
import { Todo } from '../models/todo';

export interface TodoState {
  todos: Todo[];
  filter: string;
}

export const initialState: TodoState = {
  todos: [],
  filter: 'all',
};

export const todoReducer = createReducer(
  initialState,
  on(addTodo, (state, { todo }) => ({
    ...state,
    todos: [...state.todos, todo],
  })),
  on(markCompleted, (state, { id }) => ({
    ...state,
    todos: state.todos.map(todo =>
      todo.id === id ? { ...todo, isCompleted: true } : todo
    ),
  })),
  on(deleteTodo, (state, { id }) => ({
    ...state,
    todos: state.todos.filter(todo => todo.id !== id),
  })),
  on(setFilter, (state, { filter }) => ({
    ...state,
    filter,
  }))
);
