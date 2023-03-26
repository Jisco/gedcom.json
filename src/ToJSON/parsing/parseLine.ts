import drop from "lodash/drop";
import join from "lodash/join";
import trim from "lodash/trim";
import isEmpty from "lodash/isEmpty";

import ParsedLine from "../models/ParsedLine";

import { GetLineLevel, GetReferenceId } from "./lineHelper";

/**
 * Parses a line
 *
 * @param line - The line
 * @param lineNumber - The line number
 * @param lastLevel - The level of the last parent
 * @returns The ParsedLine object if it is a correct gedcom line else undefined
 */
export function ParseLine(
  line: string,
  lineNumber: number,
  lastLevel: number
): ParsedLine | undefined {
  // level is max + 1 of last level
  const level = GetLineLevel(line);
  if (level !== 0 && level > lastLevel + 1) {
    return undefined;
  }

  const splitWithDelimiter = line.split(" ");
  const tagOrRef = trim(splitWithDelimiter[1]);
  const valueOrTag = trim(splitWithDelimiter[2]);
  let value: string | undefined = join(drop(splitWithDelimiter, 3), " ");

  const refId = GetReferenceId(tagOrRef);

  if (refId !== undefined) {
    if (refId.length > 23) {
      return undefined;
    }

    return new ParsedLine(lineNumber, level, valueOrTag, value, refId);
  }

  const tag = tagOrRef;

  if (tag.length > 31) {
    return undefined;
  }

  value = trim(`${valueOrTag} ${value}`);

  if (trim(value) === "undefined" || isEmpty(trim(value))) {
    value = undefined;
  }

  return new ParsedLine(lineNumber, level, tag, value);
}
