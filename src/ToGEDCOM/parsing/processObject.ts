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
import { SearchDefinition } from "./searchDefinition";

const paths = require("deepdash/paths");
const eachDeep = require("deepdash/eachDeep");
let stats = new Statistics();

export function ProcessObject(
  object: object,
  parsingOptions: IDefinition = { Definition: [] },
  invokeProgressFunction?: (
    propertiesCount: number,
    actualproperty: number
  ) => void
): ParsingResult {
  stats = new Statistics();

  // TODO: Override real object with fake, for developing... remove for real conversion
  // object = {
  //   Head: {
  //     Source: {
  //       Name: ["GRAMPS", "GRAMPS"],
  //       Version: "2.2.6-1",
  //     },
  //     Destination: "GEDCOM 5.5",
  //     Date: {
  //       Original: "9 MAR 2007",
  //       HasYear: true,
  //       HasMonth: true,
  //       HasDay: true,
  //       Value: "2007-03-08T23:00:00.000Z",
  //     },
  //     Characters: "UTF-8",
  //     Submitter: {
  //       Id: "@SUBM@",
  //     },
  //     File: "/home/bodon/dok/gramps_data/Untitled_1.ged",
  //     Copyright: "Copyright (c) 2007 .",
  //     Gedcom: {
  //       Version: "5.5",
  //       Format: "LINEAGE-LINKED",
  //     },
  //   },
  //   Submitter: [
  //     {
  //       Id: "@SUBM@",
  //       Name: "Not Provided",
  //       Address: "Not Provided\nNot Provided",
  //     },
  //   ],
  // };

  // get count of all properties to process
  const allPropertiesCount = paths(object).length;
  let propertyCount = 0;
  const result = new ObjectParsingResult();
  result.mergeLineProperties = filter(
    parsingOptions.Definition,
    (x) => x.StartWith !== undefined
  ).map((x) => {
    if (x.StartWith === "\\n") {
      x.StartWith = "\n";
    }

    return x;
  });

  console.log(result.mergeLineProperties);

  // iterate over each main property
  each(object, (value, key) => {
    const def = SearchDefinition(undefined, parsingOptions.Definition, key);

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

        iterateInnerProperties(def, value, parsingOptions, result);
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
          iterateInnerProperties(def, item, parsingOptions, result);
        });
      }
    } else {
      // TODO: Single Property ?
      // console.log(def)
    }
  });

  result.addLine(0, "TRLR");
  return new ParsingResult(result, undefined);
}
function iterateInnerProperties(
  parentDefinition: TagDefinition,
  value: any,
  parsingOptions: IDefinition,
  result: ObjectParsingResult
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
        key,
        val,
        result
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
        return;
      }

      result.addLine(depth == 0 ? 1 : depth, definition.Tag, val);
    }
    // if (definition) {
    //   console.log("Definition:\t", definition);
    // }
  });
}
