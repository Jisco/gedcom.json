import { each, forEach, isArray, isObject } from "lodash";
import IDefinition from "../../Common/interfaces/IDefinition";
import ITagDefinition from "../../Common/interfaces/ITagDefinition";
import ProcessObjectValue from "./processObjectValue";
import ParsingResult from "../models/statistics/ParsingResult";
import Statistics from "../models/statistics/Statistics";
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
  const result: string[] = [];
  let ignoreDeeperThen = 0;

  // iterate over each main property
  each(object, (value, key) => {
    const def = SearchDefinition(parsingOptions.Definition, key);

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
        result.push(`0 ${def.Tag}`);

        eachDeep(value, (val: any, key: string, parent: any, context: any) => {
          if (!key || isArray(parent) || isArray(val)) {
            return;
          }

          const depth = context.depth;
          let definition: ITagDefinition | undefined = undefined;
          if (isObject(val)) {
            const processingResult = ProcessObjectValue(
              parsingOptions.Definition,
              context.path,
              depth,
              key,
              val
            );
            if (processingResult?.ignoreChildren) {
              ignoreDeeperThen = depth + 1;
            }
            if (processingResult?.lines) {
              forEach(processingResult.lines, (r) => {
                result.push(r);
              });
            }
            return;
          } else {
            // console.log(parent, context.path, key, val);
            // Property
            definition = SearchDefinition(
              parsingOptions.Definition,
              context.path
            );
            if (!definition) {
              // TODO:
              return;
            }
            const resultText = `${depth == 0 ? 1 : depth} ${
              definition.Tag
            } ${val}`;
            // console.log(resultText);
            result.push(resultText);
          }
          // if (definition) {
          //   console.log("Definition:\t", definition);
          // }
        });
      }
    } else {
      // TODO: Single Property ?
    }

    // console.log(key, value);
    // eachDeep(value, (val: any, key: string, parent: any, context: any) => {
    //   if (ignoreDeeperThen > 0 && ignoreDeeperThen < context.depth) {
    //     return;
    //   }
    //   ignoreDeeperThen = 0;
    //   propertyCount++;
    //   if (invokeProgressFunction) {
    //     invokeProgressFunction(allPropertiesCount, propertyCount);
    //   }
    //   if (!key || isArray(parent) || isArray(val)) {
    //     return;
    //   }
    //   // console.log("");
    //   // console.log("-------------");
    //   // console.log("Value:\t", JSON.stringify(val, null, 1));
    //   // console.log("IsObject:\t", isObject(val));
    //   // console.log("Key:\t", key);
    //   let definition: ITagDefinition | undefined = undefined;
    //   const depth = context.depth - 1;
    //   if (isObject(val)) {
    //     const processingResult = ProcessObjectValue(
    //       parsingOptions.Definition,
    //       context.path,
    //       depth,
    //       key,
    //       val
    //     );
    //     if (processingResult?.ignoreChildren) {
    //       ignoreDeeperThen = depth + 1;
    //     }
    //     if (processingResult?.lines) {
    //       forEach(processingResult.lines, (r) => {
    //         result.push(r);
    //       });
    //     }
    //     return;
    //   } else {
    //     // console.log(parent, context.path, key, val);
    //     // Property
    //     definition = SearchDefinition(parsingOptions.Definition, context.path);
    //     if (!definition) {
    //       // TODO:
    //       return;
    //     }
    //     const resultText = `${depth == 0 ? 1 : depth} ${definition.Tag} ${val}`;
    //     // console.log(resultText);
    //     result.push(resultText);
    //   }
    //   // if (definition) {
    //   //   console.log("Definition:\t", definition);
    //   // }
    // });
  });

  result.push("0 TRLR");
  return new ParsingResult(result, undefined);
}
