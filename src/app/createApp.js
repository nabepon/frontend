// @flow
import createStore from './createStore';
import createContainer from './createContainer';
import renderClient from './renderClient';
import type { Store } from '../types';

export default function createApp({ firstHistoryState }: Object = { firstHistoryState: { action: '' } }): {
  element: HTMLElement;
  store: Store;
  render: Function;
  firstHistoryState: ?Object;
} {
  const element = createContainer();
  const store = createStore();
  const render = () => renderClient(store, element);
  return { element, store, render, firstHistoryState };
}
