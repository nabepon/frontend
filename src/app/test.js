import hook from 'css-modules-require-hook';
import sass from 'node-sass';
import { JSDOM } from 'jsdom';
import { ScrollStorage } from '../modules/restore-scroll';

const { window } = new JSDOM('<!doctype html><html><body id="app"></body></html>');
global.window = window;
global.document = window.document;
global.navigator = { userAgent: 'node.js' };

global.__DEVELOPMENT__ = false;
global.__TEST__ = true;

hook({
  extensions: ['.scss'],
  preprocessCss: data => sass.renderSync({ data }).css,
});

global.__scrollStorage = new ScrollStorage();
