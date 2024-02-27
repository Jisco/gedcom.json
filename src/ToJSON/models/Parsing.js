import { ParseFile, ParseText } from '../parsing/parsing.js';
import ParsingOptions from './ParsingOptions.js';
import ParsingResult from './ParsingResult.js';

export default class Parsing {
  constructor(parsingOptions) {
    this.options = parsingOptions ?? new ParsingOptions();
  }

  SaveAs(result, path) {
    require('fs').writeFileSync(path, JSON.stringify(result, null, 1));
  }

  ParseText() {
    if (!this.options.GetText()) {
      return new ParsingResult({});
    }

    return ParseText(this.options.GetText(), this.options.GetConfig(), this.options.GetProgressFunction());
  }

  ParseTextAsync() {
    if (!this.options.GetText()) {
      return Promise.reject(new Error('No text defined'));
    }

    return Promise.resolve(
      ParseText(this.options.GetText(), this.options.GetConfig(), this.options.GetProgressFunction())
    );
  }

  ParseFile(doneCallback, errorCallback) {
    let filePath = this.options.GetFilePath();
    if (!filePath) {
      return;
    }

    ParseFile(filePath, this.options.GetConfig(), doneCallback, errorCallback, this.options.GetProgressFunction());
  }

  ParseFileAsync() {
    if (!this.options.GetFilePath()) {
      return Promise.reject(new Error('No file path defined'));
    }

    return new Promise((resolve, reject) => {
      this.ParseFile(
        (r) => resolve(r),
        (e) => reject(e)
      );
    });
  }
}
