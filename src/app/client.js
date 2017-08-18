// @flow
import 'babel-polyfill';
import 'custom-event-polyfill';
import App from './App';
import {
  listenIdentifyScroll,
  saveScroll,
  setHistoryAction,
} from '../modules/identify-history-and-scroll';

/** app作成 */
if (!window.__APP__) {
  window.__APP__ = {};
}
const app = new App();
window.__APP__.app = app;

/** scroll復元のためevent処理 */
listenIdentifyScroll();

/** Reactのレンダリング */
const updateRender = () => {
  // scroll用のkeyを作成&復元
  saveScroll();

  // appとdocumentの紐付け
  const container = window.document.querySelector('#app');
  if (container) {
    container.innerHTML = '';
    container.appendChild(app.element);
    app.render();
  } else {
    app.empty();
  }
};
window.addEventListener('popstate', updateRender, false);
window.document.addEventListener('pushLinkClick', () => {
  setHistoryAction('PUSH');
  updateRender();
}, false);
window.addEventListener('DOMContentLoaded', updateRender, false);
