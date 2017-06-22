// @flow
export type InitAction = { type: 'myApp/counter/INIT', payload: any };
export type IncrementAction = { type: 'myApp/counter/INCREMENT', payload: string };
export type DecrementAction = { type: 'myApp/counter/DECREMENT', payload: number };
export type DecrementRequestAction = { type: 'myApp/counter/DECREMENT_REQUEST' };

export type CounterAction =
  | InitAction
  | IncrementAction
  | DecrementAction
  | DecrementRequestAction
  ;

export type CounterState = {
  +count: number,
}
