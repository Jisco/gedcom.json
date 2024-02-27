import trimStart from "lodash/trimStart.js";
import forEach from "lodash/forEach.js";
import split from "lodash/split.js";

import Statistics from "../models/Statistics.js";
import StatisticLine from "../models/StatisticLine.js";

import { IsValidLine } from "./lineValidation.js";
import { ParseLine } from "./parseLine.js";
import { GetResult, ProcessLine, ResetProcessing, SetParsingOptions } from "./processLine.js";
import ParsingResult from "../models/ParsingResult.js";
import yaml from "js-yaml";

import LineByLineReader from "line-by-line";
let stats = new Statistics();

/**
 * Parses a text to an object
 *
 * @param text - The text
 * @param parsingOptions - The parsing options
 * @param invokeProgressFunction - Set function that is called before each line, to show progress in some way
 * @returns An object which includes the parsed object and parsing statistics
 */
export function ParseText(text, parsingOptions, invokeProgressFunction) {
  stats = new Statistics();

  if (!text || !parsingOptions) {
    return new ParsingResult({});
  }

  ResetProcessing();

  let lastLevel = 0;
  let lineNumber = 1;
  let lines = split(text, "\n");
  let yamlOptions = {};

  try {
    yamlOptions = yaml.safeLoad(parsingOptions);
    SetParsingOptions(yamlOptions);
  } catch (e) {
    ResetProcessing();
    return new ParsingResult({});
  }

  let nextLine = (lastLine = undefined) => {
    if (lastLine) {
      lastLevel = lastLine.Level;
    }

    lineNumber++;
  };

  forEach(lines, (line, index) => {
    if (invokeProgressFunction) {
      invokeProgressFunction(lines.length, index);
    }

    ProcessNewLine(lastLevel, lineNumber, line, nextLine);
  });

  let result = GetResult();
  ResetProcessing();
  return new ParsingResult(result, stats);
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
export function ParseFile(path, parsingOptions, doneCallback, errorCallback, invokeProgressFunction) {
  // if no progress should be shown, it is not necessary to get the line count of the file at first
  if (!invokeProgressFunction) {
    ExecuteParseFile(path, parsingOptions, doneCallback, errorCallback, 0);
    return;
  }

  // read first time to get lines count
  let linesCountLr = new LineByLineReader(path);
  let linesCount = 0;
  linesCountLr.on("line", function (line) {
    linesCountLr.pause();
    linesCount++;
    linesCountLr.resume();
  });

  linesCountLr.on("end", function () {
    ExecuteParseFile(path, parsingOptions, doneCallback, errorCallback, linesCount, invokeProgressFunction);
  });
}

/* istanbul ignore next */ // maybe later ;)
function ExecuteParseFile(path, parsingOptions, doneCallback, errorCallback, linesCount, invokeProgressFunction) {
  let lr = new LineByLineReader(path);
  let lastLevel = 0;
  let lineNumber = 1;
  let yamlOptions = {};

  try {
    yamlOptions = yaml.safeLoad(parsingOptions);
    SetParsingOptions(yamlOptions);
  } catch (e) {
    errorCallback(e);
    doneCallback(new ParsingResult({}));

    ResetProcessing();
    return;
  }

  let nextLine = (lastLine = undefined) => {
    if (lastLine) {
      lastLevel = lastLine.Level;
    }

    if (invokeProgressFunction) {
      invokeProgressFunction(linesCount, lineNumber);
    }

    lineNumber++;
    lr.resume();
  };

  lr.on("error", function (err) {
    if (errorCallback) {
      errorCallback(err);
    }
  });

  lr.on("line", function (line) {
    lr.pause();
    ProcessNewLine(lastLevel, lineNumber, line, nextLine);
  });

  lr.on("end", function () {
    let result = GetResult();
    ResetProcessing();

    // All lines are read, file is closed now.
    doneCallback(new ParsingResult(result, stats));
  });
}

/**
 * Function that processes a text line
 * @param lastLevel level of the last level
 * @param lineNumber line number
 * @param line line content
 * @param nextLine function to invoke the processing of the next line
 * @internal
 */
export function ProcessNewLine(lastLevel, lineNumber, line, nextLine) {
  let actualLine = trimStart(line);

  if (!IsValidLine(actualLine)) {
    stats.IncorrectLines.push(new StatisticLine(lineNumber, actualLine));
    nextLine();
    return stats;
  }

  const parsedLine = ParseLine(actualLine, lineNumber, lastLevel);

  if (parsedLine === undefined) {
    stats.IncorrectLines.push(new StatisticLine(lineNumber, actualLine));
    nextLine();
    return stats;
  }

  let processingResult = ProcessLine(parsedLine, lastLevel);
  if (processingResult.Parsed) {
    stats.ParsedLines.push(new StatisticLine(lineNumber, actualLine));
  } else if (parsedLine.Tag && parsedLine.Tag[0] === "_") {
    stats.NotParsedLinesWithoutGEDCOMTag.push(new StatisticLine(lineNumber, actualLine, processingResult.Reason));
  } else {
    stats.NotParsedLines.push(new StatisticLine(lineNumber, actualLine, processingResult.Reason));
  }

  nextLine(parsedLine);
  return stats;
}
