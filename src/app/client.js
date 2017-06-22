// @flow
import 'babel-polyfill';
import createApp from './createApp';
import { listenRestoreScroll, replaceHistoryState } from '../modules/restore-scroll/index';

/** app作成 */
if (!window.__APP__) {
  window.__APP__ = {};
}
const app = createApp();
window.__APP__.app = app;

/** scroll復元のためevent処理 */
listenRestoreScroll();

/** Reactのレンダリング */
const updateRender = () => {
  // scroll用のkeyを作成&復元
  replaceHistoryState(app.firstHistoryState);
  app.firstHistoryState = null;

  // appとdocumentの紐付け
  const container = window.document.querySelector('#app');
  if (container) {
    container.innerHTML = '';
    container.appendChild(app.element);
  }

  app.render();
};
window.addEventListener('popstate', updateRender, false);
window.document.addEventListener('updateRender', updateRender, false);
window.addEventListener('DOMContentLoaded', updateRender, false);
