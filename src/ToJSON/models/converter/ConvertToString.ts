import ConvertTo from "./ConvertTo";

export default class ConvertToString extends ConvertTo {    
    constructor(newLineCharacter?: string, newLineIfEmpty?:boolean) {
        super("String");
        this.NewLineCharacter = newLineCharacter ?? "\n";
        this.NewLineIfEmpty = newLineIfEmpty;
    }

    NewLineCharacter?: string;
    NewLineIfEmpty?: Boolean;
}