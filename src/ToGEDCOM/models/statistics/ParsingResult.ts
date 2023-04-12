import ObjectParsingResult from "../processing/ObjectParsingResult";
import Statistics from "./Statistics";

export default class ParsingResult {
  constructor(lines: ObjectParsingResult, stats?: Statistics) {
    this.Result = lines;

    /* istanbul ignore next */
    this.Statistics = stats ?? new Statistics();
  }

  Result: ObjectParsingResult;
  Statistics: Statistics;
}
