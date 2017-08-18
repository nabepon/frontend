// @flow
import React, { Component } from 'react';

export default class PushLink extends Component {
  handleClick = (e: MouseEvent) => {
    const { to, onClick } = this.props;

    if (onClick) {
      onClick(e);
    }

    // metaKey: command or windowsキー
    // button: 0 左クリック、1 真ん中クリック、2 右クリック
    // defaultPrevented: preventDefaultがすでに呼ばれたかどうか
    if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey || e.button !== 0 || e.defaultPrevented === true) {
      return;
    }

    e.preventDefault();
    window.history.pushState({}, '', to);
    window.document.dispatchEvent(new window.CustomEvent('pushLinkClick'));
  };

  render() {
    const { to, children, ...props } = this.props;
    return <a href={to} {...props} onClick={this.handleClick}>{children}</a>;
  }
}
