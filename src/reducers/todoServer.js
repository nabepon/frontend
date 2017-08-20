// @flow
import { handleActions } from 'redux-actions';
import axios from 'axios';

const INIT = 'myApp/todo/INIT';
const UPDATE_TODO = 'myApp/todo/UPDATE_TODO';

export function init() {
  return axios.get('http://localhost:9010/todos').then((result) => {
    return { type: UPDATE_TODO, payload: result.data.todos };
  });
}

export function addTodo(value) {
  return axios.post('http://localhost:9010/addTodo', { data: value }).then((result) => {
    return { type: UPDATE_TODO, payload: result.data.todos };
  });
}

export function toggleTodo(id) {
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
