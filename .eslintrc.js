module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  extends: 'airbnb-base',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: [
    'react'
  ],
  rules: {
    'no-console': 0,
    'import/prefer-default-export': 0,
    'class-methods-use-this': 0,
    'react/jsx-uses-vars': 2,
    'react/jsx-uses-react': 2,
    'func-names': 0,
    'prefer-arrow-callback': 0,
  }
}
