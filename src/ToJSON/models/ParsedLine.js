/**
 * Class with informations about the parsed line
 */
export default class ParsedLine {
  /**
   * @param lineNumber line number
   * @param level level in hierarchy
   * @param tag line tag
   * @param value value = line text without level and tag\reference id
   * @param refId reference id
   */
  constructor(lineNumber, level, tag, value = '', refId = '') {
    this.LineNumber = lineNumber;
    this.Level = level;
    this.Tag = tag;
    this.Value = value;
    this.ReferenceId = refId;
  }
}
