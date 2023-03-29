import { isDate } from "lodash";

export function ParseDateToLine(depth: number, definition: any, val: any) {
  if (
    !definition || // no definition
    !val || // no value object
    !val.Value || // no value property with date
    !isDate(val.Value) // value property is no date object
  ) {
    return {
      ignoreChildren: true,
      result: undefined,
    };
  }

  const result = "";

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
