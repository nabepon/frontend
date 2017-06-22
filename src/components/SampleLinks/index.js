// @flow
import React from 'react';
import PushLink from '../../modules/react-pushlink/PushLink';

export default function SampleLinks() {
  return (
    <div>
      <h2>PushLink</h2>
      <ul>
        <li><PushLink to="/quotes">quotes</PushLink></li>
        <li><PushLink to="/deliveries">deliveries</PushLink></li>
        <li><PushLink to="/billings">billings</PushLink></li>
        <li><PushLink to="/receipts">receipts</PushLink></li>
        <li><PushLink to="/404">404</PushLink></li>
      </ul>
    </div>
  );
}
