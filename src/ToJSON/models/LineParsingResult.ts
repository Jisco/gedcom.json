export default class LineParsingResult {
  constructor(parsed: boolean, reason?: string) {
    this.Parsed = parsed;
    this.Reason = reason;
  }

  Parsed: boolean;
  Reason?: string;
}
