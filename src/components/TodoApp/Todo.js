import React, { Component } from 'react';

export default class Todo extends Component {
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
