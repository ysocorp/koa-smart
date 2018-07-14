module.exports = {
  env: {
    mocha: true,
    node: true,
    protractor: true,
    es6: true,
  },
  extends: ['eslint:recommended'],
  parser: 'babel-eslint',
  rules: {
    'max-len': [
      'error',
      {
        code: 110,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    indent: ['error', 2],
    quotes: ['error', 'single'],
    'comma-dangle': ['error', 'always-multiline'],
  },
};
