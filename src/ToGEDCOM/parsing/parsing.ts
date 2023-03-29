import ParsingResult from "../models/statistics/ParsingResult";
import yaml from "js-yaml";
import { readFile } from "fs/promises";
import { ProcessObject } from "./processObject";
import IDefinition from "../../Common/interfaces/IDefinition";

/**
 * Parses a object to an text
 *
 * @param text - The text
 * @param parsingOptions - The parsing options
 * @param invokeProgressFunction - Set function that is called before each property, to show progress in some way
 * @returns An object which includes the parsed text and parsing statistics
 */
export function ParseObject(
  object?: object,
  parsingOptions?: string,
  invokeProgressFunction?: (
    propertiesCount: number,
    actualproperty: number
  ) => void
): ParsingResult {
  if (!object || !parsingOptions) {
    return new ParsingResult("");
  }

  let yamlOptions: string | object | undefined = {};

  try {
    yamlOptions = yaml.safeLoad(parsingOptions);
  } catch (e) {
    return new ParsingResult("");
  }

  if (!yamlOptions) {
    return new ParsingResult("");
  }

  return ProcessObject(
    object,
    yamlOptions as IDefinition,
    invokeProgressFunction
  );
}

/**
 * Parses a file to an object
 *
 * @param path - The file path
 * @param parsingOptions - The parsing options
 * @param doneCallback - Returns the resulting object when file is readed completly
 * @param errorCallback - Returns file reading errors
 * @param invokeProgressFunction - Set function that is called before each line, to show progress in some way
 * @returns An object which includes the parsed object and parsing statistics
 */

/* istanbul ignore next */ // maybe later ;)
export function ParseFile(
  path: string,
  parsingOptions: string,
  doneCallback: (result: ParsingResult) => void,
  errorCallback: any,
  invokeProgressFunction?:
    | ((linesCount: number, actualLine: number) => void)
    | undefined
) {
  readFile(path)
    .then((data) => {
      const obj = JSON.parse(data.toString());
      const result = ParseObject(obj, parsingOptions, invokeProgressFunction);
      doneCallback(result);
    })
    .catch((error) => {
      errorCallback(error);
    });
}
