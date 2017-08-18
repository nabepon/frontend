// @flow
/* eslint-disable max-nested-callbacks */
import assert from 'power-assert';
import { describe, it } from 'mocha';
import configureMockStore from 'redux-mock-store';
import noopMiddleware, { NOOP } from '../index';

describe('src/modules/redux-noop/index.js', () => {
  it('NOOPをdispatch -> 何もdispatchされない', () => {
    const store = configureMockStore([noopMiddleware])();
    const action = { type: NOOP };
    const result = store.dispatch(action);
    const resultActions = store.getActions();
    assert.deepStrictEqual(result, { type: '__redux-noop/NOOP__' });
    assert.deepStrictEqual(resultActions, []);
  });
});
