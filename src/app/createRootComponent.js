// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { getRoute } from '../routes';
import type { LoaderProps } from '../types/routes';

/**
 * createRootComponent
 * pathから表示するコンポーネントの取得、load実行、reduxとのconnectを担う
 */
export default async function createRootComponent(
  { store, url, history }: LoaderProps,
): Promise<{loaders: Array<Promise<*>>, root: React$Element<*>}> {
  const route = await getRoute(url);
  const loader = route.loader({ store, url, history });
  const loaders = Array.isArray(loader) ? loader : [loader];
  const RootComponent = route.component;
  const root = (
    <Provider store={store} key="provider">
      <div>
        <RootComponent />
      </div>
    </Provider>
  );

  return { loaders, root };
}
