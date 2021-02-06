import ParsedLine from "./ParsedLine";
import TagDefinition from "./TagDefinition";

export default class ParsingObject {
    constructor(definition: TagDefinition, line: ParsedLine, actualPath: string[]) {
        this.PropertyPath = actualPath;

        this.Object = { };
        this.Definition = definition;
        this.Line = line;
    }

    PropertyPath: string[];
    Object: any;
    Definition: TagDefinition;
    Line: ParsedLine;

    get StartLevel() {
        return this.Line.Level;
    }
}