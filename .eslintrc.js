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
  settings: {
    "import/resolver": {
      "babel-plugin-root-import": {}
    }
  },
  plugins: [
    'react'
  ],
  rules: {
    'no-console': 0,
    'class-methods-use-this': 0,
    'import/prefer-default-export': 0,
    'import/no-named-as-default': 0,
    'import/no-extraneous-dependencies': 0,
    'react/jsx-uses-vars': 2,
    'react/jsx-uses-react': 2,
    'func-names': 0,
    'prefer-arrow-callback': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0
  }
}
