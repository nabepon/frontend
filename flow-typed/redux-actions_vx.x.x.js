// @noflow
declare module 'redux-actions' {
  declare type ActionObject<A> = {
    type: A,
    payload: any,
    error: any,
    meta: any
  }
  declare function createAction<A>(type: A, payloadCreator?: Function, metaCreator?: Function): (...args: *[])=>ActionObject<A>;
  declare function handleAction(type: string, reducer: Object | Function): Function;
  declare function handleActions(reducerMap: Object, defaultState?: Object): Function;
}
