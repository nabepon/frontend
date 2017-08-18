// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './createStore';
import createContainer from './createContainer';
import renderForClient from './renderForClient';
import type { Store } from '../types';

export default class App {
  firstHistoryState: ?Object;
  element: HTMLElement;
  store: Store;

  constructor({ firstHistoryState }: Object = { firstHistoryState: { action: '' } }) {
    this.firstHistoryState = firstHistoryState;
    this.element = createContainer();
    this.store = createStore();
  }
  render() {
    return renderForClient(this.store, this.element);
  }
  empty() {
    ReactDOM.render(<div />, this.element);
  }
  getFirstHistoryState() {
    const firstHistoryState = this.firstHistoryState;
    this.firstHistoryState = null;
    return firstHistoryState;
  }
}
