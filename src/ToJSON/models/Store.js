import dropRight from 'lodash/dropRight.js';
import split from 'lodash/split.js';
import map from 'lodash/map.js';
import flattenDeep from 'lodash/flattenDeep.js';
import remove from 'lodash/remove.js';
import find from 'lodash/find.js';
import isEqual from 'lodash/isEqual.js';

import objectPath from '@gedcom-poc/object-path';
import fclone from 'fclone';

import TagDefinition from './TagDefinition.js';
import ParsedLine from './ParsedLine.js';
import ConvertToTime from './converter/ConvertToTime.js';
import ParsingObject from './ParsingObject.js';
import ParsingPath from './ParsingPath.js';

import { CreateResult } from '../processing/result.js';
import { IsEmpty } from '../../common.js';
import { AddStartWith, ManipulateValue } from '../processing/manipulateValues.js';
import DefinitionCache from './DefinitionCache.js';

export default class Store {
  constructor() {
    this.objects = [];
    this.path = [];
    this.isParsing = false;
    this.stopParsingTillLevel = undefined;
  }

  definitionCache = [];

  AddDefinitionToCache(path, definition) {
    this.definitionCache.push(new DefinitionCache(path, definition));
  }

  GetDefinitionFromCache(path) {
    return find(this.definitionCache, (x) => isEqual(path, x.Path));
  }

  AddTempPath() {
    this.path.push(new ParsingPath('TEMP', ''));
  }

  StartParsing(definition, line) {
    this.isParsing = true;
    this.path.push(new ParsingPath(definition.Tag, definition.Path));

    // concat path and remove empty values
    let path = flattenDeep(map(fclone(this.path), (x) => split(x.Path, '.')));
    remove(path, (x) => IsEmpty(x));

    let obj = new ParsingObject(definition, line, path);

    // if no value is set, but the value should start with a specific value -> set the value and remove the property
    if (!(line.ReferenceId || line.Value)) {
      line.Value = AddStartWith(definition.StartWith, line.Value);
      definition.StartWith = undefined;
    }

    if (definition.Property && (line.ReferenceId || line.Value)) {
      if (definition.CollectAs) {
        objectPath.set(obj.Object, definition.Property, ManipulateValue(definition, line));
      } else {
        obj.Object = ManipulateValue(definition, line);
      }
    } else {
      // time has no own property, but must be merged with the last date
      if (definition.ConvertTo instanceof ConvertToTime) {
        ManipulateValue(definition, line);
      }
    }

    this.objects.push(obj);
  }

  IsParsing() {
    return this.isParsing;
  }

  DropRightPath(number) {
    if (!number) {
      this.path = dropRight(this.path, number);
      return;
    }

    this.path = dropRight(this.path, this.path.length - number);
  }

  GetPath() {
    return this.path;
  }

  CreateResultObject() {
    return CreateResult(this.objects);
  }

  StopParsingUntilLevel(level) {
    this.stopParsingTillLevel = level;
  }

  ShouldParseLine(level) {
    if (!this.stopParsingTillLevel) {
      return true;
    }

    if (level <= this.stopParsingTillLevel) {
      this.stopParsingTillLevel = 0;
      return true;
    }

    return false;
  }

  Reset() {
    this.isParsing = false;
    this.path = [];
    this.stopParsingTillLevel = undefined;
    this.definitionCache = [];
  }

  FullReset() {
    this.Reset();
    this.objects = [];
    this.definitionCache = [];
  }
}
