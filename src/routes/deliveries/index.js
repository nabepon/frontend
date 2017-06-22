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
  console.log('Deliveries loadProps');
  if (history.action === 'POP') {
    return Promise.resolve();
  }
  return [
    new Promise((resolve) => {
      dispatch([
        initCounter(),
        initSample(),
      ]);
      setTimeout(() => {
        dispatch(reflect({ foo: 'Deliveries' }));
        resolve();
      }, 2500);
    }),
  ];
}

const connector = connect(
  state => ({
    sample: state.sample,
    syncTurbolinks: state.syncTurbolinks,
  }),
);

class Deliveries extends Component {
  render() {
    return (
      <div>
        <SampleLinks />
        <h3>Deliveries</h3>
        <SampleLinks />
        <h3>Deliveries</h3>
        <SampleLinks />
        <h3>Deliveries</h3>
        <SampleLinks />
        <h3>Deliveries</h3>
        <SampleLinks />
        <h3>Deliveries</h3>
        <SampleLinks />
        <h3>Deliveries</h3>
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
  component: connector(Deliveries),
  loader,
});
