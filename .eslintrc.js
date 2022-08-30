/**
 * @Author: Pacific_D
 * @Date: 2022-08-30 17:22:57
 * @LastEditTime: 2022-08-30 17:43:55
 * @LastEditors: Pacific_D
 * @Description: 
 * @FilePath: \todo\.eslintrc.js
 */
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    "prettier/prettier": 0,
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    "semi": [
      2,
      "never"
    ], // 行末分号
    "quotes": [
      2,
      "double"
    ], //双引号
    "object-curly-spacing": 0, // 对象元素开始或结尾的对象的花括号中有空格
    "comma-dangle": [
      2,
      "never"
    ], //对象字面量项尾不能有逗号(always-multiline是有逗号)
    "space-before-function-paren": [
      0,
      "always"
    ], // 强制在 function的左括号之前使用一致的空格
    // 禁止出现未使用过的表达式
    "no-unused-expressions": [
      0,
      {
        "allowShortCircuit": true,
        "allowTernary": true
      }
    ],
    "func-names": 0, // 强制使用命名的 function 表达式
    "prefer-const": 0, // 要求使用 const 声明那些声明后不再被修改的变量
    "no-extend-native": 2, // 禁止扩展原生类型
    "no-continue": 0, // 禁用 continue 语句
    "global-require": 1, // 要求 require() 出现在顶层模块作用域中
    "camelcase": 2, //强制驼峰法命名
  },
};
