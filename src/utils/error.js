export function redirect(url) {
  window.history.replaceState(window.history.state, '', url);
  window.document.dispatchEvent(new CustomEvent('updateRender'));
}

export function handleError(e) {
  if (e.type === 'ERROR_404') {
    redirect(e.data.url);
  }
}

export function createError404(msg = 'Not Found') {
  const e = new Error(msg);
  e.type = 'ERROR_404';
  e.data = { url: '/404' };
  return e;
}
