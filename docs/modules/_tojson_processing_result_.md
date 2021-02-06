**[gedcom.js](../README.md)**

> [Globals](../globals.md) / "ToJSON/processing/result"

# Module: "ToJSON/processing/result"

## Index

### Classes

* [MainObject](../classes/_tojson_processing_result_.mainobject.md)

### Functions

* [CreateMainObject](_tojson_processing_result_.md#createmainobject)
* [CreateResult](_tojson_processing_result_.md#createresult)
* [GetMainObjectIndexes](_tojson_processing_result_.md#getmainobjectindexes)
* [SetObject](_tojson_processing_result_.md#setobject)
* [SetOrCreateArray](_tojson_processing_result_.md#setorcreatearray)

## Functions

### CreateMainObject

▸ **CreateMainObject**(`objects`: [ParsingObject](../classes/_tojson_models_parsingobject_.parsingobject.md)[]): [MainObject](../classes/_tojson_processing_result_.mainobject.md)

*Defined in [ToJSON/processing/result.ts:52](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/processing/result.ts#L52)*

#### Parameters:

Name | Type |
------ | ------ |
`objects` | [ParsingObject](../classes/_tojson_models_parsingobject_.parsingobject.md)[] |

**Returns:** [MainObject](../classes/_tojson_processing_result_.mainobject.md)

___

### CreateResult

▸ **CreateResult**(`objects`: [ParsingObject](../classes/_tojson_models_parsingobject_.parsingobject.md)[]): object

*Defined in [ToJSON/processing/result.ts:32](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/processing/result.ts#L32)*

#### Parameters:

Name | Type |
------ | ------ |
`objects` | [ParsingObject](../classes/_tojson_models_parsingobject_.parsingobject.md)[] |

**Returns:** object

___

### GetMainObjectIndexes

▸ **GetMainObjectIndexes**(`objects`: [ParsingObject](../classes/_tojson_models_parsingobject_.parsingobject.md)[]): { EndIndex: number = endIndex; StartIndex: number = startIndex }[]

*Defined in [ToJSON/processing/result.ts:216](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/processing/result.ts#L216)*

#### Parameters:

Name | Type |
------ | ------ |
`objects` | [ParsingObject](../classes/_tojson_models_parsingobject_.parsingobject.md)[] |

**Returns:** { EndIndex: number = endIndex; StartIndex: number = startIndex }[]

___

### SetObject

▸ **SetObject**(`mainObject`: Object, `path`: string[], `value`: Object, `definition`: [TagDefinition](../classes/_tojson_models_tagdefinition_.tagdefinition.md)): void

*Defined in [ToJSON/processing/result.ts:247](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/processing/result.ts#L247)*

#### Parameters:

Name | Type |
------ | ------ |
`mainObject` | Object |
`path` | string[] |
`value` | Object |
`definition` | [TagDefinition](../classes/_tojson_models_tagdefinition_.tagdefinition.md) |

**Returns:** void

___

### SetOrCreateArray

▸ **SetOrCreateArray**(`obj`: any, `path`: string[], `definition`: [TagDefinition](../classes/_tojson_models_tagdefinition_.tagdefinition.md), `value`: any): void

*Defined in [ToJSON/processing/result.ts:278](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/processing/result.ts#L278)*

#### Parameters:

Name | Type |
------ | ------ |
`obj` | any |
`path` | string[] |
`definition` | [TagDefinition](../classes/_tojson_models_tagdefinition_.tagdefinition.md) |
`value` | any |

**Returns:** void
