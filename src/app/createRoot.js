// @flow
import React from 'react';
import { Provider } from 'react-redux';
import getRoute from '../routes';
import type { Store } from '../types';

/**
 * createRoot
 * pathから表示するコンポーネントの取得、load実行、reduxとのconnectを担う
 */
export default async function createRoot(
  store: Store,
  url: string,
  history: Object,
): Promise<{loaders: Array<*>, root: React$Element<*>}> {
  const route = await getRoute(url);
  const loader = route.loader(store, history);
  const loaders = Array.isArray(loader) ? loader : [loader];
  const RootComponent = route.component;
  const root = (
    <Provider store={store} key="provider">
      <RootComponent />
    </Provider>
  );

  return { loaders, root };
}
