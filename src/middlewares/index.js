// @flow
import promiseMiddleware from 'redux-promise';
import promisifiedArrayMiddleware from '../modules/redux-promisified-array';

const middlewares = [
  promisifiedArrayMiddleware,
  promiseMiddleware,
];

export default middlewares;
