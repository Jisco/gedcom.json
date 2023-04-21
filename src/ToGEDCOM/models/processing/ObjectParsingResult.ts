import { first, forEach, includes, indexOf, split, tail } from "lodash";
import ITagDefinition from "../../../Common/interfaces/ITagDefinition";
import Statistics from "../statistics/Statistics";

const eachDeep = require("deepdash/eachDeep");
export default class ObjectParsingResult {
  stats = new Statistics();
  lines: string[] = [];
  mergeLineProperties: ITagDefinition[] = [];
  processableProperties: string[] = [];
  processedProperties: string[] = [];
  private progressFunction: (
    propertiesCount: number,
    actualproperty: number
  ) => void = () => {
    // do nothing
  };

  addLine(
    path: string,
    depth: number,
    tag: string,
    value: string | undefined = undefined
  ) {
    if (!value) {
      this.lines.push(`${depth} ${tag}`);
      this.endProcessingProperty(path, value);
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
    this.endProcessingProperty(path, value);

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

  startProcessingProperty(path: string) {
    if (!includes(this.processedProperties, path)) {
      this.processedProperties.push(path);

      if (this.progressFunction) {
        this.progressFunction(
          this.processableProperties.length,
          this.processedProperties.length
        );
      }
    }
  }

  endProcessingPropertyWithError(
    path: string,
    value: string | undefined = undefined,
    reason: string
  ) {
    this.stats.IncorrectProperties.push({
      Path: path,
      Value: value,
      Error: reason,
    });
  }

  endProcessingPropertyFailed(
    path: string,
    value: string | undefined = undefined
  ) {
    this.stats.NotParsedProperties.push({
      Path: path,
      Value: value,
    });
  }

  endProcessingProperty(path: string, value: string | undefined = undefined) {
    this.stats.ParsedProperties.push({
      Path: path,
      Value: value,
    });
  }

  setProcessablePropertyPaths(object: object) {
    eachDeep(object, (val: any, key: string, parent: any, context: any) => {
      this.processableProperties.push(context.path);
    });

    // console.log(this.processableProperties);
  }

  setProgressFunction(
    invokeProgressFunction: (
      propertiesCount: number,
      actualproperty: number
    ) => void
  ) {
    this.progressFunction = invokeProgressFunction;
  }
}
