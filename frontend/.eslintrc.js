module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: [
    '@typescript-eslint',
    'react',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    jsx: true,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 2,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/interface-name-prefix': [2, 'always'],
    'no-console': 0,
    'eqeqeq': 2,
    'no-return-await': 2,
    'require-await': 2,
    'react/jsx-uses-react': 1,
    'react/jsx-no-undef': 2,
    'react/jsx-wrap-multilines': 2,
    'react/no-string-refs': 0,
  },
};
