import { isArray, isObject } from "lodash";
import IDefinition from "../../Common/interfaces/IDefinition";
import ITagDefinition from "../../Common/interfaces/ITagDefinition";
import ProcessObjectValue from "../models/processing/processObjectValue";
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
  //   },
  // };

  // get count of all properties to process
  const allPropertiesCount = paths(object).length;
  let propertyCount = 0;
  let result = "";
  let ignoreDeeperThen = 0;

  eachDeep(object, (val: any, key: string, parent: any, context: any) => {
    if (ignoreDeeperThen > 0 && ignoreDeeperThen < context.depth) {
      return;
    }

    ignoreDeeperThen = 0;

    propertyCount++;
    if (invokeProgressFunction) {
      invokeProgressFunction(allPropertiesCount, propertyCount);
    }

    if (!key || isArray(parent) || isArray(val)) {
      return;
    }

    // console.log("");
    // console.log("-------------");
    // console.log("Value:\t", JSON.stringify(val, null, 1));
    // console.log("IsObject:\t", isObject(val));
    // console.log("Key:\t", key);
    let definition: ITagDefinition | undefined = undefined;
    const depth = context.depth - 1;

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

      if (processingResult?.result) {
        result += processingResult.result;
      }

      return;
    } else {
      // Property
      definition = SearchDefinition(parsingOptions.Definition, context.path);

      // console.log(definition);
      if (!definition) {
        // TODO:
        return;
      }

      const resultText = `${depth == 0 ? 1 : depth} ${definition.Tag} ${val}\n`;

      // console.log(resultText);
      result += resultText;
    }

    // if (definition) {
    //   console.log("Definition:\t", definition);

    // }
  });

  result += "0 TRLR";
  return new ParsingResult(result, undefined);
}
