import isObject from "lodash/isObject";

import ConvertTo from "./converter/ConvertTo";
import ConvertToArray from "./converter/ConvertToArray";
import ConvertToDate from "./converter/ConvertToDate";
import ConvertToString from "./converter/ConvertToString";
import ConvertToTime from "./converter/ConvertToTime";

export default class TagDefinition {
    constructor(plainJsObject: any) {
        this.CollectAs = plainJsObject.CollectAs;
        this.Tag = plainJsObject.Tag;
        this.MergeWithLast = plainJsObject.MergeWithLast?.toString();
        this.MergeWithNext = plainJsObject.MergeWithNext;      
        this.Type = plainJsObject.Type;
        this.IsSingleValue = plainJsObject.IsSingleValue;
        this.CollectAsArray = plainJsObject.CollectAsArray === true;
        this.StartWith = plainJsObject.StartWith;        
        
        if (isObject(plainJsObject.Property)) {
            let propertyWithOption = new PropertyWithOption(plainJsObject.Property);
            this.Property = propertyWithOption.Name;
            this.PropertyType = propertyWithOption.Type;
        }
        else {
            this.Property = plainJsObject.Property;
        }
        
        if (plainJsObject.Replace) {
            this.Replace = new ReplaceValue(plainJsObject.Replace.Value, plainJsObject.Replace.With);
        }

        if (plainJsObject.StripHtml) {
            this.StripHtml = plainJsObject.StripHtml;
        }

        this.ConvertTo = CreateConvertTo(plainJsObject.Type, plainJsObject.ConvertTo);
    }

    CollectAs?: string;
    StartWith?: string;
    CollectAsArray?: Boolean;
    Property?: string;
    Tag: string = "";
    MergeWithLast?: string;
    Replace?: ReplaceValue;
    StripHtml?: Boolean;
    ConvertTo?: ConvertTo;
    Type?: string;
    MergeWithNext?: string;
    IsSingleValue?: Boolean;
    PropertyType?: ConvertTo;

    get Path(): string {
        return this.CollectAs ?? this.Property ?? "";
    }
}

class ReplaceValue {
    constructor(value: string, withProperty: string) {
        this.Value = value;
        this.With = withProperty;
    }

    Value: string;
    With: string;
}

class PropertyWithOption {
    constructor(property: any) {
        this.Name = property.Name;

        if (property.Type) {
            this.Type = CreateConvertTo(property.Type);   
            return;
        }

        this.Type = CreateConvertTo(undefined, property.ConvertTo);
    }

    Name?: string;
    Type?: ConvertTo;
}

function CreateConvertTo(type?: string, convertTo?: any) : ConvertTo | undefined {
    let setConvertToDate = () : ConvertToDate => {
        return new ConvertToDate(convertTo?.About,
            convertTo?.Calculated,
            convertTo?.Estimated,
            convertTo?.Before,
            convertTo?.After,
            convertTo?.Between,
            convertTo?.And,
            convertTo?.Interpreted,
            convertTo?.From,
            convertTo?.To,
            convertTo?.Value,
            convertTo?.HasMonth,
            convertTo?.HasYear,
            convertTo?.HasDay,
            convertTo?.Original,
            convertTo?.Calendar);
    }

    let setConvertToString = () : ConvertToString => {
        return new ConvertToString(convertTo?.NewLineCharacter, convertTo?.NewLineIfEmpty);
    }

    let setConvertToArray = () : ConvertToArray => {
        return new ConvertToArray(convertTo?.Delimiter);
    }

    let setConvertToTime = () : ConvertToTime => {
        return new ConvertToTime();
    }

    if (type) {
        switch(type) {
            case "Date":
                return setConvertToDate();
            case "String":
                return setConvertToString();
            case "Array":
                return setConvertToArray();
            case "Time":
                return setConvertToTime();
        }
    }

    if (convertTo) {
        switch(convertTo.Type) {
            case "String":
                return setConvertToString();
            case "Date":
                return setConvertToDate();
            case "Array":
                return setConvertToArray();
            case "Time":
                return setConvertToTime();
        }
    }

    return;
}