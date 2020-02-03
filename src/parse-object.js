import {
  SafeJson,
  isNil,
  isString,
  evaluate
} from './utils';

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

export {
  parseObject
}
