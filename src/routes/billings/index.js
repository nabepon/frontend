// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SampleLinks from '../../components/SampleLinks';
import Counter from '../../containers/Counter';
import { init as initCounter } from '../../reducers/counter';
import { loadComplete, init as initBillings } from '../../reducers/billings';
import { reflect, init as initSample } from '../../reducers/sample';
import { createError404 } from '../../utils/error';
import type { Store } from '../../types';

function loader(store: Store, history: Object) {
  const dispatch = store.dispatch;
  // eslint-disable-next-line no-console
  console.log('Billings loadProps');
  if (history.action === 'POP' && store.getState().billings.loaded) {
    return Promise.resolve();
  }
  return [
    new Promise((resolve, reject) => {
      dispatch([
        initBillings(),
        initCounter(),
        initSample(),
      ]);
      const isReject = Math.random() < 0.5;
      // eslint-disable-next-line no-console
      console.log('isReject', isReject);
      setTimeout(() => {
        if (isReject) {
          dispatch(reflect({ foo: 'Billings' }));
          reject(createError404());
        } else {
          dispatch(loadComplete({ foo: 'Billings' }));
          dispatch(reflect({ foo: 'Billings' }));
          resolve();
        }
      }, 2500);
    }),
  ];
}

const connector = connect(
  state => ({
    sample: state.sample,
    syncTurbolinks: state.syncTurbolinks,
    billings: state.billings,
  }),
);

class Billings extends Component {
  render() {
    return (
      <div>
        <SampleLinks />
        <h3>Billings</h3>
        <SampleLinks />
        <h3>Billings</h3>
        <SampleLinks />
        <h3>Billings</h3>
        <SampleLinks />
        <h3>Billings</h3>
        <SampleLinks />
        <h3>Billings</h3>
        <SampleLinks />
        <h3>Billings</h3>
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
  component: connector(Billings),
  loader,
});
