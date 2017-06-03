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
  ],
  "rules": {
    "no-underscore-dangle": "off",
    "react/prefer-stateless-function": "off",
    "react/jsx-filename-extension": "off",
    "import/no-extraneous-dependencies": ["error", {
      devDependencies: [
        "**/webpack/**",
        "**/test/**",
        "**/*.test.js",
      ],
    }],
  }
};