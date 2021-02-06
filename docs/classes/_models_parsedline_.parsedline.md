**[gedcom-node](../README.md)**

> [Globals](../globals.md) / ["models/ParsedLine"](../modules/_models_parsedline_.md) / ParsedLine

# Class: ParsedLine

Class with informations about the parsed line

## Hierarchy

* **ParsedLine**

## Index

### Constructors

* [constructor](_models_parsedline_.parsedline.md#constructor)

### Properties

* [Level](_models_parsedline_.parsedline.md#level)
* [LineNumber](_models_parsedline_.parsedline.md#linenumber)
* [ReferenceId](_models_parsedline_.parsedline.md#referenceid)
* [Tag](_models_parsedline_.parsedline.md#tag)
* [Value](_models_parsedline_.parsedline.md#value)

## Constructors

### constructor

\+ **new ParsedLine**(`lineNumber`: number, `level`: number, `tag`: string, `value?`: string, `refId?`: string): [ParsedLine](_models_parsedline_.parsedline.md)

*Defined in [models/ParsedLine.ts:4](https://github.com/Jisco/GEDCOM-Node/blob/583e05d/src/models/ParsedLine.ts#L4)*

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`lineNumber` | number | - | line number |
`level` | number | - | level in hierarchy |
`tag` | string | - | line tag |
`value` | string | undefined | value = line text without level and tag\reference id |
`refId` | string | undefined | reference id  |

**Returns:** [ParsedLine](_models_parsedline_.parsedline.md)

## Properties

### Level

•  **Level**: number

*Defined in [models/ParsedLine.ts:31](https://github.com/Jisco/GEDCOM-Node/blob/583e05d/src/models/ParsedLine.ts#L31)*

The line level

___

### LineNumber

•  **LineNumber**: number

*Defined in [models/ParsedLine.ts:27](https://github.com/Jisco/GEDCOM-Node/blob/583e05d/src/models/ParsedLine.ts#L27)*

The line number

___

### ReferenceId

•  **ReferenceId**: string

*Defined in [models/ParsedLine.ts:23](https://github.com/Jisco/GEDCOM-Node/blob/583e05d/src/models/ParsedLine.ts#L23)*

The reference id of the line when defined

___

### Tag

•  **Tag**: string

*Defined in [models/ParsedLine.ts:35](https://github.com/Jisco/GEDCOM-Node/blob/583e05d/src/models/ParsedLine.ts#L35)*

The line tag

___

### Value

•  **Value**: string \| undefined

*Defined in [models/ParsedLine.ts:39](https://github.com/Jisco/GEDCOM-Node/blob/583e05d/src/models/ParsedLine.ts#L39)*

The line value if defined
