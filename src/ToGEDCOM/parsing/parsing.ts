import ParsingResult from "../models/statistics/ParsingResult";
import Statistics from "../models/statistics/Statistics";

const stats = new Statistics();

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
  return new ParsingResult("", undefined);
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
  // TODO
}
