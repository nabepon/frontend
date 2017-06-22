const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const BUILD_ROOT = path.join(__dirname, '../build');
const SRC_ROOT = path.join(__dirname, '../src');
const ASSETS_DIR = 'assets';

const babelrc = JSON.parse(fs.readFileSync('.babelrc', 'utf8'));
const browsers = babelrc.presets.find(preset=>preset[0] === 'env')[1].targets.browsers;

const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools')());
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: SRC_ROOT,
  entry: './app/client.js',
  output: {
    path: BUILD_ROOT,
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: [
          /node_modules/,
        ],
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 2,
                sourceMap: true,
                localIdentName: '[local]___[hash:base64:5]',
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: [
                  require('autoprefixer')({ browsers: browsers }),
                ],
              },
            },
            {
              loader: 'sass-loader',
              options: {
                outputStyle: 'expanded',
                sourceMap: true,
              },
            },
          ],
        }),
      },
      {
        test: /\.svg$/,
        loader: 'url-loader',
        options: {
          name: `./${ASSETS_DIR}/[name]-[hash].[ext]`,
          limit: 10000,
          mimetype: 'image/svg+xml',
        },
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        loader: 'url-loader',
        options: {
          name: `./${ASSETS_DIR}/[name]-[hash].[ext]`,
          limit: 10240,
        },
      },
    ],
  },
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
    new ExtractTextPlugin('bundle.css'),
    webpackIsomorphicToolsPlugin.development(),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: true,
    }),
  ],
};
