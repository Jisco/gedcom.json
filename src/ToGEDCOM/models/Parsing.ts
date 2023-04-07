import ParsingOptions from "../../Common/ParsingOptions";
import { ParseFile, ParseObject } from "../parsing/parsing";
import ParsingResult from "./statistics/ParsingResult";

export default class Parsing {
  constructor(parsingOptions?: ParsingOptions) {
    this.options = parsingOptions ?? new ParsingOptions();
  }

  private options: ParsingOptions;

  SaveAs(result: string, path: string) {
    require("fs").writeFileSync(path, result);
  }

  ParseObject(): ParsingResult {
    if (!this.options.GetText()) {
      return new ParsingResult([]);
    }

    return ParseObject(
      this.options.GetObject(),
      this.options.GetConfig(),
      this.options.GetProgressFunction()
    );
  }

  ParseObjectAsync(): Promise<ParsingResult> {
    if (!this.options.GetText()) {
      return new Promise<ParsingResult>((resolve, reject) => {
        reject("No text definied");
      });
    }

    return new Promise<ParsingResult>((resolve) => {
      resolve(
        ParseObject(
          this.options.GetObject(),
          this.options.GetConfig(),
          this.options.GetProgressFunction()
        )
      );
    });
  }

  ParseFile(
    doneCallback: (result: ParsingResult) => void,
    errorCallback: Function
  ) {
    const filePath = this.options.GetFilePath();
    if (!filePath) {
      return;
    }

    ParseFile(
      filePath,
      this.options.GetConfig(),
      doneCallback,
      errorCallback,
      this.options.GetProgressFunction()
    );
  }

  ParseFileAsync(): Promise<ParsingResult> {
    if (!this.options.GetFilePath()) {
      return new Promise<ParsingResult>((resolve, reject) => {
        reject("No file path definied");
      });
    }

    return new Promise<ParsingResult>((resolve, reject) => {
      this.ParseFile(
        (r) => resolve(r),
        (e: any) => reject(e)
      );
    });
  }
}
