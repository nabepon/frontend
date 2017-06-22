// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import RedBox from 'redbox-react';
import createRoot from './createRoot';
import { updateScroll, getHistoryKey, getHistoryAction } from '../modules/restore-scroll';
import { handleError } from '../utils/error';
import type { Store } from '../types';

/**
 * renderClient
 * ブラウザのためのレンダリング処理を担う
 */
export default async function renderClient(
  store: Store,
  element: HTMLElement,
) {
  window.document.dispatchEvent(new CustomEvent('renderBefore'));
  const historyKey = getHistoryKey();
  const history = { ...window.history, action: getHistoryAction() };
  const url = window.location.href;
  const { loaders, root } = await createRoot(store, url, history);

  return Promise.all(
    // mapで逐次レンダリング実行
    loaders.map(loader => (
      loader.then(() => {
        if (historyKey === getHistoryKey()) {
          ReactDOM.render(root, element);
        }
      }).catch((e) => {
        e.type = 'RENDER_ERROR';
        return Promise.reject(e);
      })
    )),
  ).then(() => {
    // 全てのレンダリング終了後の処理
    if (historyKey !== getHistoryKey()) {
      return undefined;
    }

    updateScroll();
    window.document.dispatchEvent(new CustomEvent('renderFinish'));
  }).catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);

    if (historyKey !== getHistoryKey()) {
      return undefined;
    }

    // レンダリングエラー対応
    if (e.type === 'RENDER_ERROR') {
      if (__DEVELOPMENT__) {
        ReactDOM.render(<RedBox error={e} />, element);
      }
      window.document.dispatchEvent(new CustomEvent('renderFinish'));
      return undefined;
    }

    return handleError(e);
  });
}
