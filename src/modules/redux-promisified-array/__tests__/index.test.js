// @flow
/* eslint-disable max-nested-callbacks */
import assert from 'power-assert';
import { describe, it } from 'mocha';
import configureMockStore from 'redux-mock-store';
import arrayMiddleware from '../index';

describe('src/modules/redux-promisified-array', () => {
  it('actionのarrayをdispatch -> 再帰的にdispatchされてPromiseが返る', () => {
    const store = configureMockStore([arrayMiddleware])();
    const action = [
      { type: 'action1' },
      [
        [{ type: 'action2' }],
        { type: 'action3' },
        [{ type: 'action4' }],
      ],
      { type: 'action5' },
    ];

    const result = store.dispatch(action);

    assert(typeof result.then === 'function');

    const resultActions = store.getActions();

    assert.deepStrictEqual(resultActions, [
      { type: 'action1' },
      { type: 'action2' },
      { type: 'action3' },
      { type: 'action4' },
      { type: 'action5' },
    ]);
  });
});
