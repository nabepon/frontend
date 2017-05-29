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
