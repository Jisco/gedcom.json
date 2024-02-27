import ParsedLine from './ParsedLine.js';
import TagDefinition from './TagDefinition.js';

export default class ParsingObject {
  constructor(definition, line, actualPath) {
    this.PropertyPath = actualPath;

    this.Object = {};
    this.Definition = definition;
    this.Line = line;
  }

  get StartLevel() {
    return this.Line.Level;
  }
}
