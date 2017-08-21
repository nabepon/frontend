// @flow
export type InitAction = { type: 'myApp/todoClient/INIT' };
export type AddTodoAction = { type: 'myApp/todoClient/ADD_TODO' };
export type ToggleTodoAction = { type: 'myApp/todoClient/TOGGLE_TODO' };

export type TodoClientAction =
  | InitAction
  | AddTodoAction
  | ToggleTodoAction
  ;

export type TodoClientState = {
  +todos: Array<{
    value: string,
    createTime: number,
    id: string,
    status: boolean,
  }>,
}
