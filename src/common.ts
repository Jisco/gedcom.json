import isNumber from 'lodash/isNumber';
import toNumber from 'lodash/toNumber';
import isEmpty from 'lodash/isEmpty';
import isNaN from 'lodash/isNaN';

/**
 * Test if an string can be parsed as an number
 * @param str the string
 */
export function IsNumber(str: string) : Boolean {
    if (IsEmpty(str) || str === ' '){
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
export function ToNumber(str: string) : number {
    return toNumber(str);
}

/**
 * Tests if an string is empty
 * @param str the string
 */
export function IsEmpty(str: string) : Boolean {
    return isEmpty(str);
}