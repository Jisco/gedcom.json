import {
  each,
  filter,
  find,
  forEach,
  get,
  has,
  includes,
  isArray,
  isObject,
  isString,
  set,
} from "lodash";

import IDefinition from "../../Common/interfaces/IDefinition";
import ITagDefinition from "../../Common/interfaces/ITagDefinition";
import TagDefinition from "../../Common/TagDefinition";
import ObjectParsingResult from "../models/processing/ObjectParsingResult";
import ParsingResult from "../models/statistics/ParsingResult";
import ProcessObjectValue from "./processObjectValue";
import { SearchDefinition, SearchDefinitionFromRoot } from "./searchDefinition";

const eachDeep = require("deepdash/eachDeep");
let result: ObjectParsingResult = new ObjectParsingResult();
let definitions: ITagDefinition[];
let objectToParse: Object;
let lastIndividualId: string;

export function GetActualResult() {
  return result;
}

export function ResetResult() {
  result = new ObjectParsingResult();
}

export function GetDefinitions() {
  return definitions;
}

export function SetDefinitions(defs: ITagDefinition[]) {
  definitions = defs;
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
  objectToParse = object;

  if (invokeProgressFunction) {
    result.setProgressFunction(invokeProgressFunction);
    result.setProcessablePropertyPaths(object);
  }

  SetDefinitions(parsingOptions.Definition);

  // get count of all properties to process
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
    result.startProcessingProperty(key);
    const def = SearchDefinitionFromRoot(key);

    if (!def) {
      // ?? Keine Definiton gefunden
      result.endProcessingPropertyWithError(key, value, "No definition found");
      return;
    }

    if (def.CollectAs) {
      if (!isObject(value)) {
        // ?? sollte Objekt oder Array sein
        result.endProcessingPropertyWithError(
          key,
          value,
          "Value should be object or array"
        );
        return;
      }

      if (isArray(value) && !def.CollectAsArray) {
        // ?? ist array sollte es aber nicht sein
        result.endProcessingPropertyWithError(
          key,
          value,
          "Value is array but should not be"
        );
        return;
      }

      if (!isArray(value) && def.CollectAsArray) {
        // ?? ist kein Array sollte aber eins sein
        result.endProcessingPropertyWithError(
          key,
          value,
          "value is not an array but should be"
        );
        return;
      }

      // single objekt
      if (!def.CollectAsArray) {
        // iterate properties
        result.addLine(key, 0, def.Tag);
        iterateInnerProperties(key, undefined, def, value);
      }
      // collection of entites
      else if (def.Property) {
        if (!isArray(value)) {
          result.endProcessingPropertyWithError(
            key,
            value,
            "property value is not an array but should be"
          );
          return;
        }

        const propertyName = def.Property;
        forEach(value, (item: any, index: number) => {
          if (!has(item, propertyName)) {
            result.endProcessingPropertyWithError(
              key,
              value,
              "item has not the searched property"
            );

            return;
          }

          const idTag = get(item, propertyName);
          result.addLine(key, 0, idTag, def.Tag);

          if (def.Tag === "INDI") {
            lastIndividualId = idTag;
          }

          set(item, propertyName, undefined);
          iterateInnerProperties(key, index, def, item);
        });
      }
    } else {
      result.endProcessingPropertyWithError(
        key,
        value,
        "property is no collection"
      );
      // TODO: Single Property ?
      console.log("\r\nTODO: ", key);
    }
  });

  result.addLine("", 0, "TRLR");
  return new ParsingResult(result);
}
function iterateInnerProperties(
  parentKey: string,
  index: number | undefined,
  parentDefinition: TagDefinition,
  value: any
) {
  eachDeep(value, (val: any, key: string, parent: any, context: any) => {
    if (context.path) {
      if (index !== undefined) {
        result.startProcessingProperty(
          `${parentKey}[${index}].${context.path}`
        );
      } else {
        result.startProcessingProperty(`${parentKey}.${context.path}`);
      }
    } else {
      if (index !== undefined) {
        result.startProcessingProperty(`${parentKey}[${index}]`);
      } else {
        result.startProcessingProperty(parentKey);
      }
    }

    if (!key || !val || isArray(parent) || isArray(val)) {
      result.endProcessingPropertyFailed(context.path, val);
      return;
    }

    const depth = context.depth;
    let definition: ITagDefinition | undefined = undefined;
    if (isObject(val)) {
      ProcessObjectValue(parentDefinition, context.path, depth, val);
      return;
    } else {
      // console.log(parent, context.path, key, val);
      // Property
      definition = SearchDefinition(parentDefinition.Properties, context.path);
      if (!definition) {
        // TODO: console.log("Merken! Könnte Kind vom späterem Objekt sein");
        return;
      }

      // reference to array
      if (
        definition.CollectAs &&
        definition.CollectAsArray &&
        definition.Property &&
        has(objectToParse, definition.CollectAs)
      ) {
        // TODO: good idea to be so specific?! The tag name is immutable, so why not?!
        if (definition.Tag === "FAM") {
          let tag = "FAMS";
          const relation = find(
            get(objectToParse, definition.CollectAs),
            (r) => get(r, definition?.Property ?? "Id") === val
          );
          if (relation) {
            const childPropertyName = find(
              GetDefinitions(),
              (d) => d.Tag === "CHIL"
            );
            const children = get(
              relation,
              childPropertyName?.Property ?? "Children"
            );

            if (children) {
              if (
                (isArray(children) && includes(children, lastIndividualId)) ||
                (isString(children) && children === lastIndividualId)
              ) {
                tag = "FAMC";
              }
            }

            result.addLine(context.path, depth, tag, val);
          }
        } else {
          // result.addLine(context.path, depth, definition.Tag, val);
        }
      } else {
        result.addLine(context.path, depth, definition.Tag, val);
      }
    }
    // if (definition) {
    //   console.log("Definition:\t", definition);
    // }
  });
}
