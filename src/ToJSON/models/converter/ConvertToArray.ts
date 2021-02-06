import ConvertTo from "./ConvertTo";

export default class ConvertToArray extends ConvertTo {
    constructor(delimiter: string) {
        super("Array");
        this.Delimiter = delimiter ?? ",";
    }

    Delimiter?: string;
}