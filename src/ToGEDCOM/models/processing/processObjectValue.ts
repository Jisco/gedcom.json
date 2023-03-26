import { find, get, has, isArray, tail } from "lodash";

export default function ProcessObjectValue(
  options: any,
  depth: number,
  key: string,
  val: any
): any {
  // set to true if the children items of this value should be ignored, eg by an date
  let ignoreChildren = false;

  // try find definition via "CollectAs"
  let definition = find(options, (p) => p.CollectAs === key);

  if (!definition) {
    // try find definition via "Property"
    definition = find(options, (p) => p.Property === key);

    if (!definition || !definition.Type) {
      // TODO:
      return;
    } else if (definition.Type === "Date") {
      console.log("isDate!");
      ignoreChildren = true;
    }
  }

  // console.log(definition);
  let result = "";

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
        const subDefinition = find(
          options,
          (p) => !p.CollectAs && p.Property === definition.Property
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
    ignoreChildren,
    result,
  };
}
