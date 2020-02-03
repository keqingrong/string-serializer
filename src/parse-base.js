import {
  SafeJson,
  isString,
  evaluate
} from './utils';

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

export {
  parseBase
}
