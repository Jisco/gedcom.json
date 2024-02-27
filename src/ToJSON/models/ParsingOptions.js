import { readFileSync } from 'fs';

export default class ParsingOptions {
  SetText(text) {
    this.text = text;
  }

  SetFilePath(path) {
    this.filePath = path;
  }

  SetConfigFile(path) {
    this.config = readFileSync(path, 'utf8');
  }

  SetConfig(config) {
    this.config = config;
  }

  GetText() {
    return this.text;
  }

  GetFilePath() {
    return this.filePath;
  }

  GetConfig() {
    return this.config ?? readFileSync('options/version551.yaml', 'utf8');
  }

  SetProgressFunction(func) {
    this.progressFunction = func;
  }

  GetProgressFunction() {
    return this.progressFunction;
  }
}
