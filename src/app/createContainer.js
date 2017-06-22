// @flow
import css from './app.scss';

export default function createContainer(): HTMLElement {
  const element = window.document.createElement('div');
  element.id = 'jsApp';
  element.classList.add(css.app);
  return element;
}
