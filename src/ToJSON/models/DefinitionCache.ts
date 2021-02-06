export default class DefinitionCache {
    constructor (path: string[], definition: any) {
        this.Path = path;
        this.Definition = definition;
    }

    Path: string[] = [];
    Definition: any;
}