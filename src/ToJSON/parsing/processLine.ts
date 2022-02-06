import find from 'lodash/find';
import map from 'lodash/map';
import filter from 'lodash/filter';
import isEqual from 'lodash/isEqual';
import drop from 'lodash/drop';

import fclone from 'fclone';

import ParsedLine from "../models/ParsedLine";
import Store from '../models/Store';
import TagDefinition from '../models/TagDefinition';
import LineParsingResult from '../models/LineParsingResult';
import ParsingPath from '../models/ParsingPath';

import { ClearDateTimeMergingInfos } from './parseDate';

const eachDeep = require('deepdash/eachDeep');
let parsingOptions: any;

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

export function SetParsingOptions(options: any) {
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

export function ProcessLine(line: ParsedLine, lastLevel: number) : LineParsingResult {
    if (!line || !line.Tag) {
        return new LineParsingResult(false, "No line or no line tag found");
    }

    if (line.Level === 0) {
        let process = ProcessStartLevel(line);
        return new LineParsingResult(process, process ? undefined : "No tag definition found");
    }

    if (!store.IsParsing()) {
        return new LineParsingResult(false, "Parent has no parsing definition");
    }

    if (!store.ShouldParseLine(line.Level)) {
        return new LineParsingResult(false, "Parent has no parsing definition, so all children will be ignored");
    }

    AdjustPath(line, lastLevel);

    let definition = GetLocalDefinition(line.Tag)

    if (!definition) {
        definition = GetTagDefinition(line.Tag);
    }

    if (!definition) {
        store.StopParsingUntilLevel(line.Level);

        // add temporaray path, that will be removed later
        store.AddTempPath();
        return new LineParsingResult(false, "No tag definition found");
    }

    store.StartParsing(definition, line);
    
    return new LineParsingResult(true);
}

function GetLocalDefinition(tag: string): TagDefinition | undefined {
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

export function SearchDefinitionDeep(properties: any[], searchpath: ParsingPath[], searchedTag: string): any {
    // search path
    let specificPath = map(searchpath, x => x.Tag);
    specificPath.push(searchedTag);

    let cachedValue = store.GetDefinitionFromCache(specificPath);

    if (cachedValue) {
        return cachedValue.Definition;
    }

    // search all tag definitions
    let tagDefinitions: any[] = [];
    eachDeep(properties, (val:any, key:string, parent:any, context:any) => {
        if (key === "Tag" && val === searchedTag) {
             tagDefinitions.push({
                Definition: parent,
                Path: filter(map(context.parents, x => x.value.Tag), x => x !== undefined)
            });
        }
    });

    // explicit local path
    let pathStartWithsTag;

    // drop first tag until found -> last is global definition
    while(!pathStartWithsTag && specificPath.length > 0) {
        pathStartWithsTag = find(tagDefinitions, y => isEqual(y.Path, specificPath));

        if (!pathStartWithsTag) {
            specificPath = drop(specificPath);
        }
    }

    if (pathStartWithsTag?.Definition) {
        let foundPath = map(searchpath, x => x.Tag);
        foundPath.push(searchedTag);
        store.AddDefinitionToCache(foundPath, pathStartWithsTag.Definition);
    }

    return pathStartWithsTag?.Definition;
}

function AdjustPath(line: ParsedLine, lastLevel: number) {
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

function GetTagDefinition(tag: string): TagDefinition | undefined {
    let definition = find(parsingOptions.Definition, x => x.Tag === tag);

    if (!definition) {
        return undefined;
    }

    return new TagDefinition(definition);
}

export function ProcessStartLevel(line: ParsedLine) : Boolean  {
    if (line.Tag === "TRLR") {
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