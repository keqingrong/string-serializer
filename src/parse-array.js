import {
  isNil,
  isString,
} from './utils';
import { parseBase } from './parse-base';

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

export {
  parseArray
}
