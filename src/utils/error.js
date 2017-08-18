// @flow
export const ERROR = 'error/';
export const ERROR_404 = `${ERROR}ERROR_404`;

export type HandleError = Error & {
  type: string;
  data: Object;
}

export function isError(e: HandleError) {
  return e && e.type && e.type.startsWith(ERROR);
}

export function redirect(url: string) {
  window.history.replaceState(window.history.state, '', url);
  window.document.dispatchEvent(new window.CustomEvent('pushLinkClick'));
}

export function handleError(e: HandleError) {
  if (e.type === ERROR_404) {
    redirect(e.data.url);
  }
}

export function createError404(msg: any = 'Not Found'): HandleError {
  const e: Object = new Error(msg);
  e.type = ERROR_404;
  e.data = { url: '/404' };
  return e;
}
