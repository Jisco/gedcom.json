import ObjectParsingResult from "../processing/ObjectParsingResult";
import Statistics from "./Statistics";

export default class ParsingResult {
  constructor(result: ObjectParsingResult) {
    this.Result = result;

    /* istanbul ignore next */
    this.Statistics = result.stats ?? new Statistics();
  }

  Result: ObjectParsingResult;
  Statistics: Statistics;
}
