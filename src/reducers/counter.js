// @flow
import { handleActions } from 'redux-actions';
import type {
  IncrementAction,
  DecrementAction,
} from '../types/counter';
import type { ActionCreatorResult } from '../types';

const INIT = 'myApp/counter/INIT';
const INCREMENT = 'myApp/counter/INCREMENT';
const DECREMENT = 'myApp/counter/DECREMENT';
const DECREMENT_REQUEST = 'myApp/counter/DECREMENT_REQUEST';

export function init(): ActionCreatorResult {
  return { type: INIT };
}

export function increment(): ActionCreatorResult {
  return dispatch => new Promise((resolve) => {
    setTimeout(() => resolve(dispatch({ type: INCREMENT, payload: 1 })), 200);
  });
}

export function decrement(): ActionCreatorResult {
  return [
    { type: DECREMENT_REQUEST },
    new Promise((resolve) => {
      setTimeout(() => resolve(
        { type: DECREMENT, payload: 1 },
      ), 1500);
    }),
  ];
}

export function createInitialState() {
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
