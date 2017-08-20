// @flow
import React from 'react';
import PushLink from '../../modules/react-pushlink/PushLink';

export default function SampleLinks() {
  return (
    <div>
      <ul>
        <li><PushLink to="/">todo(client)</PushLink></li>
        <li><PushLink to="/?server=true">todo(server)</PushLink></li>
      </ul>
    </div>
  );
}
