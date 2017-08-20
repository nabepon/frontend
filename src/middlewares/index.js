// @flow
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import promisifiedArrayMiddleware from '../modules/redux-promisified-array';

const middlewares = [
  thunkMiddleware,
  promisifiedArrayMiddleware,
  promiseMiddleware,
];

export default middlewares;
