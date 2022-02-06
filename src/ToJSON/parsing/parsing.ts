import trimStart from 'lodash/trimStart';
import forEach from 'lodash/forEach';
import split from 'lodash/split';

import ParsedLine from "../models/ParsedLine";
import Statistics from '../models/Statistics';
import StatisticLine from '../models/StatisticLine';

import { IsValidLine } from './lineValidation';
import { ParseLine } from './parseLine';
import { GetResult, ProcessLine, ResetProcessing, SetParsingOptions } from './processLine';
import ParsingResult from '../models/ParsingResult';
import yaml from 'js-yaml';

const LineByLineReader = require('line-by-line');
let stats = new Statistics();

/**
 * Parses a text to an object 
 *
 * @param text - The text
 * @param parsingOptions - The parsing options
 * @param invokeProgressFunction - Set function that is called before each line, to show progress in some way
 * @returns An object which includes the parsed object and parsing statistics
*/
export function ParseText(
    text?: string, 
    parsingOptions?: string, 
    invokeProgressFunction?: (linesCount: number, actualLine: number) => void): ParsingResult {

    if (!text || !parsingOptions){
        return new ParsingResult({});
    }

    ResetProcessing();

    let lastLevel = 0;
    let lineNumber = 1;
    let lines = split(text, "\n");
    let yamlOptions: string | object | undefined = {};

    try{
        yamlOptions = yaml.safeLoad(parsingOptions);
        SetParsingOptions(yamlOptions);
    }
    catch(e) {
        ResetProcessing();
        return new ParsingResult({});
    }

    let nextLine = (lastLine: ParsedLine | undefined = undefined) => {
        if (lastLine){
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
export function ParseFile(
  path: string, 
  parsingOptions: string, 
  doneCallback: (result: ParsingResult) => void, 
  errorCallback: any,
  invokeProgressFunction?: ((linesCount: number, actualLine: number) => void) | undefined) {

    // if no progress should be shown, it is not necessary to get the line count of the file at first
    if (!invokeProgressFunction) {
      ExecuteParseFile(path, parsingOptions, doneCallback, errorCallback, 0);
      return;
    }

    // read first time to get lines count
    let linesCountLr = new LineByLineReader(path);
    let linesCount = 0;
    linesCountLr.on('line', function (line: any) {
      linesCountLr.pause();
      linesCount++;
      linesCountLr.resume();
    });

    linesCountLr.on('end', function () {
      ExecuteParseFile(path, parsingOptions, doneCallback, errorCallback, linesCount, invokeProgressFunction);
    });
}

/* istanbul ignore next */ // maybe later ;)
function ExecuteParseFile(
  path: string, 
  parsingOptions: string, 
  doneCallback: (result: ParsingResult) => void, 
  errorCallback: any,
  linesCount: number,
  invokeProgressFunction?: ((linesCount: number, actualLine: number) => void) | undefined) {
    let lr = new LineByLineReader(path);
    let lastLevel = 0;
    let lineNumber = 1;
    let yamlOptions: string | object | undefined = {};

    try{
        yamlOptions = yaml.safeLoad(parsingOptions);
        SetParsingOptions(yamlOptions);
    }
    catch(e) {
        errorCallback(e);
        doneCallback(new ParsingResult({}));

        ResetProcessing();
        return;
    }
    
    let nextLine = (lastLine: ParsedLine | undefined = undefined) => {
        if (lastLine){
            lastLevel = lastLine.Level;
        }

        if (invokeProgressFunction) {
          invokeProgressFunction(linesCount, lineNumber);
        }

        lineNumber++;
        lr.resume();
    };

    lr.on('error', function (err: any) {
        if (errorCallback) {
            errorCallback(err);
        }
    });

    lr.on('line', function (line: any) {
        lr.pause();
        ProcessNewLine(lastLevel, lineNumber, line, nextLine);
    });
    
    lr.on('end', function () {
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
export function ProcessNewLine(lastLevel: number, lineNumber: number, line: string, nextLine: Function) {
    let actualLine = trimStart(line);

    if (!IsValidLine(actualLine)) {
        stats.IncorrectLines.push(new StatisticLine(lineNumber, actualLine));
        nextLine();
        return stats;
    }

    var parsedLine = ParseLine(actualLine, lineNumber, lastLevel);

    if (parsedLine === undefined) {
        stats.IncorrectLines.push(new StatisticLine(lineNumber, actualLine));
        nextLine();
        return stats;
    }
   
    let processingResult = ProcessLine(parsedLine, lastLevel);
    if (processingResult.Parsed) {
        stats.ParsedLines.push(new StatisticLine(lineNumber, actualLine));
    }
    else
    {        
        if (parsedLine.Tag && parsedLine.Tag[0] === '_') {
            stats.NotParsedLinesWithoutGEDCOMTag.push(new StatisticLine(lineNumber, actualLine, processingResult.Reason));
        }
        else{
            stats.NotParsedLines.push(new StatisticLine(lineNumber, actualLine, processingResult.Reason));
        }
    }

    nextLine(parsedLine);
    return stats;
}