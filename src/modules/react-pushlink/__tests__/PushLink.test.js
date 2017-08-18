
// @flow
/* eslint-disable func-names */
import React from 'react';
import { describe, it, beforeEach, afterEach } from 'mocha';
import { mount } from 'enzyme';
import assert from 'power-assert';
import sinon from 'sinon';
import PushLink from '../PushLink';

describe('src/modules/react-pushlink/PushLink.js', () => {
  beforeEach(function () {
    this.restoreList = [];
  });

  afterEach(function () {
    this.restoreList.forEach(item => item.restore());
  });


  it('クリック -> pushStateする', function () {
    const historySpy = sinon.spy();
    const historyStub = sinon.stub(window.history, 'pushState').callsFake(historySpy);
    const dispatchSpy = sinon.spy(window.document, 'dispatchEvent');
    this.restoreList.push(historyStub, dispatchSpy);
    const wrapper = mount(<div><PushLink to="/foo" /></div>);

    // click
    wrapper.find('a').simulate('click', { button: 0 });

    // assert
    assert(historySpy.calledWith({}, '', '/foo'));
    assert(dispatchSpy.getCall(0).args[0].type === 'pushLinkClick');
  });

  it('onClick有り -> onClickを呼び、pushStateする', function () {
    const clickSpy = sinon.spy();
    const historySpy = sinon.spy();
    const historyStub = sinon.stub(window.history, 'pushState').callsFake(historySpy);
    const dispatchSpy = sinon.spy(window.document, 'dispatchEvent');
    this.restoreList.push(historyStub, dispatchSpy);
    const wrapper = mount(<div><PushLink to="/foo" onClick={clickSpy} /></div>);

    // click
    wrapper.find('a').simulate('click', { button: 0 });

    // assert
    assert(clickSpy.calledOnce);
    assert(historySpy.calledWith({}, '', '/foo'));
    assert(dispatchSpy.getCall(0).args[0].type === 'pushLinkClick');
  });

  it('onClickでpreventDefault -> pushStateしない', function () {
    const historySpy = sinon.spy(window.history, 'pushState');
    const dispatchSpy = sinon.spy(window.document, 'dispatchEvent');
    const clickSpy = sinon.spy({ click: e => e.preventDefault() }, 'click');
    this.restoreList.push(historySpy, dispatchSpy);
    const wrapper = mount(<div><PushLink to="/foo" onClick={clickSpy} /></div>);

    // click
    wrapper.find('a').simulate('click', { button: 0 });

    // assert
    assert(clickSpy.calledOnce);
    assert(historySpy.notCalled);
    assert(dispatchSpy.notCalled);
  });

  it('特殊なクリック -> pushStateしない', function () {
    [
      { metaKey: true },
      { altKey: true },
      { ctrlKey: true },
      { shiftKey: true },
      { button: 1 },
      { button: 2 },
      { defaultPrevented: true },
    ].forEach((event) => {
      const historySpy = sinon.spy(window.history, 'pushState');
      const dispatchSpy = sinon.spy(window.document, 'dispatchEvent');
      this.restoreList.push(historySpy, dispatchSpy);
      const wrapper = mount(<div><PushLink to="/foo" /></div>);

      // click
      wrapper.find('a').simulate('click', event);

      // assert
      assert(historySpy.notCalled);
      assert(dispatchSpy.notCalled);

      // eachしているのでここでrestore
      historySpy.restore();
      dispatchSpy.restore();
    });
  });
});
