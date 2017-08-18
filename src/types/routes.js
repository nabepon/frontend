// @flow
import type { Store } from './index';

export type LoaderProps = {
  store: Store,
  url: string,
  history: History & {
    action: '' | 'POP' | 'PUSH'
  },
};

export type Route = {
  loader: (LoaderProps) => Promise<*> | Array<Promise<*>>,
  component: ReactClass<*>,
}

export type Match = {
  path: string,
  params: Object,
  exact: boolean,
  strict: boolean,
};
