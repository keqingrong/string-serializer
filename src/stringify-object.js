import {
  SafeJson,
} from './utils';
import { parseObject } from './parse-object';

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

export {
  stringifyObject
}
