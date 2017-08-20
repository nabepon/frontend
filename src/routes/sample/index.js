import React, { Component } from 'react';
import { connect } from 'react-redux';
import SampleLinks from '../../components/SampleLinks';
import TodoApp from './TodoApp';
import * as Actions from '../../reducers/todo';
import { init } from '../../reducers/todo';
import type { LoaderProps } from '../../types/routes';

function loader({ store }: LoaderProps) {
  return Promise.resolve(
    store.dispatch(init()),
  );
}

const connector = connect(
  state => ({
    todo: state.todo,
  }),
  dispatch => ({
    actions: {
      addTodo: (...args) => dispatch(Actions.addTodo(...args)),
      toggleTodo: (...args) => dispatch(Actions.toggleTodo(...args)),
    },
  }),
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
