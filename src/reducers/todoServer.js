// @flow
import { handleActions } from 'redux-actions';
import axios from 'axios';

const INIT = 'myApp/todoServer/INIT';
const UPDATE_TODO = 'myApp/todoServer/UPDATE_TODO';

export function init() {
  return axios.get('http://localhost:9010/todos').then((result) => {
    return { type: UPDATE_TODO, payload: result.data.todos };
  });
}

export function addTodo(value: string) {
  return axios.post('http://localhost:9010/addTodo', { data: value }).then((result) => {
    return { type: UPDATE_TODO, payload: result.data.todos };
  });
}

export function toggleTodo(id: string) {
  return axios.post('http://localhost:9010/toggleTodo', { data: id }).then((result) => {
    return { type: UPDATE_TODO, payload: result.data.todos };
  });
}

function createInitialState() {
  return {
    lastId: 0,
    todos: [],
  };
}

export default handleActions({
  [INIT]: () => ({
    ...createInitialState(),
  }),
  [UPDATE_TODO]: (state, { payload }) => ({
    ...state,
    todos: payload,
  }),
}, createInitialState());
