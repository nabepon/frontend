import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Bar extends Component {
  render() {
    return <div>Bar</div>;
  }
}

export default function app(){
  const app = document.querySelector('#app');
  ReactDOM.render(
    <Bar />,
    app,
  );
}
