// @flow
import off from 'dom-helpers/events/off';
import on from 'dom-helpers/events/on';
import scrollLeft from 'dom-helpers/query/scrollLeft';
import scrollTop from 'dom-helpers/query/scrollTop';

import { createKey } from './createKey';

import {
  setHistoryAction,
  setHistoryKey,
  getHistoryKey,
} from './history';

import {
  getItem,
  setItem,
} from './storage';

/**
 * 遷移直前 or 直後にcall
 * keyを作成してhistory.stateに保存する
 * オプションでstateに保存する情報を追加できる
 * reload等の初回表示時には {action: ''} を渡してPOP情報を消す
 */
export function saveScroll() {
  const key = getHistoryKey() || createKey();
  setItem(key, [scrollLeft(window), scrollTop(window)]);
  setHistoryKey(key);
}

/**
 * 復元タイミングでcall
 * history.state.keyでsessionStorageから位置情報を復元する
 */
export function updateScroll() {
  const scroll = getItem(getHistoryKey());
  scrollLeft(window, scroll[0]);
  scrollTop(window, scroll[1]);
}

/**
 * 初回表示タイミングでcall
 * popstateイベントでPOPで遷移したきたことを判定するための情報をhistoryに保存
 * scrollイベントで位置をsessionStorageに保存
 */
export function listenIdentifyScroll() {
  const saveAction = () => setHistoryAction('POP');
  on(window, 'popstate', saveAction, false);

  const saveScroll = () => setItem(getHistoryKey(), [scrollLeft(window), scrollTop(window)]);
  on(window, 'scroll', saveScroll, false);

  return () => {
    off(window, 'popstate', saveAction, false);
    off(window, 'scroll', saveScroll, false);
  };
}
