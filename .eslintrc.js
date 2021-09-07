module.exports = {
  'env': {
    'browser': true,
    'es2020': true
  },
  'extends': [
    'eslint:recommended'
  ],
  'parserOptions': {
    'ecmaVersion': 2020,
    'sourceType': 'module'
  },
  'plugins': [
    'react-hooks'
  ],
  'rules': {
    'camelcase': ['warn', {
      'properties': 'never',
      'ignoreDestructuring': true,
      'ignoreImports': true,
      'ignoreGlobals': true
    }],
    'object-curly-spacing': ['error', 'always', { 'objectsInObjects': true }],
    'key-spacing': ['error', { 'beforeColon': false }],
    'react-hooks/rules-of-hooks': 'warn',
    'react-hooks/exhaustive-deps': 'warn'
  }
}
