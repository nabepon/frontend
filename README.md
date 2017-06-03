# フロントエンド教育用

# 準備

## nodejsと作業ディレクトリ
* nodejsをインストールしておく
* windowsはnodist、macはnodebrewを使ってインストール推奨
* 作業用に適当なフォルダを作っておきます
* 作業用フォルダは以下 `~/work/` と表記します

## gitリポジトリの用意
Gitリポジトリを用意しておきましょう。  
GitHubかBitbucketのどちらかを使うのがオススメです。

## .gitignoreの追加
node_modulesディレクトリや、エディタの設定ファイル等をgit管理下から外しておきます。  
.gitignoreファイルを`~/work/.editorconfig`に追加しておきましょう。  
ファイルをコピーしてきて配置して構いません。  

# 開発環境構築

## package.json作成
nodejsのプロジェクト設定ファイルを作成していきます。  
以下を実行するとpackage.jsonが作られます。  

```
npm init -y
```

`npm init`で対話が始まるので、`-y` オプションで全てyesにしています。

## .editorconfig用意
改行コードやインデントのスペース数を設定できる便利設定ファイルです。  
http://qiita.com/naru0504/items/82f09881abaf3f4dc171  
`~/work/.editorconfig` をコピーで構わないので追加しておきましょう。  
また、使用しているエディタが.editorconfigを認識するよう設定しておいてください。  

## ESLintの追加
jsはエディタのサポートを受けづらい言語なので、lintツールを使ってサポートしてもらいます。
セミコロンの抜けチェックや、不要な改行などをチェックすることができます。

### eslintのインストール

```
npm install --save-dev eslint
```

インストールできたか確認のため、  
以下のコマンドでバージョンを確認してみます。  

```
node_modules/.bin/eslint -v
```

また、`--save-dev` オプションを付けてインストールしたことで、  
package.jsonに以下が追加されたことを確認しましょう  

```
  "devDependencies": {
    "eslint": "^3.19.0"
  }
```

devDependenciesは、開発用のみで使用するパッケージの一覧です。

### eslintのショートカットコマンド設定
eslintをコマンドで使えるように、  
package.jsonのscriptsに以下を追加します。  

```
    "lint": "eslint \"src/**/*.js\"",
    "lint-fix": "eslint \"src/**/*.js\" --fix",
```

追加すると以下のようになります。  

```
  "scripts": {
    "lint": "eslint \"src/**/*.js\"",
    "lint-fix": "eslint \"src/**/*.js\" --fix",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

これにより、今後は以下のコマンドでeslintを実行することができるようになります。  

```
npm run lint
npm run lint-fix
```

### eslintの設定ファイル作成
設定ファイルを作っていきます。  
以下のコマンドを実行します。  

```
node_modules/.bin/eslint --init
```

すると、以下のメッセージが表示されます。  

```
> Answer questions about your style
  Use a popular style guide 
  Inspect your JavaScript file(s) 
```

上下キーで`Use a popular style guide`を選択して、enterを押してください。  

```
  Answer questions about your style
> Use a popular style guide 
  Inspect your JavaScript file(s) 
```

`Which style guide do you want to follow? ` と聞かれるので  
`Airbnb` を選択してください。  

`Do you use React? ` と聞かれるので  
`y` を入力してenterを押してください。  

`What format do you want your config file to be in?`と聞かれるので  
`JavaScript` を選択してください。  

これでインストールが開始し、終わると以下のファイルが生成されます。  

```
~/work/.eslintrc.js
```

また、package.jsonのdevDependenciesに、  
eslintのプラグインが追加されているので、合わせて確認しておきましょう。  

### eslintの設定を拡張
eslintそのままだと、global変数やflowtypeに対応していないので、
よく使う設定を追記しておきます。

以下のコマンドでeslint用のflowtypeプラグインをインストールします。

```
npm install --save-dev babel-eslint eslint-plugin-flowtype
```

次に、`~/work/.eslintrc.js` を以下のようにします。

```
module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true,
    "mocha": true
  },
  "extends": [
    "airbnb",
    "plugin:flowtype/recommended"
  ],
  "globals": {
    "__DEVELOPMENT__": true
  },
  "plugins": [
    "react",
    "jsx-a11y",
    "import",
    "flowtype"
  ]
};
```

### エディタにeslintを設定
エディタごとに設定方法はことなりますので、調べて設定しておいてください。

## stylelint stylefmtの追加
cssも同じようにlintを設定していくます。  
stylelintだけでは自動修正できないので、eslintの--fix相当の機能にstylefmtを使います。  

### stylelint stylefmtと拡張のインストール

```
npm install --save-dev stylefmt stylelint stylelint-config-idiomatic-order stylelint-config-recess-order stylelint-config-standard stylelint-order
```

インストールできたか確認のため、  
以下のコマンドでバージョンを確認してみます。  

```
node_modules/.bin/stylelint -v
node_modules/.bin/stylefmt -v
```

また、`--save-dev` オプションを付けてインストールしたことで、  
package.jsonのstylelintにインストールしたpackageが追加されているか確認しておきましょう。  

### stylelint stylefmtのショートカットコマンド設定
stylelintをコマンドで使えるように、  
package.jsonのscriptsに以下を追加します。  

```
    "stylelint": "stylelint \"src/**/*.scss\"",
    "stylefmt": "stylefmt -r \"src/**/*.scss\"",
```

これにより、今後は以下のコマンドでstylelintを実行することができるようになります。  

```
npm run stylelint
npm run stylefmt
```

### stylelintの設定ファイル作成
設定ファイルを作っていきます。  
以下のコマンドを実行します。  

`~/work/stylelint.config.js` を作成し、以下の設定をしてください。

```
const idiomatic = require('stylelint-config-idiomatic-order');
const idiomaticRules = idiomatic.rules['order/properties-order'] || idiomatic.rules['declaration-block-properties-order'];
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order',
  ],
  plugins: [
    'stylelint-order',
  ],
  rules: {
    'order/properties-order': idiomaticRules,
  },
};
```

### エディタにstylelintを設定
エディタごとに設定方法はことなりますので、調べて設定しておいてください。

## webpackの設定
webpackはjsをビルドするためのツールです。  
これにより最新のjs構文を使うことができるようになります。  

### webpackのインストール
以下を実行し `webpack`, `webpack-dev-server` の2つをインストールします。

```
npm install --save-dev webpack webpack-dev-server
```

### 最小限のファイルを追加
`~/work/src` ディレクトリを作成し、その下に3つのファイルを追加してください


```
// index.js
import foo from './foo';
foo();
```

```
// foo.js
export default function foo() {
  document.querySelector('#app').innerHTML = 'Hello, World!';
}
```

```
// index.html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
</head>
<body>
<div id="app"></div>
<script src="/bundle.js"></script>
</body>
</html>
```

### webpackの基本設定
`~/work/webpack/dev.config.js` を作成し、以下の設定をしてください。

```
const path = require('path');
const fs = require('fs');

const BUILD_ROOT = path.join(__dirname, '../build');
const SRC_ROOT = path.join(__dirname, '../src');
const ASSETS_DIR = 'assets';

module.exports = {
  context: SRC_ROOT,
  entry: './index.js',
  output: {
    path: BUILD_ROOT,
    filename: 'bundle.js',
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

```

また、ビルド後のファイルは不要なので、  
`~/work/.gitignore` に以下を追記します。

```
build/
```

また、サーバを起動するためのコマンドとビルドするためのコマンドを  
package.jsonのscriptsに追加しておきます。

```
    "build": "webpack --config ./webpack/dev.config.js",
    "start": "webpack-dev-server --config ./webpack/dev.config.js",
```

できたら、試してみましょう。
以下を実行してください。

```
npm start
```

ブラウザで `http://localhost:9000/` を開いて、  
Hello, World!が表示されていれば成功です。  
これで開発用の簡易サーバが立ち上がりました。 
 
ctrl+cで終了します。  

次に、以下を実行してください。

```
npm run build
```

実行後に以下のファイルが生成されていれば成功です。

```
~/work/build/bundle.js
```

本番では、このビルド後のファイルを使用します。

## babelの設定
webpackでbabelを使い、ES2015以降のjs構文が使えるようにします。  
以下のコマンドを実行し、babelと、babelのpluginをインストールします。

```
npm install --save-dev babel babel-cli babel-loader babel-preset-env babel-preset-react babel-plugin-transform-object-rest-spread
```

また、polyfillもインストールします。
`--save-dev` ではなく `--save` であることに注意してください。

```
npm install --save babel-polyfill
```

`~/work/.babelrc` を新規作成します。

```
{
  "presets": [
    ["env", {
      "targets": {
        "browsers": [
          "last 2 versions",
          "ie >= 9",
          "safari >= 7",
          "iOS 8",
          "Android 4.1"
        ]
      }
    }],
    "react"
  ],
  "plugins": ["transform-object-rest-spread"]
}
```

次に、`~/work/webpack/dev.config.js` の `module.exports` の手前に以下を追記し

```
const babelrc = JSON.parse(fs.readFileSync('.babelrc', 'utf8'));
const browsers = babelrc.presets.find(preset=>preset[0] === 'env')[1].targets.browsers;
```

`module.exports` 内に以下を追記します。

```
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
```

追記できたら、試してみましょう。
`~/work/src/index.js` の1行目に以下を追記し、

```
import 'babel-polyfill';
```

`~/work/src/foo.js` の適当な場所に、以下を追記してください。

```
console.log('object spread', { ...{ foo: 0 } });
```

次に、以下を実行してビルドします。

```
npm run build
```

そして、`~/work/build/bundle.js` を開き、
追記したconsole.logを探してください。
以下のように変換されていれば成功です。

```
console.log('object spread', _extends({ foo: 0 }));
```

## Reactの設定

### Reactのインストール

以下のコマンドを実行し、Reactをインストールします。

```
npm install --save react react-dom
```

### Reactの基本ファイルを追加

`~/work/src/bar.js` を追加します。

```
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Bar extends Component {
  render() {
    return <div>Bar</div>;
  }
}

export default function app(){
  const app = document.querySelector('#app');
  ReactDOM.render(
    <Bar />,
    app,
  );
}
```

`~/work/src/index.js` に、以下の2行を追加します

```
import app from './bar';
```

```
app();
```

### Reactが追加できたか確認

以下のコマンドを実行してブラウザで `http://localhost:9000/` を開き、  
`Hello, World!` から `Bar` に表示が変わっていれば成功です。

```
npm start
```

## CSS Modulesの設定
CSS Modulesを使えるようにします。

### CSS Modulesのインストール

以下のコマンドを実行し、CSS Modulesに必要なものをインストールします。

```
npm install --save-dev webpack-isomorphic-tools node-sass extract-text-webpack-plugin style-loader css-loader sass-loader postcss-loader url-loader autoprefixer autoprefixer-loader file-loader
```

### CSSの基本ファイルを追加

`~/work/src/index.html` に、以下を追記します。

```
<link rel="stylesheet" href="/bundle.css">
```

`~/work/src/bar.scss` を追加します。

```
.bar {
  background-color: #d7d7d7;
}
```

`~/work/src/bar.js` に、以下を追記します。

```
import css from './bar.scss';
```

### webpackの設定を追加

また `~/work/src/bar.js` のdivにclassNameを追記します。

```
<div>Bar</div>;
↓
<div className={css.bar}>Bar</div>;
```

`~/work/webpack/dev.config.js` に以下を追記します。

```
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools')());
const ExtractTextPlugin = require('extract-text-webpack-plugin');
```

また、loadersに以下を追記します

```

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
```

modules.exportsにpluginsを追記します。

```
  plugins: [
    new ExtractTextPlugin('bundle.css'),
    webpackIsomorphicToolsPlugin.development(),
  ],
```

`~/work/src/webpack-isomorphic-tools.js` を追加します。 

```
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

module.exports = () => ({
  webpack_assets_file_path: '../temp/webpack/webpack-assets.json',
  webpack_stats_file_path: '../temp/webpack/webpack-stats.json',

  assets: {
    images: {
      extensions: [
        'jpeg',
        'jpg',
        'png',
        'gif',
      ],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser,
    },
    svg: {
      extension: 'svg',
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser,
    },
    style_modules: {
      extensions: ['scss'],
      filter(module, regex, options, log) {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.style_loader_filter(module, regex, options, log);
        }
        return regex.test(module.name);
      },
      path(module, options, log) {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.style_loader_path_extractor(module, options, log);
        }
        return module.name;
      },
      parser(module, options, log) {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.css_modules_loader_parser(module, options, log);
        }
        return module.source;
      },
    },
  },
});

```

### CSS Modulesの動作確認

CSS Modulesが使えているか確認します。
以下のコマンドを実行してブラウザで `http://localhost:9000/` を開き、 
Barの背景がグレーになっていれば成功です。

```
npm start
```
