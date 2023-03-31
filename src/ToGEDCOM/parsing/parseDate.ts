import dayjs, { Dayjs } from "dayjs";
import { find, get, isDate, isNaN } from "lodash";
import { JsonParsing } from "../..";
import ConvertToDate from "../../Common/converter/ConvertToDate";
import TagDefinition from "../../Common/TagDefinition";

export function ParseDateToLine(
  depth: number,
  definition: TagDefinition | undefined,
  val: any
) {
  let propertyNameDefinition = new ConvertToDate();
  if (definition?.ConvertTo && definition.ConvertTo.Type === "Date") {
    propertyNameDefinition = definition.ConvertTo as ConvertToDate;
  }

  if (
    !definition || // no definition
    !val || // no value object
    !(
      get(val, propertyNameDefinition.Value) || // no value property with date)
      get(val, propertyNameDefinition.From) || // no value property with date)
      get(val, propertyNameDefinition.To) || // no value property with date)
      get(val, propertyNameDefinition.Between) || // no value property with date)
      get(val, propertyNameDefinition.And)
    )
  ) {
    return {
      ignoreChildren: true,
      result: undefined,
    };
  }

  let result = "";

  // Single Value
  if (get(val, propertyNameDefinition.Value)) {
    result += `${depth} ${definition.Tag} ${ConvertSingleDate(
      depth,
      val,
      dayjs(get(val, propertyNameDefinition.Value)),
      propertyNameDefinition,
      definition
    )}`;
  }
  // From - To
  else if (
    get(val, propertyNameDefinition.From) &&
    get(val, propertyNameDefinition.To)
  ) {
    const fromDef = get(val, propertyNameDefinition.From);
    const from = ConvertSingleDate(
      depth,
      fromDef,
      dayjs(get(fromDef, propertyNameDefinition.Value)),
      propertyNameDefinition,
      definition
    );

    const toDef = get(val, propertyNameDefinition.To);
    const to = ConvertSingleDate(
      depth,
      toDef,
      dayjs(get(toDef, propertyNameDefinition.Value)),
      propertyNameDefinition,
      definition
    );

    result += `${depth} ${definition.Tag} FROM ${from} TO ${to}`;
  }
  // Between
  else if (
    get(val, propertyNameDefinition.Between) &&
    get(val, propertyNameDefinition.And)
  ) {
    const betweenDef = get(val, propertyNameDefinition.Between);
    const between = ConvertSingleDate(
      depth,
      betweenDef,
      dayjs(get(betweenDef, propertyNameDefinition.Value)),
      propertyNameDefinition,
      definition
    );

    const andDef = get(val, propertyNameDefinition.And);
    const and = ConvertSingleDate(
      depth,
      andDef,
      dayjs(get(andDef, propertyNameDefinition.Value)),
      propertyNameDefinition,
      definition
    );

    result += `${depth} ${definition.Tag} BETWEEN ${between} AND ${and}`;
  }

  // console.log(val);

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

function ConvertSingleDate(
  depth: number,
  jsonObject: any,
  dayObject: Dayjs,
  propertynameDefinition: ConvertToDate,
  tagDefinition: TagDefinition
) {
  let result = "";

  // day
  if (get(jsonObject, propertynameDefinition.HasDay)) {
    result += dayObject.date();
  }
  // month as string value
  if (get(jsonObject, propertynameDefinition.HasMonth)) {
    result += `${result.length === 0 ? "" : " "}${dayObject
      .format("MMM")
      .toUpperCase()}`;
  }
  // year
  if (get(jsonObject, propertynameDefinition.HasYear)) {
    result += `${result.length === 0 ? "" : " "}${dayObject.year()}`;
  }

  // time
  const timeDefinitionViaProperty = find(
    tagDefinition.Properties,
    (x) => x.Property === "Time"
  );

  // add time as own line
  if (
    timeDefinitionViaProperty &&
    timeDefinitionViaProperty.ConvertTo?.Type === "Time"
  ) {
    result += `\n${depth + 1} ${
      timeDefinitionViaProperty.Tag
    } ${dayObject.hour()}:${dayObject.minute()}:${dayObject.second()}`;
  } else if (
    find(tagDefinition.Properties, (x) => x.ConvertTo?.Type === "Time")
  ) {
    result += ` ${dayObject.hour()}:${dayObject.minute()}:${dayObject.second()}`;
  }

  return result;
}
