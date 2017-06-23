// @flow
import React, { Component } from 'react';

export default class PushLink extends Component {
  handleClick = (e: MouseEvent) => {
    const { to, onClick } = this.props;

    if (onClick) {
      onClick(e);
    }

    if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey || e.button !== 0 || e.defaultPrevented === true) {
      return;
    }

    e.preventDefault();
    window.history.pushState({ ...window.history.state, turbolinks: false, action: 'PUSH' }, '', to);
    window.document.dispatchEvent(new CustomEvent('updateRender'));
  };

  render() {
    const { to, children, ...props } = this.props;
    return <a href={to} {...props} onClick={this.handleClick}>{children}</a>;
  }
}
