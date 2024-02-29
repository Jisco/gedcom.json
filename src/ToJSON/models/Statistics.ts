import StatisticLine from './StatisticLine';
import join from 'lodash/join';

/**
 * Class with parsing statistics
 */
export default class Statistics {
    constructor(){
        this.ParsedLines = [];
        this.IncorrectLines = [];
        this.NotParsedLines = [];
        this.NotParsedLinesWithoutGEDCOMTag = [];
        this.ParsedLineCount = 0;
    }

    /**
     * @returns list of all correct parsed lines
     */
    ParsedLines?: StatisticLine[];
    /**
     * @returns list of all incorrect parsed lines
     */
    IncorrectLines: StatisticLine[];
    /**
     * @returns list of all not parsed lines
     */
    NotParsedLines: StatisticLine[];

    /**
     * @returns list of all not parsed lines
     */
    NotParsedLinesWithoutGEDCOMTag: StatisticLine[];

    ParsedLineCount: number;

    /**
     * @returns a count of all correctly parsed lines
     */
    get ParsedLinesCount(): number {
        return this.ParsedLineCount;
    }

    /**
     * @returns a count of all incorrect parsed lines
     */
    get IncorrectLinesCount(): number {
        return this.IncorrectLines.length;
    }

    /**
     * @returns a count of all not parsed lines
     */
    get NotParsedLinesCount(): number {
        return this.NotParsedLines.length;
    }

    /**
     * @returns a count of all not parsed lines
     */
    get NotParsedLinesWithoutGEDCOMTagCount(): number {
        return this.NotParsedLinesWithoutGEDCOMTag.length;
    }

    /**
     * @returns a count of all processed lines
     */
    get LinesCount(): number {
        return this.ParsedLineCount + this.IncorrectLines.length + this.NotParsedLines.length + this.NotParsedLinesWithoutGEDCOMTag.length;
    }

    /**
     * @returns a comma separated list of all not parsed line numbers
     */
    get NotParsedLinesList(): string {
        let lineNumbers: number[] = [];
        this.NotParsedLines.forEach(line => {
            lineNumbers.push(line.LineNumber);
        });

        return join(lineNumbers, ", ");
    }
}