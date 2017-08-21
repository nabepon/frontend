// @flow
import { handleActions } from 'redux-actions';
import type { Dispatch } from '../types';
import { NOOP } from '../modules/redux-noop';

const INIT = 'myApp/todoClient/INIT';
const ADD_TODO = 'myApp/todoClient/ADD_TODO';
const TOGGLE_TODO = 'myApp/todoClient/TOGGLE_TODO';

export function init() {
  return { type: INIT };
}

export function addTodo(value: string) {
  // eslint-disable-next-line no-console
  console.log(value);
  if (!value) {
    return { type: NOOP };
  }
  return (dispatch: Dispatch) => Promise.resolve().then(() => {
    const todo = {
      value,
      createTime: Date.now(),
      id: Date.now().toString(),
      status: false,
    };
    return dispatch({ type: ADD_TODO, payload: todo });
  });
}

export function toggleTodo(id: string) {
  return { type: TOGGLE_TODO, payload: id };
}

function createInitialState() {
  return {
    todos: [],
  };
}

export default handleActions({
  [INIT]: state => ({
    ...state,
  }),
  [ADD_TODO]: (state, { payload }) => ({
    ...state,
    todos: [
      ...state.todos,
      payload,
    ],
  }),
  [TOGGLE_TODO]: (state, { payload }) => {
    const doneTodo = state.todos.find(todo => todo.id === payload);
    const newTodos = state.todos.filter(todo => todo.id !== payload);
    newTodos.push({
      ...doneTodo,
      status: !doneTodo.status,
    });
    return {
      ...state,
      todos: newTodos,
    };
  },
}, createInitialState());
