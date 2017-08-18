// @flow
import React from 'react';
import PushLink from '../../modules/react-pushlink/PushLink';

export default function SampleLinks() {
  return (
    <div>
      <h2>PushLink</h2>
      <ul>
        <li><PushLink to="/">sample(top)</PushLink></li>
        <li><PushLink to="/sample">sample(error handling)</PushLink></li>
        <li><PushLink to="/404">404</PushLink></li>
      </ul>
    </div>
  );
}
