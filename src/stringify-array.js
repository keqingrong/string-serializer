import {
  SafeJson,
} from './utils';
import { parseArray } from './parse-array';

/**
 * 序列化数组，undefined, null, '' 都转换为空字符串（未定义），而不是 '[]'
 * @param {*} value
 * @returns {string}
 */
function stringifyArray(value) {
  const arr = parseArray(value);
  if (arr) {
    return SafeJson.stringify(arr) || '';
  }
  return '';
}

export {
  stringifyArray
}
