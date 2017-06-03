import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import css from './bar.scss';

class Bar extends Component {
  render() {
    return <div className={css.bar}>Bar</div>;
  }
}

export default function app() {
  const dest = document.querySelector('#app');
  ReactDOM.render(
    <Bar />,
    dest,
  );
}
