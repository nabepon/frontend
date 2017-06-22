// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import {
  increment,
  decrement,
} from '../../reducers/counter';
import Counter from './Counter';

import type { Dispatch, State } from '../../types';

export type CounterProps = {
  counter: Object,
  actions: {
    increment: Dispatch,
    decrement: Dispatch,
  }
};

const mapStateToProps = (state: State) => ({
  counter: state.counter,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    increment: () => dispatch(increment()),
    decrement: () => dispatch(decrement()),
  },
});

class CounterContainer extends Component {
  props: CounterProps;

  render() {
    const {
      actions: {
        increment,
        decrement,
      },
      counter: {
        count,
      },
    } = this.props;

    return (
      <div>
        <Counter
          onIncrement={increment}
          onDecrement={decrement}
          count={count}
        />
      </div>
    );
  }
}

const connector: Connector<{}, CounterProps> = connect(mapStateToProps, mapDispatchToProps);
export default connector(CounterContainer);
