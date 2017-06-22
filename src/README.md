# ディレクトリ構成

```js
/
├── flow-typed //flowのdeclare設定を入れる。
│   └── manual //flow-typedからコピーしてきたものを配置。
├── src
│   ├── app // アプリ全体を構築するファイル。
│   ├── components // React単体で完結するコンポーネントを配置。
│   ├── containers // ReactとReduxをconnectするコンポーネントを配置。
│   ├── middlewares // アプリ独自のmiddlewareを配置。
│   │   └── index.js // store作成時に読み込むmiddlewareをまとめたもの。
│   ├── modules // アプリから独立性の高いmoduleを配置。
│   ├── reducers // reducer, actionCreator, constants を配置。
│   │   └── index.js // store作成時に読み込むreducerをまとめたもの。
│   ├── routes // ページのrootコンポーネントを配置。stateの初期化を行う。
│   │   └── index.js // 各rootコンポーネントをまとめたコンポーネント。
│   ├── types // components、containers、middlewares、reducersで使うtypeファイルを配置。
│   ├── utils // 各ディレクトリを跨いで使用するutilを配置。
│   └── index.js // アプリのentryファイル
└── webpack // webpack関連のファイルを配置

```
