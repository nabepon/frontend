// @flow
import type { Store as ReduxStore } from 'redux';
import type { NoopAction } from '../modules/redux-noop';
import type { CounterAction, CounterState } from './counter';
import type { SampleAction, SampleState } from './sample';
import type { TodoClientAction, TodoClientState } from './todoClient';
import type { TodoServerAction, TodoServerState } from './todoServer';

export type Actions =
  | NoopAction // @see also redux-noop
  | CounterAction
  | SampleAction
  | TodoClientAction
  | TodoServerAction
  ;

export type State = {
  counter: CounterState;
  sample: SampleState;
  todoClient: TodoClientState;
  todoServer: TodoServerState;
};

export type Store = ReduxStore<State, Dispatch, DispatchAction>;

export type ThunkAction = (dispatch: Dispatch) => PromiseAction
export type PromiseAction = Promise<DispatchAction>;
export type ArrayAction = Array<DispatchAction>;
export type DispatchAction = Actions | ThunkAction | ArrayAction | PromiseAction;
export type Dispatch = (action: DispatchAction) => Promise<DispatchAction>;
export type ActionCreatorResult = DispatchAction;
