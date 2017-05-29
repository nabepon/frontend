const path = require('path');
const fs = require('fs');

const BUILD_ROOT = path.join(__dirname, '../build');
const SRC_ROOT = path.join(__dirname, '../src');
const ASSETS_DIR = 'assets';

const babelrc = JSON.parse(fs.readFileSync('.babelrc', 'utf8'));
const browsers = babelrc.presets.find(preset=>preset[0] === 'env')[1].targets.browsers;

module.exports = {
  context: SRC_ROOT,
  entry: './index.js',
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
};
