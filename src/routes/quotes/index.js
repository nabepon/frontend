// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SampleLinks from '../../components/SampleLinks';
import Counter from '../../containers/Counter';
import { init as initCounter } from '../../reducers/counter';
import { reflect, init as initSample } from '../../reducers/sample';
import type { Store } from '../../types';

function loader(store: Store, history: Object) {
  const dispatch = store.dispatch;
  // eslint-disable-next-line no-console
  console.log('Quotes loadProps');
  if (history.action === 'POP') {
    return Promise.resolve();
  }
  return [
    new Promise((resolve) => {
      setTimeout(() => {
        dispatch([
          initCounter(),
          initSample(),
        ]);
        resolve();
      }, 400);
    }),
    new Promise((resolve) => {
      setTimeout(() => {
        dispatch(reflect({ foo: 'Quotes' }));
        resolve();
      }, 800);
    }),
  ];
}

const connector = connect(
  state => ({
    sample: state.sample,
    syncTurbolinks: state.syncTurbolinks,
  }),
);

class Quotes extends Component {
  render() {
    return (
      <div>
        <SampleLinks />
        <h3>Quotes</h3>
        <Counter />
        <pre>
          {!this.props.sample.loaded
            ? <div>loading</div>
            : JSON.stringify(this.props.sample, null, '  ')
          }
        </pre>
      </div>
    );
  }
}

export default () => ({
  component: connector(Quotes),
  loader,
});
