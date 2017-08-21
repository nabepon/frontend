// @flow
import React, { Component } from 'react';
import Todo from './Todo';
import type { TodoServerState } from '../../types/todoServer';
import type { TodoClientState } from '../../types/todoClient';

export type TodoAppProps = {
  todo: TodoServerState | TodoClientState,
  actions: {
    addTodo: Function,
    toggleTodo: Function,
  },
}

export default class TodoApp extends Component {
  props: TodoAppProps;
  input: HTMLInputElement;

  handleAddTodo = (e: SyntheticInputEvent) => {
    e.preventDefault();
    this.props.actions.addTodo(this.input.value);
    this.input.value = '';
  };

  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.handleAddTodo} >
            <input type="text" ref={(input) => { this.input = input; }} />
            <input type="submit" value={'追加'} onClick={this.handleAddTodo} />
          </form>
        </div>
        <div>
          {this.props.todo.todos.sort((a, b) => b.createTime - a.createTime).map(todo => (
            <Todo
              key={todo.id}
              toggleTodo={this.props.actions.toggleTodo}
              {...todo}
            />
          ))}
        </div>
      </div>
    );
  }
}
