**[gedcom.js](../README.md)**

> [Globals](../globals.md) / "ToJSON/parsing/parseLine"

# Module: "ToJSON/parsing/parseLine"

## Index

### Functions

* [ParseLine](_tojson_parsing_parseline_.md#parseline)

## Functions

### ParseLine

▸ **ParseLine**(`line`: string, `lineNumber`: number, `lastLevel`: number): [ParsedLine](../classes/_tojson_models_parsedline_.parsedline.md) \| undefined

*Defined in [ToJSON/parsing/parseLine.ts:18](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/parsing/parseLine.ts#L18)*

Parses a line

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`line` | string | The line |
`lineNumber` | number | The line number |
`lastLevel` | number | The level of the last parent |

**Returns:** [ParsedLine](../classes/_tojson_models_parsedline_.parsedline.md) \| undefined

The ParsedLine object if it is a correct gedcom line else undefined
