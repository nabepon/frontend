import 'babel-polyfill';
import hook from 'css-modules-require-hook';
import sass from 'node-sass';
import { JSDOM } from 'jsdom';
import path from 'path';

// mochaでscssを読み込むための設定
hook({
  extensions: ['.scss'],
  generateScopedName: '[name]__[local]___[hash:base64:5]',
  preprocessCss: (css, filepath) => sass.renderSync({
    data: css,
    includePaths: [path.resolve(filepath, '..')],
  }).css,
});
const { window } = new JSDOM('<!doctype html><html><body id="app"></body></html>', {
  url: 'https://example.org',
  contentType: 'text/html',
});
global.window = window;
global.document = window.document;
global.navigator = { userAgent: 'node.js' };
global.__DEVELOPMENT__ = false;
global.__TEST__ = true;

const { ScrollStorage } = require('../modules/identify-history-and-scroll');

global.__scrollStorage = new ScrollStorage();
