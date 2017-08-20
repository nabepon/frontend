// @flow
import { combineReducers } from 'redux';
import todoClient from './todoClient';
import todoServer from './todoServer';

export default combineReducers({
  todoClient,
  todoServer,
});
