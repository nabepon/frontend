import React, { Component } from 'react';

class Todo extends Component {
  render() {
    return (
      <div>
        <span>{this.props.value}</span>
        <input
          type="checkbox"
          checked={this.props.status}
          onChange={() => this.props.toggleTodo(this.props.id)}
        />
      </div>
    );
  }
}

export default class TodoApp extends Component {
  handleAddTodo = (e) => {
    e.preventDefault();
    this.props.actions.addTodo(this.input.value);
    this.input.value = '';
  };

  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.handleAddTodo} >
            <input type="text" ref={input => this.input = input} />
            <input type="submit" value={"追加"} onClick={this.handleAddTodo} />
          </form>
        </div>
        <div>
          {this.props.todo.todos.sort((a, b) => b.createTime - a.createTime).map((todo) => (
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
