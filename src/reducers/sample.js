// @flow
import { createAction, handleActions } from 'redux-actions';

const INIT = 'myApp/sample/INIT';
const REFLECT = 'myApp/sample/REFLECT';
const LOADING = 'myApp/sample/LOADING';

export function init() {
  return createAction(INIT)();
}

export function reflect(data: any) {
  return createAction(REFLECT)(data);
}

export function loading() {
  return createAction(LOADING)();
}

function createInitialState() {
  return {
    loaded: false,
    loading: false,
    payload: '',
  };
}

export default handleActions({
  [INIT]: () => ({
    ...createInitialState(),
  }),
  [REFLECT]: (state, action) => ({
    ...state,
    loaded: true,
    loading: false,
    payload: action.payload,
  }),
  [LOADING]: state => ({
    ...state,
    loading: true,
  }),
}, createInitialState());
