**[gedcom-node](../README.md)**

> [Globals](../globals.md) / "parsing/parsing"

# Module: "parsing/parsing"

## Index

### Functions

* [ParseFile](_parsing_parsing_.md#parsefile)
* [ParseText](_parsing_parsing_.md#parsetext)
* [ProcessNewLine](_parsing_parsing_.md#processnewline)

## Functions

### ParseFile

▸ **ParseFile**(`path`: string, `options`: any, `doneCallback`: Function, `errorCallback`: Function): void

*Defined in [parsing/parsing.ts:53](https://github.com/Jisco/GEDCOM-Node/blob/583e05d/src/parsing/parsing.ts#L53)*

Parses a file to an object

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`path` | string | The file path |
`options` | any | The parsing options |
`doneCallback` | Function | Returns the resulting object when file is readed completly |
`errorCallback` | Function | Returns file reading errors |

**Returns:** void

An object which includes the parsed object and parsing statistics

___

### ParseText

▸ **ParseText**(`text`: string, `options`: any, `doneCallback`: Function): void

*Defined in [parsing/parsing.ts:18](https://github.com/Jisco/GEDCOM-Node/blob/583e05d/src/parsing/parsing.ts#L18)*

Parses a text to an object

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`text` | string | The text |
`options` | any | The parsing options |
`doneCallback` | Function | Returns the resulting object when all text lines are processed |

**Returns:** void

An object which includes the parsed object and parsing statistics

___

### ProcessNewLine

▸ **ProcessNewLine**(`lastLevel`: any, `lineNumber`: any, `line`: any, `result`: any, `options`: any, `stats`: [Statistics](../classes/_models_statistics_.statistics.md), `nextLine`: Function): void

*Defined in [parsing/parsing.ts:103](https://github.com/Jisco/GEDCOM-Node/blob/583e05d/src/parsing/parsing.ts#L103)*

Function that processes a text line

**`internal`** 

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`lastLevel` | any | level of the last level |
`lineNumber` | any | line number |
`line` | any | line content |
`result` | any | result object |
`options` | any | parsing options |
`stats` | [Statistics](../classes/_models_statistics_.statistics.md) | statistics object |
`nextLine` | Function | function to invoke the processing of the next line |

**Returns:** void
