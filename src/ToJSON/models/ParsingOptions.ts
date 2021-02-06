export default class ParsingOptions {
    private text?: string;
    private filePath?: string;
    private config?: string;

    SetText(text: string) {
        this.text = text;
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

    GetFilePath() {
        return this.filePath;
    }

    GetConfig() {
        return this.config ?? require('fs').readFileSync('options/version551.yaml', 'utf8');
    }
}