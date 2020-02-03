/*!
 * string-serializer v1.0.0
 * Copyright (c) 2020-present Qingrong Ke <keqingrong@outlook.com> (https://keqingrong.github.io/)
 * Released under the MIT License.
 */
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

/**
 * 将字符串解析为其他值
 * @param {string} value
 * @returns {*}
 */
function parseBase(value) {
  if (!isString(value)) {
    return value;
  }

  const trimmedValue = value.trim();
  // JSON 解析、求值失败返回 null，此次提前处理 null
  if (trimmedValue === 'null') {
    return null;
  }

  // 作为 JSON 解析，如 '{"a":1}'
  const parsedValue = SafeJson.parse(trimmedValue);
  if (parsedValue !== null) {
    return parsedValue;
  }

  // 作为 JS 字符串求值，如 '{a:1}'
  const evaluatedValue = evaluate(trimmedValue);
  if (evaluatedValue !== null) {
    return evaluatedValue;
  }

  // 直接返回原字符串，如 'a'
  return value;
}

/**
 * 解析数组
 * @param {*} value
 * @returns {(Array|null)}
 */
function parseArray(value) {
  // []
  // [1,2,3]
  if (Array.isArray(value)) {
    return value;
  }

  // null, undefined
  if (isNil(value)) {
    return value;
  }

  if (isString(value)) {
    const trimmedValue = value.trim();
    // '', '   '
    if (trimmedValue.length === 0) {
      return null;
    }

    if (trimmedValue.length >= 2) {
      if (trimmedValue.charAt(0) === '['
        && trimmedValue.charAt(trimmedValue.length - 1) === ']'
      ) {
        // '[]' -> []
        // '[  ]' -> []
        // '[1,2,3]' -> [1,2,3]
        // '["a","b","c"]' -> ["a","b","c"]
        // '["1","2","3"]' -> ["1","2","3"]
        // '[{"a":1},{"a":2}]' -> [{a:1},{a:2}]
        // 非法 JSON，使用 eval 处理
        // "['1','2','3']" -> ["1","2","3"]
        // '[{a:1},{a:2}]' -> [{a:1},{a:2}]
        const parsedValue = parseBase(trimmedValue);
        if (Array.isArray(parsedValue)) {
          return parsedValue;
        }
        // '[a,b,c]' -> ["a","b","c"]
        if (trimmedValue.includes(',')) {
          const slicedValue = trimmedValue.slice(1, trimmedValue.length - 1);
          return slicedValue.split(',').map(str => parseBase(str));
        }
        // '[a]'
        const slicedValue = trimmedValue.slice(1, trimmedValue.length - 1);
        return [slicedValue];
      } else if (trimmedValue.includes(',')) {
        // '1,' -> [1, ""]
        // '1,2,3' -> [1,2,3]
        // '"1","2","3"' -> ["1","2","3"]
        // "'1','2','3'" -> ["1","2","3"]
        // 'a,b,c' -> ["a","b","c"]
        // '{a:1},{a:2}' -> [{a:1},{a:2}]
        return trimmedValue.split(',').map(str => parseBase(str));
      }
    }
  }

  // false -> [false]
  // 0 -> [0]
  // '1' -> ["1"]
  // '[' -> ["["]
  return [value];
}

/**
 * 解析对象字面量
 * @param {*} value
 * @returns {(Object|null)}
 */
function parseObject(value) {
  // null, undefined
  if (isNil(value)) {
    return value;
  }

  if (isString(value)) {
    const trimmedValue = value.trim();
    if (trimmedValue.length >= 2) {
      if (trimmedValue.charAt(0) === '{'
        && trimmedValue.charAt(trimmedValue.length - 1) === '}'
      ) {
        // '{}' -> {}
        // '{"a": 1}' -> {a:1}
        // '{'a': 1}' -> {a:1}
        return (SafeJson.parse(trimmedValue) || evaluate(trimmedValue) || null);
      }
    }

    return null;
  }

  return value;
}

/**
 * 序列化数组，undefined, null, '' 都转换为空字符串（未定义），而不是 '[]'
 * @param {Array} value
 * @returns {*}
 */
function stringifyArray(value) {
  const arr = parseArray(value);
  if (arr) {
    return SafeJson.stringify(arr) || '';
  }
  return '';
}

/**
 * 序列化对象，undefined, null, '' 都转换为空字符串（未定义），而不是 '{}'
 * @param {Object} value
 * @returns {*}
 */
function stringifyObject(value) {
  const obj = parseObject(value);
  if (obj) {
    return SafeJson.stringify(obj) || '';
  }
  return '';
}

export { parseArray, parseObject, stringifyArray, stringifyObject };
