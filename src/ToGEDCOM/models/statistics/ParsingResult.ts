import Statistics from "./Statistics";

export default class ParsingResult {
  constructor(lines: string[], stats?: Statistics) {
    this.Lines = lines;

    /* istanbul ignore next */
    this.Statistics = stats ?? new Statistics();
  }

  Lines: string[];
  Statistics: Statistics;
}
