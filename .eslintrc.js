// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: ['plugin:vue/essential', 'airbnb-base'],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  rules: {
    // don't require .vue extension when importing
    'object-shorthand': 0,
    'comma-dangle': 0,
    'arrow-parens': 0,
    'func-names': 0,
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never'
    }],
    'space-before-function-paren': ['off', 'error'],
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex state
        'acc', // for reduce accumulators
        'e' // for e.returnvalue
      ]
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js']
    }],
    "no-underscore-dangle": [
      "error",
      {
        "allow": ["_d", "_date"]
      }
    ],
    'no-param-reassign': 'off', // 允许修改函数引用类型入参
    'no-plusplus': 'off', // 允许 ++
    'class-methods-use-this': 'off',
    'no-restricted-syntax': [ // 覆盖掉对 for-in 和 for-of 的限制
      'error',
      'LabeledStatement',
      'WithStatement',
    ],
    "no-shadow": [
      "error",
      {
        "allow": ["state"]
      }
    ],
    'import/extensions': ['off', 'never'],
    'no-console': 0,
    'no-debugger': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'no-use-before-define': 0,
    'no-useless-escape': 0,
    'no-undef': 0,
    'no-prototype-builtins': 0,
    'no-lonely-if': 0,
    'no-extend-native': 0,
    'consistent-return': 0,
    'no-useless-return': 0,
    'max-len': 0,
    'prefer-const': 0,
    'linebreak-style': ["off", "windows"],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
