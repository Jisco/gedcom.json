import isEmpty from 'lodash/isEmpty.js';
import trim from 'lodash/trim.js';
import replace from 'lodash/replace.js';
import split from 'lodash/split.js';
import map from 'lodash/map.js';

import ConvertToDate from '../models/converter/ConvertToDate.js';
import ConvertToArray from '../models/converter/ConvertToArray.js';

import { ConvertDateStringToObject, ConvertTimeStringToObject } from '../parsing/parseDate.js';
import ConvertToTime from '../models/converter/ConvertToTime.js';

export function ManipulateValue(definition, line) {
  let value = trim(isEmpty(line.ReferenceId) ? line.Value : line.ReferenceId);
  let convertTo = definition.PropertyType ?? definition.ConvertTo;

  if (value.match(/^(@.*@)/)) {

    if (definition.ConvertTo instanceof ConvertToArray) {
      return ConvertStringToArray(definition.ConvertTo, value);
    }

    return value;
  }

  value = AddStartWith(definition.StartWith, value);

  if (definition.Replace) {
    let pattern = definition.Replace.Value;
    let replacement = definition.Replace.With;

    if (pattern && replacement) {
      value = replace(value, pattern, replacement);
    }
  }

  if (definition.StripHtml) {
    value = value.replace(/(<([^>]+)>)/gi, '');
  }

  if (!convertTo) {
    return value;
  }

  if (convertTo instanceof ConvertToDate) {
    return ConvertDateStringToObject(convertTo, value);
  }

  if (convertTo instanceof ConvertToTime) {
    return ConvertTimeStringToObject(value, definition.Property);
  }

  if (convertTo instanceof ConvertToArray) {
    return ConvertStringToArray(convertTo, value);
  }

  return value;
}

export function AddStartWith(startWith, value) {
  if (!startWith) {
    return value ?? '';
  }

  if (startWith === '\\n') {
    startWith = '\n';
  }

  if (!value) {
    return startWith;
  }

  return `${startWith}${value}`;
}

function ConvertStringToArray(convertOptions, value) {
  let arr = split(value, convertOptions.Delimiter);
  arr = map(arr, (x) => trim(x));

  return arr;
}
