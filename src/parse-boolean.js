/**
 * 解析布尔类型
 * @param {*} value
 * @returns {boolean}
 */
function parseBoolean(value) {
  if (typeof value === 'boolean') {
    return value;
  }
  if (typeof value === 'string') {
    if (value === 'true') {
      return true;
    }
    if (['false', '0', '-0', 'NaN', 'null', 'undefined'].includes(value)) {
      return false;
    }
    if (value.length === 0) {
      return false;
    }
  }
  return Boolean(value);
}

export {
  parseBoolean
}
