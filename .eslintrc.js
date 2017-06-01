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