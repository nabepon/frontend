// @flow
import cloneDeep from 'lodash/cloneDeep';

export type IdentifyHistoryState = {
  identifyHistory: {
    key: string,
    action: string,
  }
}

function createInitialState(): IdentifyHistoryState {
  return {
    identifyHistory: {
      key: '',
      action: '',
    },
  };
}

export function getHistoryState(): IdentifyHistoryState {
  // See https://github.com/ReactTraining/history/pull/289
  try {
    const state = window.history.state;
    return state && state.identifyHistory ? cloneDeep(state) : createInitialState();
  } catch (e) {
    return createInitialState();
  }
}

export function margeWindowHistoryState(option: Object) {
  const currentState = getHistoryState();
  const state = {
    ...currentState,
    identifyHistory: {
      ...currentState.identifyHistory,
      ...option,
    },
  };
  window.history.replaceState(state, '', window.location.href);
}

export function getHistoryKey() {
  return getHistoryState().identifyHistory.key;
}

export function getHistoryAction() {
  return getHistoryState().identifyHistory.action;
}

export function setHistoryKey(key: string) {
  margeWindowHistoryState({ key });
}

export function setHistoryAction(action: string) {
  margeWindowHistoryState({ action });
}
