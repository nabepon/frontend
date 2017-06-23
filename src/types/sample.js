// @flow
export type InitAction = { type: 'ivWeb/sample/INIT', payload: any };
export type ReflectAction = { type: 'ivWeb/sample/REFLECT', payload: string };
export type LoadingAction = { type: 'ivWeb/sample/LOADING', payload: number };

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
