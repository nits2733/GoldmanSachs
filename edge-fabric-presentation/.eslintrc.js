module.exports = {
  env: {
    es6: true,
    jest: true,
    browser: true,
  },
  extends: [
    "react-app",
    "react-app/jest",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    __DEV__: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react-hooks"],
  rules: {
    /* React */
    "react/jsx-filename-extension": ["warn", { extensions: [".js", ".jsx"] }],
    "react/jsx-props-no-spreading": "off",
    "react/jsx-one-expression-per-line": "off",

    /* Imports */
    "import/prefer-default-export": "off",

    /* General */
    "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "no-param-reassign": "off",
    "no-underscore-dangle": "off",
    "no-console": "off",
    "global-require": "off",

    /* Hooks */
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
};
