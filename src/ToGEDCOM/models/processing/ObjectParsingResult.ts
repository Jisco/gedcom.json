import { first, forEach, indexOf, split, tail } from "lodash";
import ITagDefinition from "../../../Common/interfaces/ITagDefinition";

export default class ObjectParsingResult {
  lines: string[] = [];
  mergeLineProperties: ITagDefinition[] = [];

  addLine(depth: number, tag: string, value: string | undefined = undefined) {
    if (!value) {
      this.lines.push(`${depth} ${tag}`);
      return;
    }

    const additionalLines: any[] = [];

    forEach(this.mergeLineProperties, (p) => {
      if (indexOf(value, p.StartWith) > 0) {
        const splitValue = split(value, p.StartWith);

        value = first(splitValue);
        forEach(tail(splitValue), (v) => {
          additionalLines.push({
            Tag: p.Tag,
            Value: v,
          });
        });
      }
    });

    this.lines.push(`${depth} ${tag} ${value}`);

    forEach(additionalLines, (l) => {
      this.lines.push(`${depth + 1} ${l.Tag} ${l.Value}`);
    });
  }

  linesToString() {
    const result: string[] = [];

    forEach(this.lines, (r) => {
      result.push(r);
    });

    return result;
  }
}
