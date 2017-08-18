const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const BUILD_ROOT = path.join(__dirname, '../build');
const SRC_ROOT = path.join(__dirname, '../src');
const ASSETS_DIR = 'assets';

const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools')());
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const sharedConfig = require('./shared.config');

module.exports = Object.assign(sharedConfig, {
  devServer: {
    contentBase: BUILD_ROOT,
    watchContentBase: true,
    compress: true,
    port: 9000,
    setup(app) {
      app.get('*', (req, res, next) => {
        const url = req.originalUrl;
        if (url.startsWith(`/${ASSETS_DIR}/`) || url.endsWith('.css') || url.endsWith('.js') || url.endsWith('.json')) {
          next();
          return;
        }
        fs.readFile(path.join(SRC_ROOT, '/index.html'), 'utf8', (err, data) => {
          if (err) throw err;
          res.status(200).send(data);
        });
      });
    },
  },
  plugins: [
    webpackIsomorphicToolsPlugin.development(),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: true,
    }),
  ].concat(sharedConfig.plugins),
});
