import { ParseFile, ParseText } from "../parsing/parsing";
import ParsingResult from "./ParsingResult";

const fs = require('fs');

export default class Parsing {
    constructor() {
        this.config = fs.readFileSync('options/version551.yaml', 'utf8');
    }

    private text?: string;
    private filePath?: string;
    private config: string;

    SetText(text: string) {
        this.text = text;
    }

    SetFilePath(path: string) {
        this.filePath = path;
    }

    SetConfigFile(path: string) {
        this.config = fs.readFileSync(path, 'utf8');
    }

    SetConfig(config: string) {
        this.config = config;
    }

    SaveAs(result: Object, path: string) {
        fs.writeFileSync(path, JSON.stringify(result, null, 1));
    }

    ParseText(): Object {
        if (!this.text) {
            return { };
        }

        return ParseText(this.text, this.config);
    }

    ParseTextAsync(): Promise<ParsingResult> {
        if (!this.text) {
            return new Promise<ParsingResult>((resolve, reject) => {
                reject("No text definied");
            });
        }

        return new Promise<ParsingResult>((resolve, reject) => {
            resolve(ParseText(this.text, this.config));
        });
    }

    ParseFile(doneCallback: (result: ParsingResult) => void, errorCallback: Function) {
        if (!this.filePath) {
            return;
        }

        ParseFile(this.filePath, this.config, doneCallback, errorCallback);
    }

    ParseFileAsync(): Promise<ParsingResult> {
        if (!this.filePath) {
            return new Promise<ParsingResult>((resolve, reject) => {
                reject("No file path definied");
            });
        }

        return new Promise<ParsingResult>((resolve, reject) => {
            this.ParseFile(r => resolve(r), (e:any) => reject(e));
        });
    }
}