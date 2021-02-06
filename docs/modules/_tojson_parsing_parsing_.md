**[gedcom.js](../README.md)**

> [Globals](../globals.md) / "ToJSON/parsing/parsing"

# Module: "ToJSON/parsing/parsing"

## Index

### Variables

* [LineByLineReader](_tojson_parsing_parsing_.md#linebylinereader)
* [stats](_tojson_parsing_parsing_.md#stats)

### Functions

* [ParseFile](_tojson_parsing_parsing_.md#parsefile)
* [ParseText](_tojson_parsing_parsing_.md#parsetext)
* [ProcessNewLine](_tojson_parsing_parsing_.md#processnewline)

## Variables

### LineByLineReader

• `Const` **LineByLineReader**: any = require('line-by-line')

*Defined in [ToJSON/parsing/parsing.ts:15](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/parsing/parsing.ts#L15)*

___

### stats

• `Let` **stats**: [Statistics](../classes/_tojson_models_statistics_.statistics.md) = new Statistics()

*Defined in [ToJSON/parsing/parsing.ts:16](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/parsing/parsing.ts#L16)*

## Functions

### ParseFile

▸ **ParseFile**(`path`: string, `parsingOptions`: string, `doneCallback`: (result: [ParsingResult](../classes/_tojson_models_parsingresult_.parsingresult.md)) => void, `errorCallback`: any): void

*Defined in [ToJSON/parsing/parsing.ts:73](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/parsing/parsing.ts#L73)*

Parses a file to an object

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`path` | string | The file path |
`parsingOptions` | string | The parsing options |
`doneCallback` | (result: [ParsingResult](../classes/_tojson_models_parsingresult_.parsingresult.md)) => void | Returns the resulting object when file is readed completly |
`errorCallback` | any | Returns file reading errors |

**Returns:** void

An object which includes the parsed object and parsing statistics

___

### ParseText

▸ **ParseText**(`text?`: undefined \| string, `parsingOptions?`: undefined \| string): [ParsingResult](../classes/_tojson_models_parsingresult_.parsingresult.md)

*Defined in [ToJSON/parsing/parsing.ts:25](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/parsing/parsing.ts#L25)*

Parses a text to an object

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`text?` | undefined \| string | The text |
`parsingOptions?` | undefined \| string | The parsing options |

**Returns:** [ParsingResult](../classes/_tojson_models_parsingresult_.parsingresult.md)

An object which includes the parsed object and parsing statistics

___

### ProcessNewLine

▸ **ProcessNewLine**(`lastLevel`: number, `lineNumber`: number, `line`: string, `nextLine`: Function): [Statistics](../classes/_tojson_models_statistics_.statistics.md)

*Defined in [ToJSON/parsing/parsing.ts:128](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/parsing/parsing.ts#L128)*

Function that processes a text line

**`internal`** 

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`lastLevel` | number | level of the last level |
`lineNumber` | number | line number |
`line` | string | line content |
`nextLine` | Function | function to invoke the processing of the next line |

**Returns:** [Statistics](../classes/_tojson_models_statistics_.statistics.md)
