import Statistics from "./Statistics";

export default class ParsingResult {
  constructor(text: string, stats?: Statistics) {
    this.Text = text;

    /* istanbul ignore next */
    this.Statistics = stats ?? new Statistics();
  }

  Text: string;
  Statistics: Statistics;
}
