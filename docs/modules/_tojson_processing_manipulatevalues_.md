**[gedcom.js](../README.md)**

> [Globals](../globals.md) / "ToJSON/processing/manipulateValues"

# Module: "ToJSON/processing/manipulateValues"

## Index

### Functions

* [AddStartWith](_tojson_processing_manipulatevalues_.md#addstartwith)
* [ConvertStringToArray](_tojson_processing_manipulatevalues_.md#convertstringtoarray)
* [ManipulateValue](_tojson_processing_manipulatevalues_.md#manipulatevalue)

## Functions

### AddStartWith

▸ **AddStartWith**(`startWith`: string \| undefined, `value`: string \| undefined): string

*Defined in [ToJSON/processing/manipulateValues.ts:62](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/processing/manipulateValues.ts#L62)*

#### Parameters:

Name | Type |
------ | ------ |
`startWith` | string \| undefined |
`value` | string \| undefined |

**Returns:** string

___

### ConvertStringToArray

▸ **ConvertStringToArray**(`convertOptions`: [ConvertToArray](../classes/_tojson_models_converter_converttoarray_.converttoarray.md), `value`: string): string[]

*Defined in [ToJSON/processing/manipulateValues.ts:78](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/processing/manipulateValues.ts#L78)*

#### Parameters:

Name | Type |
------ | ------ |
`convertOptions` | [ConvertToArray](../classes/_tojson_models_converter_converttoarray_.converttoarray.md) |
`value` | string |

**Returns:** string[]

___

### ManipulateValue

▸ **ManipulateValue**(`definition`: [TagDefinition](../classes/_tojson_models_tagdefinition_.tagdefinition.md), `line`: [ParsedLine](../classes/_tojson_models_parsedline_.parsedline.md)): undefined \| {}

*Defined in [ToJSON/processing/manipulateValues.ts:15](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/processing/manipulateValues.ts#L15)*

#### Parameters:

Name | Type |
------ | ------ |
`definition` | [TagDefinition](../classes/_tojson_models_tagdefinition_.tagdefinition.md) |
`line` | [ParsedLine](../classes/_tojson_models_parsedline_.parsedline.md) |

**Returns:** undefined \| {}
