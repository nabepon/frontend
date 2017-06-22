// @flow
import type { Store as ReduxStore } from 'redux';
import type { CounterAction, CounterState } from './counter';
import type { BillingsAction, BillingsState } from './billings';

export type Actions =
  | CounterAction
  | BillingsAction
  ;

export type State = {
  counter: CounterState;
  billings: BillingsState;
};

export type Store = ReduxStore<State, Dispatch, DispatchAction>;

// Support redux-promise, redux-array
type PromiseAction = Promise<Actions | ArrayAction>;
type ArrayAction = Array<Actions | ArrayAction | PromiseAction>;
export type DispatchAction = Actions | PromiseAction | ArrayAction;
export type Dispatch = (action: DispatchAction) => Promise<Actions>;
