import {
  each,
  filter,
  forEach,
  get,
  has,
  isArray,
  isObject,
  set,
} from "lodash";

import IDefinition from "../../Common/interfaces/IDefinition";
import ITagDefinition from "../../Common/interfaces/ITagDefinition";
import TagDefinition from "../../Common/TagDefinition";
import ObjectParsingResult from "../models/processing/ObjectParsingResult";
import ParsingResult from "../models/statistics/ParsingResult";
import Statistics from "../models/statistics/Statistics";
import ProcessObjectValue from "./processObjectValue";
import { SearchDefinition, SearchDefinitionFromRoot } from "./searchDefinition";

const eachDeep = require("deepdash/eachDeep");
let stats = new Statistics();
let result: ObjectParsingResult = new ObjectParsingResult();

export function GetActualResult() {
  return result;
}

export function ResetResult() {
  result = new ObjectParsingResult();
  stats = new Statistics();
}

export function ProcessObject(
  object: object,
  parsingOptions: IDefinition = { Definition: [] },
  invokeProgressFunction?: (
    propertiesCount: number,
    actualproperty: number
  ) => void
): ParsingResult {
  ResetResult();

  // get count of all properties to process
  // const allPropertiesCount = paths(object).length;
  // let propertyCount = 0;
  result.mergeLineProperties = filter(
    parsingOptions.Definition,
    (x) => x.StartWith !== undefined
  ).map((x) => {
    if (x.StartWith === "\\n") {
      x.StartWith = "\n";
    }

    return x;
  });

  // iterate over each main property
  each(object, (value, key) => {
    const def = SearchDefinitionFromRoot(parsingOptions.Definition, key);

    if (!def) {
      // ?? Keine Definiton gefunden
      return;
    }

    if (def.CollectAs) {
      if (!isObject(value)) {
        // ?? sollte Objekt oder Array sein
        return;
      }

      if (isArray(value) && !def.CollectAsArray) {
        // ?? ist array sollte es aber nicht sein
        return;
      }

      if (!isArray(value) && def.CollectAsArray) {
        // ?? ist kein Array sollte aber eins sein
        return;
      }

      // single objekt
      if (!def.CollectAsArray) {
        // iterate properties
        result.addLine(0, def.Tag);

        iterateInnerProperties(def, value, parsingOptions);
      }
      // collection of entites
      else if (def.Property) {
        if (!isArray(value)) {
          return;
        }

        const propertyName = def.Property;
        forEach(value, (item: any) => {
          if (!has(item, propertyName)) {
            return;
          }

          const idTag = get(item, propertyName);
          result.addLine(0, idTag, def.Tag);
          set(item, propertyName, undefined);
          iterateInnerProperties(def, item, parsingOptions);
        });
      }
    } else {
      // TODO: Single Property ?
      // console.log(def)
    }
  });

  result.addLine(0, "TRLR");
  return new ParsingResult(result, stats);
}
function iterateInnerProperties(
  parentDefinition: TagDefinition,
  value: any,
  parsingOptions: IDefinition
) {
  eachDeep(value, (val: any, key: string, parent: any, context: any) => {
    if (!key || !val || isArray(parent) || isArray(val)) {
      return;
    }

    const depth = context.depth;
    let definition: ITagDefinition | undefined = undefined;
    if (isObject(val)) {
      ProcessObjectValue(
        parentDefinition,
        parsingOptions.Definition,
        context.path,
        depth,
        val
      );
      return;
    } else {
      // console.log(parent, context.path, key, val);
      // Property
      definition = SearchDefinition(
        parentDefinition.Properties,
        parsingOptions.Definition,
        context.path
      );
      if (!definition) {
        // TODO:
        console.log("Merken! Könnte Kind vom späterem Objekt sein");
        return;
      }

      result.addLine(depth, definition.Tag, val);
    }
    // if (definition) {
    //   console.log("Definition:\t", definition);
    // }
  });
}
