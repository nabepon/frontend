// @flow
import type { MiddlewareAPI, Dispatch } from 'redux';

export default ({ dispatch }: MiddlewareAPI<*, *>) => (next: Dispatch<*>) => (action: any) => {
  if (Array.isArray(action)) {
    return Promise.all(action.map(dispatch));
  }
  return next(action);
};
