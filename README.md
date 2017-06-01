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
