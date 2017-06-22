// @flow
export type InitAction = { type: 'myApp/billings/INIT', payload: any };
export type LoadCompleteAction = { type: 'myApp/billings/LOAD_COMPLETE', payload: any };

export type BillingsAction =
  | InitAction
  | LoadCompleteAction
  ;

export type BillingsState = {
  +count: number,
}
