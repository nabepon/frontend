// @flow
/**
 * 「何もしない」をするmiddleware
 */
import type { Dispatch } from 'redux';

export type NoopAction = {type: 'redux-noop/NOOP'};
export const NOOP = 'redux-noop/NOOP';
const _NOOP = '__redux-noop/NOOP__';

export default () => (next: Dispatch<*>) => (action: any) => {
  if (action.type === NOOP) {
    return { type: _NOOP };
  }
  return next(action);
};
