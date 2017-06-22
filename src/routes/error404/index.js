// @flow
import React, { Component } from 'react';

class Error extends Component {
  render() {
    return (
      <div>
        <br />
        <br />
        <h3>404</h3>
        <div>お探しのページは見つかりませんでした</div>
      </div>
    );
  }
}

export default () => ({
  component: Error,
  loader: () => Promise.resolve(),
});
