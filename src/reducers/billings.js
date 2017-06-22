import { createAction, handleActions } from 'redux-actions';

const INIT = 'myApp/billings/INIT';
const LOAD_COMPLETE = 'myApp/billings/LOAD_COMPLETE';

export function init() {
  return createAction(INIT)();
}

export function loadComplete(data) {
  return createAction(LOAD_COMPLETE)(data);
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
  [LOAD_COMPLETE]: state => ({
    ...state,
    loaded: true,
    loading: false,
  }),
}, createInitialState());
