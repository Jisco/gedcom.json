import { IsEmpty, IsNumber, ToNumber } from '../../common.js';
import split from 'lodash/split.js';
import trim from 'lodash/trim.js';
/**
 * Parses the line level
 *
 * @param line - The line text
 * @returns The level
 */
export function GetLineLevel(line) {
  if (line[0] === '0') {
    return 0;
  }

  if (IsNumber(line[1])) {
    return ToNumber(`${line[0]}${line[1]}`);
  }

  return ToNumber(line[0]);
}

/**
 * Parses the reference id
 *
 * @param refOrTag - The tag or reference id
 * @returns The reference id or undefined
 */
export function GetReferenceId(refOrTag) {
  if (IsEmpty(refOrTag)) {
    return undefined;
  }

  var lineSplit = split(refOrTag, '@');

  if (lineSplit.length != 3) {
    return undefined;
  }

  return trim(refOrTag);
}
