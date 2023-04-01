import { get, has, isArray, tail } from "lodash";
import ITagDefinition from "../../../Common/interfaces/ITagDefinition";
import { ParseDateToLine } from "../../parsing/parseDate";
import { SearchDefinition } from "../../parsing/searchDefinition";

export default function ProcessObjectValue(
  definitions: ITagDefinition[],
  propertyPath: string,
  depth: number,
  key: string,
  val: any
): any {
  // try find definition via "CollectAs"
  let definition = SearchDefinition(definitions, propertyPath);
  let result = "";

  if (!definition) {
    // try find definition via "Property"
    definition = SearchDefinition(definitions, key);

    if (!definition || !definition.Type) {
      // TODO:
      return {
        ignoreChildren: false,
        result,
      };
    } else if (definition.Type === "Date") {
      return ParseDateToLine(depth, definition, val);
    }
  }

  if (definition.Type === "Date") {
    return ParseDateToLine(depth - 1, definition, val);
  }

  // if definition has no property defined, just add tag
  if (!definition.Property) {
    result += `${depth} ${definition.Tag}\n`;
  }
  // if a property is defined, test if value has property
  else if (has(val, definition.Property)) {
    const defPropertyValue = get(val, definition.Property);

    if (!defPropertyValue) {
      // TODO:
      return;
    }

    // if property is definied an is an array
    // get first value and add as tag value
    // then if more values are defined get them as property value
    if (isArray(defPropertyValue)) {
      if (defPropertyValue.length > 0) {
        result += `${depth} ${definition.Tag} ${defPropertyValue[0]}\n`;
      }

      const remainingItems = tail(defPropertyValue);
      if (remainingItems.length > 0) {
        const subDefinition = SearchDefinition(
          definitions,
          (propertyPath += `.${definition.Property}`)
        );

        if (subDefinition) {
          result += `${depth + 1} ${subDefinition.Tag} ${
            defPropertyValue[0]
          }\n`;
        }
      }
    }

    // console.log();
    // resultText += `${depth} ${definition.Tag} ${val}\n`;
  }

  // console.log(result);
  // result += resultText;
  return {
    ignoreChildren: false,
    result,
  };
}
