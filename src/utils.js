/* 判断值是否是 null 或 undefined */
const isNil = value => value === null || typeof value === 'undefined';
/* 判断值是否是字符串 */
const isString = value => typeof value === 'string';

/**
 * JSON 序列化
 */
const SafeJson = Object.freeze({
  /**
   * 解析 JSON 字符串，解析失败返回 null
   * @param {string} text
   * @param {Function} [reviver]
   * @returns {*}
   */
  parse: function parse(text, reviver) {
    try {
      return JSON.parse(text, reviver);
    } catch (e) {
      return null;
    }
  },
  /**
   * 序列化 JS 对象，序列化失败返回空字符串 ''
   * @param {*} value
   * @param {Function} [replacer]
   * @param {number} [space]
   * @returns {string}
   */
  stringify: function stringify(value, replacer, space) {
    try {
      return JSON.stringify(value, replacer, space);
    } catch (e) {
      return '';
    }
  }
});

/**
 * 对字符串求值，求值失败返回 null
 * @param {string} str
 * @return {*}
 */
function evaluate(str) {
  try {
    return Function(`"use strict";return (${str})`)();
  } catch (e) {
    return null;
  }
}

export {
  SafeJson,
  evaluate,
  isNil,
  isString
};
