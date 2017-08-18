// @flow
export type InitAction = { type: 'myApp/sample/INIT', payload: any };
export type ReflectAction = { type: 'myApp/sample/REFLECT', payload: string };
export type LoadingAction = { type: 'myApp/sample/LOADING', payload: number };

export type SampleAction =
  | InitAction
  | ReflectAction
  | LoadingAction
  ;

export type SampleState = {
  +loaded: boolean,
  +loading: boolean,
  +payload: any,
}
