// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import RedBox from 'redbox-react';
import createRootComponent from './createRootComponent';
import { updateScroll, getHistoryKey, getHistoryAction } from '../modules/identify-history-and-scroll';
import { isError, handleError } from '../utils/error';
import type { Store } from '../types';

/**
 * renderForClient
 * ブラウザのためのレンダリング処理を担う
 */
export default async function renderForClient(
  store: Store,
  element: HTMLElement,
) {
  window.document.dispatchEvent(new window.CustomEvent('renderBefore'));
  const historyKey = getHistoryKey();
  const history = { ...window.history, action: getHistoryAction() };
  const url = window.location.href;
  const { loaders, root } = await createRootComponent({ store, url, history });

  return Promise.all(
    // mapで逐次レンダリング実行
    loaders.map(loader => (
      loader.then(() => {
        if (historyKey === getHistoryKey()) {
          ReactDOM.render(root, element);
        }
      }).catch((e) => {
        if (isError(e)) {
          return Promise.reject(e);
        }
        e.type = 'RENDER_ERROR';
        return Promise.reject(e);
      })
    )),
  ).then(() => {
    // 全てのレンダリング終了後の処理
    if (historyKey !== getHistoryKey()) {
      return;
    }

    updateScroll();
    window.document.dispatchEvent(new window.CustomEvent('renderAfter'));
  }).catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);

    if (historyKey !== getHistoryKey()) {
      return;
    }

    // レンダリングエラー対応
    if (e.type === 'RENDER_ERROR') {
      if (__DEVELOPMENT__) {
        ReactDOM.render(<RedBox error={e} />, element);
      }
      window.document.dispatchEvent(new window.CustomEvent('renderAfter'));
      return;
    }

    return handleError(e);
  });
}
