// @flow
export type InitAction = { type: 'myApp/todoServer/INIT' };
export type UpdateTodoAction = { type: 'myApp/todoServer/UPDATE_TODO' };

export type TodoServerAction =
  | InitAction
  | UpdateTodoAction
  ;

export type TodoServerState = {
  +todos: Array<{
    value: string,
    createTime: number,
    id: string,
    status: boolean,
  }>,
}
