import dayjs from "dayjs";
import { find, get, split, toNumber, set } from "lodash";
import ConvertToDate from "../../Common/converter/ConvertToDate";
import TagDefinition from "../../Common/TagDefinition";
import CalendarConverter from "julian-gregorian";
const hebcal: any = require("hebcal");

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
    result += `${depth} ${definition.Tag} ${
      ConvertSingleDate(
        depth,
        val,
        get(val, propertyNameDefinition.Value),
        propertyNameDefinition,
        definition
      ).result
    }`;
  }
  // From - To
  else if (
    get(val, propertyNameDefinition.From) &&
    get(val, propertyNameDefinition.To)
  ) {
    const fromDef = get(val, propertyNameDefinition.From);
    SetCalendarFromParentObject(val, fromDef, propertyNameDefinition);

    const from = ConvertSingleDate(
      depth,
      fromDef,
      get(fromDef, propertyNameDefinition.Value),
      propertyNameDefinition,
      definition
    ).result;

    const toDef = get(val, propertyNameDefinition.To);
    SetCalendarFromParentObject(val, toDef, propertyNameDefinition);
    const to = ConvertSingleDate(
      depth,
      toDef,
      get(toDef, propertyNameDefinition.Value),
      propertyNameDefinition,
      definition
    ).result;

    result += `${depth} ${definition.Tag} FROM ${from} TO ${to}`;
  }
  // Between
  else if (
    get(val, propertyNameDefinition.Between) &&
    get(val, propertyNameDefinition.And)
  ) {
    const betweenDef = get(val, propertyNameDefinition.Between);
    SetCalendarFromParentObject(val, betweenDef, propertyNameDefinition);

    const between = ConvertSingleDate(
      depth,
      betweenDef,
      get(betweenDef, propertyNameDefinition.Value),
      propertyNameDefinition,
      definition
    );

    const andDef = get(val, propertyNameDefinition.And);
    SetCalendarFromParentObject(val, andDef, propertyNameDefinition);
    const and = ConvertSingleDate(
      depth,
      andDef,
      get(andDef, propertyNameDefinition.Value),
      propertyNameDefinition,
      definition
    );

    // test special cases, full month or full year than return the short format
    let isSpecialPeriod = false;
    if (
      !between.hasMarkers &&
      between.hasFullDate &&
      between.jsDate &&
      !between.hasTime &&
      !and.hasMarkers &&
      and.hasFullDate &&
      and.jsDate &&
      !and.hasTime
    ) {
      if (between.calendar === and.calendar && between.calendar === "Hebrew") {
        if (
          between.hebrewDate.year === and.hebrewDate.year &&
          between.hebrewDate.month + 1 === and.hebrewDate.month
        ) {
          // full month
          isSpecialPeriod = true;
          result += `${depth} ${
            definition.Tag
          } @#DHEBREW@ ${ConvertNumberToHebrewMonth(
            between.hebrewDate.month
          )} ${between.hebrewDate.year}`;
        } else if (
          // full year
          between.hebrewDate.day === and.hebrewDate.day &&
          between.hebrewDate.day === 1 &&
          between.hebrewDate.month === and.hebrewDate.month &&
          between.hebrewDate.year + 1 === and.hebrewDate.year
        ) {
          isSpecialPeriod = true;
          result += `${depth} ${definition.Tag} @#DHEBREW@ ${between.hebrewDate.year}`;
        }
      } else {
        // full month
        const firstDayOfBetween = between.jsDate.clone().set("date", 1);

        // test if between date is first day of month
        if (firstDayOfBetween.diff(between.jsDate) === 0) {
          const firstDayOfAnd = and.jsDate.clone().set("date", 1);

          // test if and date is first day of month
          if (firstDayOfAnd.diff(and.jsDate) === 0) {
            // test if both month are january and and is the next year after between
            if (
              firstDayOfBetween.month() === 0 &&
              firstDayOfAnd.month() == 0 &&
              firstDayOfBetween.year() + 1 === firstDayOfAnd.year()
            ) {
              isSpecialPeriod = true;
              result += `${depth} ${definition.Tag} ${
                between.calendar === "Julian" ? "@#DJULIAN@ " : ""
              }${firstDayOfBetween.year()}`;
            }
            // test if and month is the one after between
            else if (
              firstDayOfBetween.add(1, "month").diff(firstDayOfAnd) === 0
            ) {
              isSpecialPeriod = true;
              result += `${depth} ${definition.Tag} ${
                between.calendar === "Julian" ? "@#DJULIAN@ " : ""
              }${firstDayOfBetween
                .format("MMM")
                .toUpperCase()} ${firstDayOfBetween.year()}`;
            }
          }
        }
      }
    }

    if (!isSpecialPeriod) {
      result += `${depth} ${definition.Tag} BETWEEN ${between.result} AND ${and.result}`;
    }
  }

  return {
    ignoreChildren: true,
    result: (result += "\n"),
  };
}

function ConvertSingleDate(
  depth: number,
  jsonObject: any,
  value: string | Date,
  propertynameDefinition: ConvertToDate,
  tagDefinition: TagDefinition
) {
  let result = "";
  let hasMarkers = false;
  let hasFullDate = true;
  let hasTime = false;
  let calendar = "Gregorian";
  let hebrewDate = {} as any;

  /*
    Markers
  */

  // Interpreted, just return value
  if (get(jsonObject, propertynameDefinition.Interpreted)) {
    hasMarkers = true;
    return {
      result: `INT ${value}`,
      hasMarkers,
      hasFullDate,
      jsDate: undefined,
      hasTime,
      calendar,
      hebrewDate,
    };
  }

  let dayObject = dayjs(value);

  // Estimated
  if (get(jsonObject, propertynameDefinition.Estimated)) {
    hasMarkers = true;
    result += `${result.length === 0 ? "" : " "}EST`;
  }

  // About
  if (get(jsonObject, propertynameDefinition.About)) {
    hasMarkers = true;
    result += `${result.length === 0 ? "" : " "}ABT`;
  }

  // Calculated
  if (get(jsonObject, propertynameDefinition.Calculated)) {
    hasMarkers = true;
    result += `${result.length === 0 ? "" : " "}CAL`;
  }

  // After
  if (get(jsonObject, propertynameDefinition.After)) {
    hasMarkers = true;
    result += `${result.length === 0 ? "" : " "}AFT`;
  }

  // Before
  if (get(jsonObject, propertynameDefinition.Before)) {
    hasMarkers = true;
    result += `${result.length === 0 ? "" : " "}BEF`;
  }

  // calendar
  if (get(jsonObject, propertynameDefinition.Calendar) === "Julian") {
    dayObject = ConvertToJulian(dayObject);
    result += `${result.length === 0 ? "" : " "}@#DJULIAN@`;
    calendar = "Julian";
  }

  if (get(jsonObject, propertynameDefinition.Calendar) === "Hebrew") {
    calendar = "Hebrew";
    hebrewDate = new hebcal.HDate(dayObject.toDate());
    result += `${result.length === 0 ? "" : " "}@#DHEBREW@`;
  }

  // day
  if (get(jsonObject, propertynameDefinition.HasDay)) {
    result += `${result.length === 0 ? "" : " "}${
      calendar === "Hebrew" ? hebrewDate.day : dayObject.date()
    }`;
  } else {
    hasFullDate = false;
  }

  // month as string value
  if (get(jsonObject, propertynameDefinition.HasMonth)) {
    result += `${result.length === 0 ? "" : " "}${
      calendar === "Hebrew"
        ? ConvertNumberToHebrewMonth(hebrewDate.month)
        : dayObject.format("MMM").toUpperCase()
    }`;
  } else {
    hasFullDate = false;
  }

  // year
  if (get(jsonObject, propertynameDefinition.HasYear)) {
    result += `${result.length === 0 ? "" : " "}${
      calendar === "Hebrew" ? hebrewDate.year : dayObject.year()
    }`;
  } else {
    hasFullDate = false;
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
    hasTime = true;
  } else if (
    find(tagDefinition.Properties, (x) => x.ConvertTo?.Type === "Time")
  ) {
    result += ` ${dayObject.hour()}:${dayObject.minute()}:${dayObject.second()}`;
    hasTime = true;
  }

  return {
    result,
    hasMarkers,
    hasFullDate,
    jsDate: dayObject,
    hasTime,
    calendar,
    hebrewDate,
  };
}

function ConvertToJulian(date: dayjs.Dayjs) {
  const newDateString = split(
    CalendarConverter.fromGregorianToJulian(
      date.get("year"),
      date.get("month"),
      date.get("date")
    ),
    "-"
  );

  date = date.set("year", toNumber(newDateString[0]));
  date = date.set("month", toNumber(newDateString[1]));
  date = date.set("date", toNumber(newDateString[2]));

  return date;
}

function ConvertNumberToHebrewMonth(num: number) {
  switch (num) {
    case 1:
      return "NSN";
    case 2:
      return "IYR";
    case 3:
      return "SVN";
    case 4:
      return "TMZ";
    case 5:
      return "AAV";
    case 6:
      return "ELL";
    case 7:
      return "TSH";
    case 8:
      return "CSH";
    case 9:
      return "KSL";
    case 10:
      return "TVT";
    case 11:
      return "SHV";
    case 12:
      return "ADR";
    case 13:
      return "ADS";
  }

  return "";
}

function SetCalendarFromParentObject(
  parent: any,
  subDef: any,
  propertyNameDefinition: ConvertToDate
) {
  if (
    get(parent, propertyNameDefinition.Calendar) &&
    !get(subDef, propertyNameDefinition.Calendar)
  ) {
    set(
      subDef,
      propertyNameDefinition.Calendar,
      get(parent, propertyNameDefinition.Calendar)
    );
  }
}
