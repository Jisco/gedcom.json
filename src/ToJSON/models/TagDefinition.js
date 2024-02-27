import isObject from 'lodash/isObject.js';

import ConvertTo from './converter/ConvertTo.js';
import ConvertToArray from './converter/ConvertToArray.js';
import ConvertToDate from './converter/ConvertToDate.js';
import ConvertToString from './converter/ConvertToString.js';
import ConvertToTime from './converter/ConvertToTime.js';

export default class TagDefinition {
  constructor(plainJsObject) {
    this.CollectAs = plainJsObject.CollectAs;
    this.Tag = plainJsObject.Tag;
    this.MergeWithLast = plainJsObject.MergeWithLast?.toString();
    this.MergeWithNext = plainJsObject.MergeWithNext;
    this.Type = plainJsObject.Type;
    this.IsSingleValue = plainJsObject.IsSingleValue;
    this.CollectAsArray = plainJsObject.CollectAsArray === true;
    this.StartWith = plainJsObject.StartWith;

    if (isObject(plainJsObject.Property)) {
      let propertyWithOption = new PropertyWithOption(plainJsObject.Property);
      this.Property = propertyWithOption.Name;
      this.PropertyType = propertyWithOption.Type;
    } else {
      this.Property = plainJsObject.Property;
    }

    if (plainJsObject.Replace) {
      this.Replace = new ReplaceValue(plainJsObject.Replace.Value, plainJsObject.Replace.With);
    }

    if (plainJsObject.StripHtml) {
      this.StripHtml = plainJsObject.StripHtml;
    }

    this.ConvertTo = CreateConvertTo(plainJsObject.Type, plainJsObject.ConvertTo);
  }

  CollectAs;
  StartWith;
  CollectAsArray;
  Property;
  Tag = '';
  MergeWithLast;
  Replace;
  StripHtml;
  ConvertTo;
  Type;
  MergeWithNext;
  IsSingleValue;
  PropertyType;

  get Path() {
    return this.CollectAs ?? this.Property ?? '';
  }
}

class ReplaceValue {
  constructor(value, withProperty) {
    this.Value = value;
    this.With = withProperty;
  }

  Value;
  With;
}

class PropertyWithOption {
  constructor(property) {
    this.Name = property.Name;

    if (property.Type) {
      this.Type = CreateConvertTo(property.Type);
      return;
    }

    this.Type = CreateConvertTo(undefined, property.ConvertTo);
  }

  Name;
  Type;
}

function CreateConvertTo(type, convertTo) {
  let setConvertToDate = () => {
    return new ConvertToDate(
      convertTo?.About,
      convertTo?.Calculated,
      convertTo?.Estimated,
      convertTo?.Before,
      convertTo?.After,
      convertTo?.Between,
      convertTo?.And,
      convertTo?.Interpreted,
      convertTo?.From,
      convertTo?.To,
      convertTo?.Value,
      convertTo?.HasMonth,
      convertTo?.HasYear,
      convertTo?.HasDay,
      convertTo?.Original,
      convertTo?.Calendar
    );
  };

  let setConvertToString = () => {
    return new ConvertToString(convertTo?.NewLineCharacter, convertTo?.NewLineIfEmpty);
  };

  let setConvertToArray = () => {
    return new ConvertToArray(convertTo?.Delimiter);
  };

  let setConvertToTime = () => {
    return new ConvertToTime();
  };

  if (type) {
    switch (type) {
      case 'Date':
        return setConvertToDate();
      case 'String':
        return setConvertToString();
      case 'Array':
        return setConvertToArray();
      case 'Time':
        return setConvertToTime();
    }
  }

  if (convertTo) {
    switch (convertTo.Type) {
      case 'String':
        return setConvertToString();
      case 'Date':
        return setConvertToDate();
      case 'Array':
        return setConvertToArray();
      case 'Time':
        return setConvertToTime();
    }
  }

  return;
}
