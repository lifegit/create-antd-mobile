module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  rules: {
    '@typescript-eslint/no-use-before-define': 'off',
    'no-console': 'off',
  },
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
  },
};
