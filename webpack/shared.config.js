const path = require('path');
const fs = require('fs');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const HappyPack = require('happypack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

const BUILD_ROOT = path.join(__dirname, '../build');
const SRC_ROOT = path.join(__dirname, '../src');
const ASSETS_DIR = 'assets';

const babelrc = JSON.parse(fs.readFileSync('.babelrc', 'utf8'));
const browsers = babelrc.presets.find(preset=>preset[0] === 'env')[1].targets.browsers;

const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools')());
const happyThreadPool = HappyPack.ThreadPool({size: 3});

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
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'happypack/loader',
        query: {
          plugins: ['lodash'],
          id: 'js',
        },
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
  plugins: [
    new ExtractTextPlugin('bundle.css'),
    new LodashModuleReplacementPlugin,
    new HappyPack({
      id: 'js',
      threadPool: happyThreadPool,
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true, // HappyPackとcacheDirectoryを併用すると遅くなるかもしれない
          },
        },
      ],
    }),
  ],
};
