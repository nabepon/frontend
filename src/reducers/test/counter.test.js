// @flow
/* eslint-disable max-nested-callbacks */
import { describe, it } from 'mocha';
import assert from 'power-assert';
import { testAction } from '../../utils/redux-test';
import {
  increment,
  decrement,
  _createInitialState as createInitialState,
} from '../counter';

describe('src/reducers/counter.js', () => {
  describe('increment', () => {
    it('d数値が 1 増える', () => {
      const expectedState = {
        ...createInitialState(),
        count: createInitialState().count + 1,
      };
      return testAction(increment()).then(({ state }) => {
        assert.deepEqual(state.counter, expectedState);
      });
    });
  });

  describe('decrement', () => {
    it('数値が 1 減る', () => {
      const expectedState = {
        ...createInitialState(),
        count: createInitialState().count - 1,
      };
      return testAction(decrement()).then(({ state }) => {
        assert.deepEqual(state.counter, expectedState);
      });
    });
  });
});
