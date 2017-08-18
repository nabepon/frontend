// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SampleLinks from '../../components/SampleLinks';
import Counter from '../../containers/Counter';
import { init as initCounter } from '../../reducers/counter';
import { reflect, init as initSample } from '../../reducers/sample';
import type { LoaderProps, Match } from '../../types/routes';
import { createError404 } from '../../utils/error';

function loader({ store, history }: LoaderProps, match: ?Match) {
  const dispatch = store.dispatch;
  console.log('sample loadProps'); // eslint-disable-line no-console
  if (history.action === 'POP' && store.getState().sample.loaded) {
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
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (match) {
          console.log({ match }); // eslint-disable-line no-console
          dispatch(reflect({ foo: 'Sample' }));
          reject(createError404());
        } else {
          dispatch(reflect({ foo: 'Sample' }));
          resolve();
        }
      }, 800);
    }),
  ];
}

const connector = connect(
  state => ({
    sample: state.sample,
  }),
);

class Sample extends Component {
  render() {
    return (
      <div>
        <SampleLinks />
        <h3>Sample Page</h3>
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

export default (match: ?Match) => ({
  component: connector(Sample),
  loader: (loaderProps: LoaderProps) => loader(loaderProps, match),
});
