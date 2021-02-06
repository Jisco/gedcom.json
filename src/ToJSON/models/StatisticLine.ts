/**
 * Class with informations about a line
 */
export default class StatisticLine{
    constructor(lineNumber: number, line: string, text?: string){
        this.LineNumber = lineNumber;
        this.Line = line;
        this.Text = text;
    }

    /**
     * line number
     */
    LineNumber: number;

    /**
     * Line content
     */
    Line: string;

    Text?: string;
}