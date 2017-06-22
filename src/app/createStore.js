// @flow
import {
  createStore as _createStore,
  applyMiddleware,
  compose,
} from 'redux';
import middlewares from '../middlewares';
import reducers from '../reducers';
import type { Store } from '../types';

export default function createStore(): Store {
  let finalCreateStore;

  if (__DEVELOPMENT__) {
    const enhancers = [applyMiddleware(...middlewares)];
    // 開発するときはChrome拡張をインストール
    // https://github.com/zalmoxisus/redux-devtools-extension
    if (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION__) {
      enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
    }
    finalCreateStore = compose(...enhancers)(_createStore);
  } else {
    finalCreateStore = compose(applyMiddleware(...middlewares))(_createStore);
  }

  return finalCreateStore(reducers, {});
}
