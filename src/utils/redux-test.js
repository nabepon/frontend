// @flow
import configureMockStore from 'redux-mock-store';
import createStore from '../app/createStore';
import middlewares from '../middlewares';
import reducers from '../reducers';
import type { DispatchAction } from '../types';

// eslint-disable-next-line import/prefer-default-export
export function testAction(action: DispatchAction) {
  const mockStore = configureMockStore(middlewares);
  const initialState = createStore().getState();

  const store = mockStore(() =>
    // getStateしたときにreduceし、最新のstateが返るようにする
     store.getActions().reduce((prev, action) => reducers(prev, action), initialState));

  return Promise.resolve(store.dispatch(action)).then(() => {
    const dispatchedActions = store.getActions();
    return {
      dispatchedActions,
      state: store.getState(),
      store,
    };
  });
}
