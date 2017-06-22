// @flow
import { createAction, handleActions } from 'redux-actions';
import type {
  IncrementAction,
  DecrementAction,
} from '../types/counter';

const INIT = 'myApp/counter/INIT';
const INCREMENT = 'myApp/counter/INCREMENT';
const DECREMENT = 'myApp/counter/DECREMENT';
const DECREMENT_REQUEST = 'myApp/counter/DECREMENT_REQUEST';

export function init() {
  return createAction(INIT)();
}

export function increment() {
  return createAction(INCREMENT)(1);
}

export function decrement() {
  return [
    createAction(DECREMENT_REQUEST)(),
    new Promise((resolve) => {
      setTimeout(() => resolve(
        createAction(DECREMENT)(1),
      ), 1500);
    }),
  ];
}

function createInitialState() {
  return {
    loading: false,
    count: 0,
  };
}

export default handleActions({
  [INIT]: () => ({
    ...createInitialState(),
  }),
  [INCREMENT]: (state, action: IncrementAction) => ({
    ...state,
    count: state.count + action.payload,
  }),
  [DECREMENT_REQUEST]: state => ({
    ...state,
    loading: true,
  }),
  [DECREMENT]: (state, action: DecrementAction) => ({
    ...state,
    loading: false,
    count: state.count - action.payload,
  }),
}, createInitialState());

export const _createInitialState = createInitialState;
