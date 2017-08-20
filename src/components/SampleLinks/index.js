// @flow
import React from 'react';
import PushLink from '../../modules/react-pushlink/PushLink';

export default function SampleLinks() {
  return (
    <div>
      <ul>
        <li><PushLink to="/">sample(top)</PushLink></li>
        <li><PushLink to="/?server=true">todo(server)</PushLink></li>
        <li><PushLink to="/404">404</PushLink></li>
      </ul>
    </div>
  );
}
