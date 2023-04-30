import { get, has, isArray, tail } from "lodash";

import ITagDefinition from "../../Common/interfaces/ITagDefinition";
import { ParseDateToLine } from "./parseDate";
import { GetActualResult } from "./processObject";
import { SearchDefinition } from "./searchDefinition";

export default function ProcessObjectValue(
  parentDefinition: ITagDefinition,
  propertyPath: string,
  depth: number,
  val: any
) {
  // try find definition via "CollectAs"
  const definition = SearchDefinition(
    parentDefinition.Properties,
    propertyPath
  );

  const result = GetActualResult();

  if (!definition) {
    // TODO: console.log("Merken! Könnte Kind vom späterem Objekt sein");
    return;
  }

  if (definition.Type === "Date") {
    return ParseDateToLine(propertyPath, depth, definition, val);
  }

  // if definition has no property defined, just add tag
  if (!definition.Property) {
    result.addLine(propertyPath, depth, definition.Tag);
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
        result.addLine(
          propertyPath,
          depth,
          definition.Tag,
          defPropertyValue[0]
        );
      }

      const remainingItems = tail(defPropertyValue);
      if (remainingItems.length > 0) {
        const subDefinition = SearchDefinition(
          parentDefinition.Properties,
          (propertyPath += `.${definition.Property}`)
        );

        if (subDefinition) {
          result.addLine(
            (propertyPath += `.${definition.Property}`),
            depth + 1,
            subDefinition.Tag,
            defPropertyValue[0]
          );
        } else {
          //TODO: console.log("Merken! Könnte Kind vom späterem Objekt sein");
        }
      }
    }
    // just add reference line, object itself should become later
    else if (definition.CollectAs && defPropertyValue[0] === "@") {
      result.addLine(propertyPath, depth, definition.Tag, defPropertyValue);
    }

    // console.log();
    // resultText += `${depth} ${definition.Tag} ${val}\n`;
  }

  // console.log(result);
  // result += resultText;
}
