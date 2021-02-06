export default class LineParsingResult {
    constructor(parsed: Boolean, reason?: string) {
        this.Parsed = parsed;
        this.Reason = reason;
    }

    Parsed: Boolean;
    Reason?: string;
}