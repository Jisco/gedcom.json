import Statistics from './Statistics.js';

export default class ParsingResult {
  constructor(obj, stats) {
    this.Object = obj;

    /* istanbul ignore next */
    this.Statistics = stats ?? new Statistics();
  }
}
