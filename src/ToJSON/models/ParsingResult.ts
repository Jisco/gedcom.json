import Statistics from "./Statistics";

export default class ParsingResult {
    constructor(obj: Object, stats?: Statistics, excludeParsedLinesFromStats?: boolean) {
        this.Object = obj;

        if (stats && excludeParsedLinesFromStats) {
            delete stats.ParsedLines;
        }

        /* istanbul ignore next */
        this.Statistics = stats ?? new Statistics();
    }

    Object: Object;
    Statistics: Statistics;
}