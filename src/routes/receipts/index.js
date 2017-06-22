// @flow
import React, { Component } from 'react';
import SampleLinks from '../../components/SampleLinks';

class Receipts extends Component {
  render() {
    return (
      <div>
        <SampleLinks />
        <h3>Receipts</h3>
      </div>
    );
  }
}

export default () => ({
  component: Receipts,
  loader: () => Promise.resolve(),
});
