// @flow
import type { Store as ReduxStore } from 'redux';
import type { NoopAction } from '../modules/redux-noop';
import type { CounterAction, CounterState } from './counter';
import type { SampleAction, SampleState } from './sample';

export type Actions =
  | NoopAction // @see also redux-noop
  | CounterAction
  | SampleAction
  ;

export type State = {
  counter: CounterState;
  sample: SampleState;
};

export type Store = ReduxStore<State, Dispatch, DispatchAction>;

// Support redux-promise, redux-array
export type PromiseAction = Promise<DispatchAction>;
export type ArrayAction = Array<DispatchAction>;
export type DispatchAction = Actions | ArrayAction | PromiseAction;
export type Dispatch = (action: DispatchAction) => Promise<DispatchAction>;
export type ActionCreatorResult = Array<*> | Promise<*> | Actions | DispatchAction;
