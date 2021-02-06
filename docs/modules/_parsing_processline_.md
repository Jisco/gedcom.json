**[gedcom-node](../README.md)**

> [Globals](../globals.md) / "parsing/processLine"

# Module: "parsing/processLine"

## Index

### Variables

* [actualParsingPath](_parsing_processline_.md#actualparsingpath)
* [addValuesToNextSubItem](_parsing_processline_.md#addvaluestonextsubitem)
* [createSubItem](_parsing_processline_.md#createsubitem)
* [isParsingReference](_parsing_processline_.md#isparsingreference)
* [parsedObject](_parsing_processline_.md#parsedobject)

### Functions

* [AddValueSingleOrPushInArray](_parsing_processline_.md#addvaluesingleorpushinarray)
* [ManipulateValue](_parsing_processline_.md#manipulatevalue)
* [ProcessLine](_parsing_processline_.md#processline)
* [ResetProcessing](_parsing_processline_.md#resetprocessing)
* [SearchTag](_parsing_processline_.md#searchtag)

### Object literals

* [createSingleValueItem](_parsing_processline_.md#createsinglevalueitem)

## Variables

### actualParsingPath

• `Let` **actualParsingPath**: any[] = []

*Defined in [parsing/processLine.ts:27](https://github.com/Jisco/GEDCOM-Node/blob/583e05d/src/parsing/processLine.ts#L27)*

the actual parsed path eg [ TAG1, TAG2, ... ]

**`internal`** 

___

### addValuesToNextSubItem

• `Let` **addValuesToNextSubItem**: any[] = []

*Defined in [parsing/processLine.ts:44](https://github.com/Jisco/GEDCOM-Node/blob/583e05d/src/parsing/processLine.ts#L44)*

store to save property for an later created subitem

**`internal`** 

___

### createSubItem

• `Let` **createSubItem**: boolean = false

*Defined in [parsing/processLine.ts:38](https://github.com/Jisco/GEDCOM-Node/blob/583e05d/src/parsing/processLine.ts#L38)*

if true a subitem will be created

**`internal`** 

___

### isParsingReference

• `Let` **isParsingReference**: boolean = false

*Defined in [parsing/processLine.ts:32](https://github.com/Jisco/GEDCOM-Node/blob/583e05d/src/parsing/processLine.ts#L32)*

if true the line will be parsed, when false all lines will be ignored until a new reference object will be found

**`internal`** 

___

### parsedObject

• `Let` **parsedObject**: object

*Defined in [parsing/processLine.ts:22](https://github.com/Jisco/GEDCOM-Node/blob/583e05d/src/parsing/processLine.ts#L22)*

the actual parsed object, can span multiple lines

**`internal`** 

## Functions

### AddValueSingleOrPushInArray

▸ **AddValueSingleOrPushInArray**(`obj`: any, `property`: any, `attribute`: any, `lineValue`: any): void

*Defined in [parsing/processLine.ts:296](https://github.com/Jisco/GEDCOM-Node/blob/583e05d/src/parsing/processLine.ts#L296)*

Function that adds an value as own property, or if the property is already defined replaces it with array or pushes the new value to the array

**`internal`** 

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`obj` | any | the target object |
`property` | any | the target property |
`attribute` | any | the target attribute definition |
`lineValue` | any | the line content |

**Returns:** void

___

### ManipulateValue

▸ **ManipulateValue**(`attribute`: any, `value`: any): any

*Defined in [parsing/processLine.ts:318](https://github.com/Jisco/GEDCOM-Node/blob/583e05d/src/parsing/processLine.ts#L318)*

Function to manipulate the line value

**`internal`** 

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`attribute` | any | the target attribute definition |
`value` | any | the value |

**Returns:** any

___

### ProcessLine

▸ **ProcessLine**(`line`: [ParsedLine](../classes/_models_parsedline_.parsedline.md), `lastLevel`: number, `result`: Object, `options`: any): Boolean

*Defined in [parsing/processLine.ts:79](https://github.com/Jisco/GEDCOM-Node/blob/583e05d/src/parsing/processLine.ts#L79)*

Processes a line

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`line` | [ParsedLine](../classes/_models_parsedline_.parsedline.md) | The previously parsed line |
`lastLevel` | number | The level of the previous line |
`result` | Object | The actual object |
`options` | any | The options to process the line  |

**Returns:** Boolean

___

### ResetProcessing

▸ **ResetProcessing**(): void

*Defined in [parsing/processLine.ts:58](https://github.com/Jisco/GEDCOM-Node/blob/583e05d/src/parsing/processLine.ts#L58)*

Resets all variables, which are used for parsing

**Returns:** void

___

### SearchTag

▸ **SearchTag**(`options`: any, `path`: any[], `stopTag?`: string): object

*Defined in [parsing/processLine.ts:352](https://github.com/Jisco/GEDCOM-Node/blob/583e05d/src/parsing/processLine.ts#L352)*

Function to search for an specific tag in the given options

**`internal`** 

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`options` | any | - | the options |
`path` | any[] | - | the search path |
`stopTag` | string | undefined | if defined the search will stop is this tag is found |

**Returns:** object

Name | Type |
------ | ------ |
`Attribute` | any |
`Parent` | any |

## Object literals

### createSingleValueItem

▪ `Let` **createSingleValueItem**: object

*Defined in [parsing/processLine.ts:50](https://github.com/Jisco/GEDCOM-Node/blob/583e05d/src/parsing/processLine.ts#L50)*

store to evaluated if a property should be passed to an single item

**`internal`** 

#### Properties:

Name | Type | Value |
------ | ------ | ------ |
`createSubItem` | boolean | false |
`level` | number | 0 |
