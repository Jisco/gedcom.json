import { isDate, isNaN } from "lodash";
import TagDefinition from "../../Common/TagDefinition";

export function ParseDateToLine(
  depth: number,
  definition: TagDefinition | undefined,
  val: any
) {
  if (
    !definition || // no definition
    !val || // no value object
    !val.Value // no value property with date
  ) {
    return {
      ignoreChildren: true,
      result: undefined,
    };
  }

  let dateValue = undefined;
  try {
    dateValue = new Date(val.Value);
    if (!isDate(dateValue) || isNaN(dateValue.getTime())) {
      // value property is no date object
      return {
        ignoreChildren: true,
        result: undefined,
      };
    }
  } catch {
    return {
      ignoreChildren: true,
      result: undefined,
    };
  }

  const result = "";
  const year = dateValue.getFullYear();
  const month = dateValue.getMonth();
  const day = dateValue.getDate();
  const hour = dateValue.getHours();
  const minutes = dateValue.getMinutes();
  const seconds = dateValue.getSeconds();

  // TODO: Monat umwandeln

  console.log(val);

  // Original + Time Property ignorieren, ist ja nur der Fallbackwert den ich bei der Konvertierung angelegt habe
  // TODO: Bestimmen über Definition ob eine Zeile für Datum + Zeit oder jeweils separate Spalte

  // has Original value in property
  // if (val.Original) {
  //   result += `${depth + 1} ${definition.Tag} ${val.Original}\n`;
  // }

  return {
    ignoreChildren: true,
    result,
  };
}
