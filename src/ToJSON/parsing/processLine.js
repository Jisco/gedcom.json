import find from 'lodash/find.js';
import map from 'lodash/map.js';
import filter from 'lodash/filter.js';
import isEqual from 'lodash/isEqual.js';
import drop from 'lodash/drop.js';

import fclone from 'fclone';

import ParsedLine from '../models/ParsedLine.js';
import Store from '../models/Store.js';
import TagDefinition from '../models/TagDefinition.js';
import LineParsingResult from '../models/LineParsingResult.js';
import ParsingPath from '../models/ParsingPath.js';

import { ClearDateTimeMergingInfos } from './parseDate.js';

import lodash from 'lodash-es';
import deepdash from 'deepdash-es';

const dd = deepdash(lodash);

let parsingOptions;

/**
 * Store for file\text processing
 * @internal
 */
let store = new Store();

/**
 * Resets all variables, which are used for parsing
 */
export function ResetProcessing() {
  store.Reset();
  parsingOptions = {};
}

export function SetParsingOptions(options) {
  parsingOptions = options;
}

export function GetResult() {
  let result = store.CreateResultObject();
  store.FullReset();
  return result;
}

export function EndProcessing() {
  store.Reset();
  ClearDateTimeMergingInfos();
}

export function ProcessLine(line, lastLevel) {
  if (!line || !line.Tag) {
    return new LineParsingResult(false, 'No line or no line tag found');
  }

  if (line.Level === 0) {
    let process = ProcessStartLevel(line);
    return new LineParsingResult(process, process ? undefined : 'No tag definition found');
  }

  if (!store.IsParsing()) {
    return new LineParsingResult(false, 'Parent has no parsing definition');
  }

  if (!store.ShouldParseLine(line.Level)) {
    return new LineParsingResult(false, 'Parent has no parsing definition, so all children will be ignored');
  }

  AdjustPath(line, lastLevel);

  let definition = GetLocalDefinition(line.Tag);

  if (!definition) {
    definition = GetTagDefinition(line.Tag);
  }

  if (!definition) {
    store.StopParsingUntilLevel(line.Level);

    // add temporaray path, that will be removed later
    store.AddTempPath();
    return new LineParsingResult(false, 'No tag definition found');
  }

  store.StartParsing(definition, line);

  return new LineParsingResult(true);
}

function GetLocalDefinition(tag) {
  let path = fclone(store.GetPath());

  /* istanbul ignore next */ // should never happen
  if (path.length === 0) {
    return undefined;
  }

  let definition = SearchDefinitionDeep(parsingOptions.Definition, path, tag);

  if (!definition) {
    return undefined;
  }

  return new TagDefinition(definition);
}

export function SearchDefinitionDeep(properties, searchpath, searchedTag) {
  // search path
  let specificPath = map(searchpath, (x) => x.Tag);
  specificPath.push(searchedTag);

  let cachedValue = store.GetDefinitionFromCache(specificPath);

  if (cachedValue) {
    return cachedValue.Definition;
  }

  // search all tag definitions
  let tagDefinitions = [];
  dd.eachDeep(properties, (val, key, parent, context) => {
    if (key === 'Tag' && val === searchedTag) {
      tagDefinitions.push({
        Definition: parent,
        Path: filter(
          map(context.parents, (x) => x.value.Tag),
          (x) => x !== undefined
        )
      });
    }
  });

  // explicit local path
  let pathStartWithsTag;

  // drop first tag until found -> last is global definition
  while (!pathStartWithsTag && specificPath.length > 0) {
    pathStartWithsTag = find(tagDefinitions, (y) => isEqual(y.Path, specificPath));

    if (!pathStartWithsTag) {
      specificPath = drop(specificPath);
    }
  }

  if (pathStartWithsTag?.Definition) {
    let foundPath = map(searchpath, (x) => x.Tag);
    foundPath.push(searchedTag);
    store.AddDefinitionToCache(foundPath, pathStartWithsTag.Definition);
  }

  return pathStartWithsTag?.Definition;
}

function AdjustPath(line, lastLevel) {
  if (line.Level > lastLevel) {
    return;
  }

  if (line.Level === lastLevel) {
    store.DropRightPath();
    return;
  }

  store.DropRightPath(line.Level);
  ClearDateTimeMergingInfos();
}

function GetTagDefinition(tag) {
  let definition = find(parsingOptions.Definition, (x) => x.Tag === tag);

  if (!definition) {
    return undefined;
  }

  return new TagDefinition(definition);
}

export function ProcessStartLevel(line) {
  if (line.Tag === 'TRLR') {
    return true;
  }

  EndProcessing();
  let definition = GetTagDefinition(line.Tag);

  if (!definition) {
    return false;
  }

  store.StartParsing(definition, line);
  ClearDateTimeMergingInfos();

  return true;
}
