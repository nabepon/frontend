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
    "arrow-body-style": "off",
    "react/prefer-stateless-function": "off",
    "react/jsx-filename-extension": "off",
    "import/no-extraneous-dependencies": ["error", {
      devDependencies: [
        "**/webpack/**",
        "**/test/**",
        "**/*.test.js",
        "**/*-test.js",
        "**/test.js",
      ],
    }],
    "import/prefer-default-export": "off",
    "consistent-return": "off",
    "react/no-unused-prop-types": "off",
    "no-shadow": "off",
    "react/prop-types": "off",
    "max-len": "off",
    "no-mixed-operators": "off",
    "no-use-before-define": "off",
  }
};