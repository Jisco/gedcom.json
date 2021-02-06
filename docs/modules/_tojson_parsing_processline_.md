**[gedcom.js](../README.md)**

> [Globals](../globals.md) / "ToJSON/parsing/processLine"

# Module: "ToJSON/parsing/processLine"

## Index

### Variables

* [eachDeep](_tojson_parsing_processline_.md#eachdeep)
* [parsingOptions](_tojson_parsing_processline_.md#parsingoptions)
* [store](_tojson_parsing_processline_.md#store)

### Functions

* [AdjustPath](_tojson_parsing_processline_.md#adjustpath)
* [EndProcessing](_tojson_parsing_processline_.md#endprocessing)
* [GetLocalDefinition](_tojson_parsing_processline_.md#getlocaldefinition)
* [GetResult](_tojson_parsing_processline_.md#getresult)
* [GetTagDefinition](_tojson_parsing_processline_.md#gettagdefinition)
* [ProcessLine](_tojson_parsing_processline_.md#processline)
* [ProcessStartLevel](_tojson_parsing_processline_.md#processstartlevel)
* [ResetProcessing](_tojson_parsing_processline_.md#resetprocessing)
* [SearchDefinitionDeep](_tojson_parsing_processline_.md#searchdefinitiondeep)
* [SetParsingOptions](_tojson_parsing_processline_.md#setparsingoptions)

## Variables

### eachDeep

• `Const` **eachDeep**: any = require('deepdash/eachDeep')

*Defined in [ToJSON/parsing/processLine.ts:17](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/parsing/processLine.ts#L17)*

___

### parsingOptions

• `Let` **parsingOptions**: any

*Defined in [ToJSON/parsing/processLine.ts:33](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/parsing/processLine.ts#L33)*

___

### store

• `Let` **store**: [Store](../classes/_tojson_models_store_.store.md) = new Store()

*Defined in [ToJSON/parsing/processLine.ts:23](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/parsing/processLine.ts#L23)*

Store for file\text processing

**`internal`** 

## Functions

### AdjustPath

▸ **AdjustPath**(`line`: [ParsedLine](../classes/_tojson_models_parsedline_.parsedline.md), `lastLevel`: number): void

*Defined in [ToJSON/parsing/processLine.ts:148](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/parsing/processLine.ts#L148)*

#### Parameters:

Name | Type |
------ | ------ |
`line` | [ParsedLine](../classes/_tojson_models_parsedline_.parsedline.md) |
`lastLevel` | number |

**Returns:** void

___

### EndProcessing

▸ **EndProcessing**(): void

*Defined in [ToJSON/parsing/processLine.ts:44](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/parsing/processLine.ts#L44)*

**Returns:** void

___

### GetLocalDefinition

▸ **GetLocalDefinition**(`tag`: string): [TagDefinition](../classes/_tojson_models_tagdefinition_.tagdefinition.md) \| undefined

*Defined in [ToJSON/parsing/processLine.ts:88](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/parsing/processLine.ts#L88)*

#### Parameters:

Name | Type |
------ | ------ |
`tag` | string |

**Returns:** [TagDefinition](../classes/_tojson_models_tagdefinition_.tagdefinition.md) \| undefined

___

### GetResult

▸ **GetResult**(): object

*Defined in [ToJSON/parsing/processLine.ts:38](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/parsing/processLine.ts#L38)*

**Returns:** object

___

### GetTagDefinition

▸ **GetTagDefinition**(`tag`: string): [TagDefinition](../classes/_tojson_models_tagdefinition_.tagdefinition.md) \| undefined

*Defined in [ToJSON/parsing/processLine.ts:162](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/parsing/processLine.ts#L162)*

#### Parameters:

Name | Type |
------ | ------ |
`tag` | string |

**Returns:** [TagDefinition](../classes/_tojson_models_tagdefinition_.tagdefinition.md) \| undefined

___

### ProcessLine

▸ **ProcessLine**(`line`: [ParsedLine](../classes/_tojson_models_parsedline_.parsedline.md), `lastLevel`: number): [LineParsingResult](../classes/_tojson_models_lineparsingresult_.lineparsingresult.md)

*Defined in [ToJSON/parsing/processLine.ts:49](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/parsing/processLine.ts#L49)*

#### Parameters:

Name | Type |
------ | ------ |
`line` | [ParsedLine](../classes/_tojson_models_parsedline_.parsedline.md) |
`lastLevel` | number |

**Returns:** [LineParsingResult](../classes/_tojson_models_lineparsingresult_.lineparsingresult.md)

___

### ProcessStartLevel

▸ **ProcessStartLevel**(`line`: [ParsedLine](../classes/_tojson_models_parsedline_.parsedline.md)): Boolean

*Defined in [ToJSON/parsing/processLine.ts:172](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/parsing/processLine.ts#L172)*

#### Parameters:

Name | Type |
------ | ------ |
`line` | [ParsedLine](../classes/_tojson_models_parsedline_.parsedline.md) |

**Returns:** Boolean

___

### ResetProcessing

▸ **ResetProcessing**(): void

*Defined in [ToJSON/parsing/processLine.ts:28](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/parsing/processLine.ts#L28)*

Resets all variables, which are used for parsing

**Returns:** void

___

### SearchDefinitionDeep

▸ **SearchDefinitionDeep**(`properties`: any[], `searchpath`: [ParsingPath](../classes/_tojson_models_parsingpath_.parsingpath.md)[], `searchedTag`: string): any

*Defined in [ToJSON/parsing/processLine.ts:105](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/parsing/processLine.ts#L105)*

#### Parameters:

Name | Type |
------ | ------ |
`properties` | any[] |
`searchpath` | [ParsingPath](../classes/_tojson_models_parsingpath_.parsingpath.md)[] |
`searchedTag` | string |

**Returns:** any

___

### SetParsingOptions

▸ **SetParsingOptions**(`options`: any): void

*Defined in [ToJSON/parsing/processLine.ts:34](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/parsing/processLine.ts#L34)*

#### Parameters:

Name | Type |
------ | ------ |
`options` | any |

**Returns:** void
