// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import SampleLinks from '../../components/SampleLinks';
import TodoApp from '../../components/TodoApp';
import * as ClientActions from '../../reducers/todoClient';
import * as ServerActions from '../../reducers/todoServer';
import type {Dispatch, State} from '../../types';
import type { LoaderProps } from '../../types/routes';
import type { TodoAppProps } from '../../components/TodoApp';

function isServer() {
  return location.search.includes('server=true');
}

function loader({ store }: LoaderProps) {
  return Promise.resolve(
    store.dispatch(isServer() ? ServerActions.init() : ClientActions.init()),
  );
}

const connector: Connector<{}, TodoAppProps> = connect(
  (state: State) => ({
    todo: isServer() ? state.todoServer : state.todoClient,
  }),
  (dispatch: Dispatch) => {
    const Actions = isServer() ? ServerActions : ClientActions;
    return {
      actions: {
        addTodo: (...args) => dispatch(Actions.addTodo(...args)),
        toggleTodo: (...args) => dispatch(Actions.toggleTodo(...args)),
      },
    };
  },
);

class Index extends Component {
  props: TodoAppProps;

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
