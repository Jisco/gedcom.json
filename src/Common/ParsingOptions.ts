export default class ParsingOptions {
    private text?: string;
    private object?: object;
    private filePath?: string;
    private config?: string;
    private progressFunction?: (propertiesCount: number, actualProperty: number) => void;

    SetText(text: string) {
        this.text = text;
    }

    SetObject(object: object) {
        this.object = object;
    }

    SetFilePath(path: string) {
        this.filePath = path;
    }

    SetConfigFile(path: string) {
        this.config = require('fs').readFileSync(path, 'utf8');
    }

    SetConfig(config: string) {
        this.config = config;
    }

    GetText() {
        return this.text;
    }

    GetObject() {
        return this.object;
    }

    GetFilePath() {
        return this.filePath;
    }

    GetConfig() {
        return this.config ?? require('fs').readFileSync('options/version551.yaml', 'utf8');
    }

    SetProgressFunction(func: (propertiesCount: number, actualProperty: number) => void) {
        this.progressFunction = func;
    }

    GetProgressFunction() : ((propertiesCount: number, actualProperty: number) => void) | undefined {
        return this.progressFunction;
    }
}