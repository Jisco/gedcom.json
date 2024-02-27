import isNumber from 'lodash/isNumber.js';
import toNumber from 'lodash/toNumber.js';
import isEmpty from 'lodash/isEmpty.js';
import isNaN from 'lodash/isNaN.js';

/**
 * Test if an string can be parsed as an number
 * @param str the string
 */
export function IsNumber(str) {
  if (IsEmpty(str) || str === ' ') {
    return false;
  }

  let number = toNumber(str);

  if (isNaN(number)) {
    return false;
  }

  return isNumber(number);
}

/**
 * Converts a string to an number
 * @param str the string
 */
export function ToNumber(str) {
  return toNumber(str);
}

/**
 * Tests if an string is empty
 * @param str the string
 */
export function IsEmpty(str) {
  return isEmpty(str);
}
