import { forEach } from "lodash";
import ParsingResult from "../models/statistics/ParsingResult";
import Statistics from "../models/statistics/Statistics";

const index = require("deepdash/index");
let stats = new Statistics();

export function ProcessObject(
  object: object,
  parsingOptions: string | object = {},
  invokeProgressFunction?: (
    propertiesCount: number,
    actualproperty: number
  ) => void
): ParsingResult {
  stats = new Statistics();

  // TODO: Override real object with fake, for developing... remove for real conversion
  object = {
    Head: {
      Source: {
        Name: ["GRAMPS", "GRAMPS"],
        Version: "2.2.6-1",
      },
    },
  };

  // get count of all properties to process
  const allProperties = index(object);
  const appPropertiesCount = Object.keys(allProperties).length;
  let propertyCount = 0;

  forEach(allProperties, (value, key) => {
    propertyCount++;
    if (invokeProgressFunction) {
      invokeProgressFunction(appPropertiesCount, propertyCount);
    }

    console.log(`\t${key} -> ${value}`);
  });

  return new ParsingResult("", undefined);
}
