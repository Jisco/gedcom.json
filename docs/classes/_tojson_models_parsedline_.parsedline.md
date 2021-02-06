**[gedcom.js](../README.md)**

> [Globals](../globals.md) / ["ToJSON/models/ParsedLine"](../modules/_tojson_models_parsedline_.md) / ParsedLine

# Class: ParsedLine

Class with informations about the parsed line

## Hierarchy

* **ParsedLine**

## Index

### Constructors

* [constructor](_tojson_models_parsedline_.parsedline.md#constructor)

### Properties

* [Level](_tojson_models_parsedline_.parsedline.md#level)
* [LineNumber](_tojson_models_parsedline_.parsedline.md#linenumber)
* [ReferenceId](_tojson_models_parsedline_.parsedline.md#referenceid)
* [Tag](_tojson_models_parsedline_.parsedline.md#tag)
* [Value](_tojson_models_parsedline_.parsedline.md#value)

## Constructors

### constructor

\+ **new ParsedLine**(`lineNumber`: number, `level`: number, `tag`: string, `value?`: string, `refId?`: string): [ParsedLine](_tojson_models_parsedline_.parsedline.md)

*Defined in [ToJSON/models/ParsedLine.ts:4](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/models/ParsedLine.ts#L4)*

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`lineNumber` | number | - | line number |
`level` | number | - | level in hierarchy |
`tag` | string | - | line tag |
`value` | string | "" | value = line text without level and tag\reference id |
`refId` | string | "" | reference id  |

**Returns:** [ParsedLine](_tojson_models_parsedline_.parsedline.md)

## Properties

### Level

•  **Level**: number

*Defined in [ToJSON/models/ParsedLine.ts:31](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/models/ParsedLine.ts#L31)*

The line level

___

### LineNumber

•  **LineNumber**: number

*Defined in [ToJSON/models/ParsedLine.ts:27](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/models/ParsedLine.ts#L27)*

The line number

___

### ReferenceId

•  **ReferenceId**: string

*Defined in [ToJSON/models/ParsedLine.ts:23](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/models/ParsedLine.ts#L23)*

The reference id of the line when defined

___

### Tag

•  **Tag**: string

*Defined in [ToJSON/models/ParsedLine.ts:35](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/models/ParsedLine.ts#L35)*

The line tag

___

### Value

•  **Value**: string \| undefined

*Defined in [ToJSON/models/ParsedLine.ts:39](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/models/ParsedLine.ts#L39)*

The line value if defined
