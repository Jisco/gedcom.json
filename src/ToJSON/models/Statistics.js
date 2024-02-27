import StatisticLine from './StatisticLine.js';
import join from 'lodash/join.js';

/**
 * Class with parsing statistics
 */
export default class Statistics {
  constructor() {
    this.ParsedLines = [];
    this.IncorrectLines = [];
    this.NotParsedLines = [];
    this.NotParsedLinesWithoutGEDCOMTag = [];
  }

  /**
   * @returns a count of all correctly parsed lines
   */
  get ParsedLinesCount() {
    return this.ParsedLines.length;
  }

  /**
   * @returns a count of all incorrect parsed lines
   */
  get IncorrectLinesCount() {
    return this.IncorrectLines.length;
  }

  /**
   * @returns a count of all not parsed lines
   */
  get NotParsedLinesCount() {
    return this.NotParsedLines.length;
  }

  /**
   * @returns a count of all not parsed lines
   */
  get NotParsedLinesWithoutGEDCOMTagCount() {
    return this.NotParsedLinesWithoutGEDCOMTag.length;
  }

  /**
   * @returns a count of all processed lines
   */
  get LinesCount() {
    return (
      this.ParsedLines.length +
      this.IncorrectLines.length +
      this.NotParsedLines.length +
      this.NotParsedLinesWithoutGEDCOMTag.length
    );
  }

  /**
   * @returns a comma separated list of all not parsed line numbers
   */
  get NotParsedLinesList() {
    let lineNumbers = [];
    this.NotParsedLines.forEach((line) => {
      lineNumbers.push(line.LineNumber);
    });

    return join(lineNumbers, ', ');
  }
}
