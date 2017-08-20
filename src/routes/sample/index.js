import React, { Component } from 'react';
import { connect } from 'react-redux';
import SampleLinks from '../../components/SampleLinks';
import TodoApp from '../../components/TodoApp';
import * as ClientActions from '../../reducers/todoClient';
import * as ServerActions from '../../reducers/todoServer';
import type { LoaderProps } from '../../types/routes';

function isServer() {
  return location.search.includes('server=true');
}

function loader({ store }: LoaderProps) {
  return Promise.resolve(
    store.dispatch(isServer() ? ServerActions.init() : ClientActions.init()),
  );
}

const connector = connect(
  state => ({
    todo: isServer() ? state.todoServer : state.todoClient,
  }),
  dispatch => {
    const Actions = isServer() ? ServerActions : ClientActions;
    return {
      actions: {
        addTodo: (...args) => dispatch(Actions.addTodo(...args)),
        toggleTodo: (...args) => dispatch(Actions.toggleTodo(...args)),
      },
    }
  },
);

class Index extends Component {
  render() {
    return (
      <div>
        <SampleLinks />
        <TodoApp {...this.props} />
      </div>
    );
  }
}

export default () => ({
  component: connector(Index),
  loader,
});
