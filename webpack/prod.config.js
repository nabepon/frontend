const webpack = require('webpack');

const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools')());
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const sharedConfig = require('./shared.config');

module.exports = Object.assign(sharedConfig, {
  plugins: [
    webpackIsomorphicToolsPlugin,
    new webpack.DefinePlugin({
      __DEVELOPMENT__: false,
    }),
    new webpack.optimize.UglifyJsPlugin(),
  ].concat(sharedConfig.plugins),
});
