// @flow
import { handleActions } from 'redux-actions';

const INIT = 'myApp/todo/INIT';
const ADD_TODO = 'myApp/todo/ADD_TODO';
const TOGGLE_TODO = 'myApp/todo/TOGGLE_TODO';

export function init() {
  return { type: INIT };
}

export function addTodo(value) {
  console.log(value)
  if (!value) {
    return { type: '' };
  }
  return (dispatch, getState) => Promise.resolve().then(() => {
    const todo = {
      value,
      createTime: Date.now(),
      id: Date.now().toString(),
      status: false,
    };
    return dispatch({ type: ADD_TODO, payload: todo });
  });
}

export function toggleTodo(id) {
  return { type: TOGGLE_TODO, payload: id };
}

function createInitialState() {
  return {
    todos: [],
  };
}

export default handleActions({
  [INIT]: (state) => ({
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
