import { get, has, isArray, tail } from "lodash";
import ITagDefinition from "../../Common/interfaces/ITagDefinition";
import { ParseDateToLine } from "./parseDate";
import { SearchDefinition } from "./searchDefinition";
import IObjectParsingResult from "../models/processing/IObjectParsingResult";

export default function ProcessObjectValue(
  definitions: ITagDefinition[],
  propertyPath: string,
  depth: number,
  key: string,
  val: any
): IObjectParsingResult {
  // try find definition via "CollectAs"
  let definition = SearchDefinition(definitions, propertyPath);
  const lines: string[] = [];

  if (!definition) {
    // try find definition via "Property"
    definition = SearchDefinition(definitions, key);

    if (!definition || !definition.Type) {
      // TODO:
      return {
        ignoreChildren: false,
        lines,
      };
    } else if (definition.Type === "Date") {
      return ParseDateToLine(depth, definition, val);
    }
  }

  if (definition.Type === "Date") {
    return ParseDateToLine(depth, definition, val);
  }

  // if definition has no property defined, just add tag
  if (!definition.Property) {
    lines.push(`${depth} ${definition.Tag}`);
  }
  // if a property is defined, test if value has property
  else if (has(val, definition.Property)) {
    const defPropertyValue = get(val, definition.Property);

    if (!defPropertyValue) {
      // TODO:
      return {
        ignoreChildren: false,
        lines: [],
      };
    }

    // if property is definied an is an array
    // get first value and add as tag value
    // then if more values are defined get them as property value
    if (isArray(defPropertyValue)) {
      if (defPropertyValue.length > 0) {
        lines.push(`${depth} ${definition.Tag} ${defPropertyValue[0]}`);
      }

      const remainingItems = tail(defPropertyValue);
      if (remainingItems.length > 0) {
        const subDefinition = SearchDefinition(
          definitions,
          (propertyPath += `.${definition.Property}`)
        );

        if (subDefinition) {
          lines.push(
            `${depth + 1} ${subDefinition.Tag} ${defPropertyValue[0]}`
          );
        }
      }
    }
    // just add reference line, object itself should become later
    else if (definition.CollectAs && defPropertyValue[0] === "@") {
      lines.push(`${depth} ${definition.Tag} ${defPropertyValue}`);
    }

    // console.log();
    // resultText += `${depth} ${definition.Tag} ${val}\n`;
  }

  // console.log(result);
  // result += resultText;
  return {
    ignoreChildren: false,
    lines,
  };
}
