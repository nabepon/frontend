import off from 'dom-helpers/events/off';
import on from 'dom-helpers/events/on';
import scrollLeft from 'dom-helpers/query/scrollLeft';
import scrollTop from 'dom-helpers/query/scrollTop';

// private
function getStorage() {
  return typeof window === 'object' && window.sessionStorage || global && global.__scrollStorage || new ScrollStorage();
}

function getItem(key) {
  const historyStateStr = getStorage().getItem(`RestoreScroll_${key}`);
  return historyStateStr ? JSON.parse(historyStateStr) : [0, 0];
}

function setItem(key, val) {
  getStorage().setItem(`RestoreScroll_${key}`, JSON.stringify(val));
}

function getHistoryState() {
  // See https://github.com/ReactTraining/history/pull/289
  try {
    return window.history.state || {};
  } catch (e) {
    return {};
  }
}

function createKey() {
  return getHistoryKey() || Math.random().toString(36).substr(2, 6);
}


// public

export function getHistoryKey() {
  return getHistoryState().key;
}

export function getHistoryAction() {
  return getHistoryState().action || '';
}

// for test
export class ScrollStorage {
  constructor() {
    this.state = '';
  }
  getItem(key) {
    return this.state[key];
  }
  setItem(key, val) {
    if (typeof val === 'string') {
      this.state[key] = val;
    }
  }
  reset() {
    this.state = '';
  }
}

// 遷移直前 or 直後にcall
export function replaceHistoryState(option = {}) {
  const key = createKey();
  setItem(key, [scrollLeft(window), scrollTop(window)]);
  const state = { ...getHistoryState(), key, ...option };
  window.history.replaceState(state, '', window.location.href);
}

// 復元タイミングでcall
export function updateScroll() {
  const scroll = getItem(getHistoryKey());
  scrollLeft(window, scroll[0]);
  scrollTop(window, scroll[1]);
}

// 初回表示タイミングでcall
export function listenRestoreScroll() {
  const saveAction = () => replaceHistoryState({ action: 'POP' });
  on(window, 'popstate', saveAction, false);

  const saveScroll = () => setItem(getHistoryKey(), [scrollLeft(window), scrollTop(window)]);
  on(window, 'scroll', saveScroll, false);

  return () => {
    off(window, 'popstate', saveAction, false);
    off(window, 'scroll', saveScroll, false);
  };
}
