import ObjectParsingResult from "../processing/ObjectParsingResult";
import Statistics from "./Statistics";

export default class ParsingResult {
  constructor(result: ObjectParsingResult, stats?: Statistics) {
    this.Result = result;

    /* istanbul ignore next */
    this.Statistics = stats ?? new Statistics();
  }

  Result: ObjectParsingResult;
  Statistics: Statistics;
}
