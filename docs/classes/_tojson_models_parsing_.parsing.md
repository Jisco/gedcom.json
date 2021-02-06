**[gedcom.js](../README.md)**

> [Globals](../globals.md) / ["ToJSON/models/Parsing"](../modules/_tojson_models_parsing_.md) / Parsing

# Class: Parsing

## Hierarchy

* **Parsing**

## Index

### Constructors

* [constructor](_tojson_models_parsing_.parsing.md#constructor)

### Properties

* [config](_tojson_models_parsing_.parsing.md#config)
* [filePath](_tojson_models_parsing_.parsing.md#filepath)
* [text](_tojson_models_parsing_.parsing.md#text)

### Methods

* [ParseFile](_tojson_models_parsing_.parsing.md#parsefile)
* [ParseFileAsync](_tojson_models_parsing_.parsing.md#parsefileasync)
* [ParseText](_tojson_models_parsing_.parsing.md#parsetext)
* [ParseTextAsync](_tojson_models_parsing_.parsing.md#parsetextasync)
* [SaveAs](_tojson_models_parsing_.parsing.md#saveas)
* [SetConfig](_tojson_models_parsing_.parsing.md#setconfig)
* [SetConfigFile](_tojson_models_parsing_.parsing.md#setconfigfile)
* [SetFilePath](_tojson_models_parsing_.parsing.md#setfilepath)
* [SetText](_tojson_models_parsing_.parsing.md#settext)

## Constructors

### constructor

\+ **new Parsing**(): [Parsing](_tojson_models_parsing_.parsing.md)

*Defined in [ToJSON/models/Parsing.ts:6](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/models/Parsing.ts#L6)*

**Returns:** [Parsing](_tojson_models_parsing_.parsing.md)

## Properties

### config

• `Private` **config**: string

*Defined in [ToJSON/models/Parsing.ts:13](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/models/Parsing.ts#L13)*

___

### filePath

• `Private` `Optional` **filePath**: undefined \| string

*Defined in [ToJSON/models/Parsing.ts:12](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/models/Parsing.ts#L12)*

___

### text

• `Private` `Optional` **text**: undefined \| string

*Defined in [ToJSON/models/Parsing.ts:11](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/models/Parsing.ts#L11)*

## Methods

### ParseFile

▸ **ParseFile**(`doneCallback`: (result: [ParsingResult](_tojson_models_parsingresult_.parsingresult.md)) => void, `errorCallback`: Function): void

*Defined in [ToJSON/models/Parsing.ts:55](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/models/Parsing.ts#L55)*

#### Parameters:

Name | Type |
------ | ------ |
`doneCallback` | (result: [ParsingResult](_tojson_models_parsingresult_.parsingresult.md)) => void |
`errorCallback` | Function |

**Returns:** void

___

### ParseFileAsync

▸ **ParseFileAsync**(): Promise<[ParsingResult](_tojson_models_parsingresult_.parsingresult.md)\>

*Defined in [ToJSON/models/Parsing.ts:63](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/models/Parsing.ts#L63)*

**Returns:** Promise<[ParsingResult](_tojson_models_parsingresult_.parsingresult.md)\>

___

### ParseText

▸ **ParseText**(): Object

*Defined in [ToJSON/models/Parsing.ts:35](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/models/Parsing.ts#L35)*

**Returns:** Object

___

### ParseTextAsync

▸ **ParseTextAsync**(): Promise<[ParsingResult](_tojson_models_parsingresult_.parsingresult.md)\>

*Defined in [ToJSON/models/Parsing.ts:43](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/models/Parsing.ts#L43)*

**Returns:** Promise<[ParsingResult](_tojson_models_parsingresult_.parsingresult.md)\>

___

### SaveAs

▸ **SaveAs**(`result`: Object, `path`: string): void

*Defined in [ToJSON/models/Parsing.ts:31](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/models/Parsing.ts#L31)*

#### Parameters:

Name | Type |
------ | ------ |
`result` | Object |
`path` | string |

**Returns:** void

___

### SetConfig

▸ **SetConfig**(`config`: string): void

*Defined in [ToJSON/models/Parsing.ts:27](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/models/Parsing.ts#L27)*

#### Parameters:

Name | Type |
------ | ------ |
`config` | string |

**Returns:** void

___

### SetConfigFile

▸ **SetConfigFile**(`path`: string): void

*Defined in [ToJSON/models/Parsing.ts:23](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/models/Parsing.ts#L23)*

#### Parameters:

Name | Type |
------ | ------ |
`path` | string |

**Returns:** void

___

### SetFilePath

▸ **SetFilePath**(`path`: string): void

*Defined in [ToJSON/models/Parsing.ts:19](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/models/Parsing.ts#L19)*

#### Parameters:

Name | Type |
------ | ------ |
`path` | string |

**Returns:** void

___

### SetText

▸ **SetText**(`text`: string): void

*Defined in [ToJSON/models/Parsing.ts:15](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/models/Parsing.ts#L15)*

#### Parameters:

Name | Type |
------ | ------ |
`text` | string |

**Returns:** void
