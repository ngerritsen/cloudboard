'use strict';

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  globals: {
    Modernizr: true
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true
  },
  rules: {
    semi: 2,
    'react/jsx-no-target-blank': 0
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true
    }
  }
};
