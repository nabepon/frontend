// @flow

/**
 * スクロールイベントでhistory.stateに保存すると重いため、
 * スクロール毎の位置保存にはsessionStorageを利用する。
 */

export function getStorage() {
  return typeof window === 'object' && window.sessionStorage || global && global.__scrollStorage;
}

export function getItem(key: string) {
  const historyStateStr = getStorage().getItem(`identifyScroll_${key}`);
  return historyStateStr ? JSON.parse(historyStateStr) : [0, 0];
}

export function setItem(key: string, val: Array<number>) {
  getStorage().setItem(`identifyScroll_${key}`, JSON.stringify(val));
}

/**
 * test用
 * JSDOMにはsessionStorage等がないのでstorageを代替する
 */
export class ScrollStorage {
  state: { [string | number]: string };

  constructor() {
    this.state = {};
  }
  getItem(key: string) {
    return this.state[key];
  }
  setItem(key: string, val: string) {
    if (typeof val === 'string') {
      this.state[key] = val;
    }
  }
  reset() {
    this.state = {};
  }
}
