**[gedcom-node](../README.md)**

> [Globals](../globals.md) / "parsing/parseLine"

# Module: "parsing/parseLine"

## Index

### Functions

* [ParseLine](_parsing_parseline_.md#parseline)

## Functions

### ParseLine

▸ **ParseLine**(`line`: string, `lineNumber`: number, `lastLevel`: number): [ParsedLine](../classes/_models_parsedline_.parsedline.md)

*Defined in [parsing/parseLine.ts:15](https://github.com/Jisco/GEDCOM-Node/blob/583e05d/src/parsing/parseLine.ts#L15)*

Parses a line

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`line` | string | The line |
`lineNumber` | number | The line number |
`lastLevel` | number | The level of the last parent |

**Returns:** [ParsedLine](../classes/_models_parsedline_.parsedline.md)

The ParsedLine object if it is a correct gedcom line else undefined
