**[gedcom.js](../README.md)**

> [Globals](../globals.md) / ["ToJSON/models/Store"](../modules/_tojson_models_store_.md) / Store

# Class: Store

## Hierarchy

* **Store**

## Index

### Constructors

* [constructor](_tojson_models_store_.store.md#constructor)

### Properties

* [definitionCache](_tojson_models_store_.store.md#definitioncache)
* [isParsing](_tojson_models_store_.store.md#isparsing)
* [objects](_tojson_models_store_.store.md#objects)
* [path](_tojson_models_store_.store.md#path)
* [stopParsingTillLevel](_tojson_models_store_.store.md#stopparsingtilllevel)

### Methods

* [AddDefinitionToCache](_tojson_models_store_.store.md#adddefinitiontocache)
* [AddTempPath](_tojson_models_store_.store.md#addtemppath)
* [CreateResultObject](_tojson_models_store_.store.md#createresultobject)
* [DropRightPath](_tojson_models_store_.store.md#droprightpath)
* [FullReset](_tojson_models_store_.store.md#fullreset)
* [GetDefinitionFromCache](_tojson_models_store_.store.md#getdefinitionfromcache)
* [GetPath](_tojson_models_store_.store.md#getpath)
* [IsParsing](_tojson_models_store_.store.md#isparsing)
* [Reset](_tojson_models_store_.store.md#reset)
* [ShouldParseLine](_tojson_models_store_.store.md#shouldparseline)
* [StartParsing](_tojson_models_store_.store.md#startparsing)
* [StopParsingUntilLevel](_tojson_models_store_.store.md#stopparsinguntillevel)

## Constructors

### constructor

\+ **new Store**(): [Store](_tojson_models_store_.store.md)

*Defined in [ToJSON/models/Store.ts:23](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/models/Store.ts#L23)*

**Returns:** [Store](_tojson_models_store_.store.md)

## Properties

### definitionCache

• `Private` **definitionCache**: [DefinitionCache](_tojson_models_definitioncache_.definitioncache.md)[] = []

*Defined in [ToJSON/models/Store.ts:44](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/models/Store.ts#L44)*

___

### isParsing

• `Private` **isParsing**: Boolean

*Defined in [ToJSON/models/Store.ts:40](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/models/Store.ts#L40)*

___

### objects

• `Private` **objects**: [ParsingObject](_tojson_models_parsingobject_.parsingobject.md)[]

*Defined in [ToJSON/models/Store.ts:31](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/models/Store.ts#L31)*

___

### path

• `Private` **path**: [ParsingPath](_tojson_models_parsingpath_.parsingpath.md)[]

*Defined in [ToJSON/models/Store.ts:35](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/models/Store.ts#L35)*

___

### stopParsingTillLevel

• `Private` `Optional` **stopParsingTillLevel**: Number

*Defined in [ToJSON/models/Store.ts:42](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/models/Store.ts#L42)*

## Methods

### AddDefinitionToCache

▸ **AddDefinitionToCache**(`path`: string[], `definition`: any): void

*Defined in [ToJSON/models/Store.ts:46](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/models/Store.ts#L46)*

#### Parameters:

Name | Type |
------ | ------ |
`path` | string[] |
`definition` | any |

**Returns:** void

___

### AddTempPath

▸ **AddTempPath**(): void

*Defined in [ToJSON/models/Store.ts:54](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/models/Store.ts#L54)*

**Returns:** void

___

### CreateResultObject

▸ **CreateResultObject**(): object

*Defined in [ToJSON/models/Store.ts:109](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/models/Store.ts#L109)*

**Returns:** object

___

### DropRightPath

▸ **DropRightPath**(`number?`: undefined \| number): void

*Defined in [ToJSON/models/Store.ts:96](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/models/Store.ts#L96)*

#### Parameters:

Name | Type |
------ | ------ |
`number?` | undefined \| number |

**Returns:** void

___

### FullReset

▸ **FullReset**(): void

*Defined in [ToJSON/models/Store.ts:137](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/models/Store.ts#L137)*

**Returns:** void

___

### GetDefinitionFromCache

▸ **GetDefinitionFromCache**(`path`: string[]): undefined \| [DefinitionCache](_tojson_models_definitioncache_.definitioncache.md)

*Defined in [ToJSON/models/Store.ts:50](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/models/Store.ts#L50)*

#### Parameters:

Name | Type |
------ | ------ |
`path` | string[] |

**Returns:** undefined \| [DefinitionCache](_tojson_models_definitioncache_.definitioncache.md)

___

### GetPath

▸ **GetPath**(): [ParsingPath](_tojson_models_parsingpath_.parsingpath.md)[]

*Defined in [ToJSON/models/Store.ts:105](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/models/Store.ts#L105)*

**Returns:** [ParsingPath](_tojson_models_parsingpath_.parsingpath.md)[]

___

### IsParsing

▸ **IsParsing**(): Boolean

*Defined in [ToJSON/models/Store.ts:92](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/models/Store.ts#L92)*

**Returns:** Boolean

___

### Reset

▸ **Reset**(): void

*Defined in [ToJSON/models/Store.ts:130](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/models/Store.ts#L130)*

**Returns:** void

___

### ShouldParseLine

▸ **ShouldParseLine**(`level`: Number): Boolean

*Defined in [ToJSON/models/Store.ts:117](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/models/Store.ts#L117)*

#### Parameters:

Name | Type |
------ | ------ |
`level` | Number |

**Returns:** Boolean

___

### StartParsing

▸ **StartParsing**(`definition`: [TagDefinition](_tojson_models_tagdefinition_.tagdefinition.md), `line`: [ParsedLine](_tojson_models_parsedline_.parsedline.md)): void

*Defined in [ToJSON/models/Store.ts:58](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/models/Store.ts#L58)*

#### Parameters:

Name | Type |
------ | ------ |
`definition` | [TagDefinition](_tojson_models_tagdefinition_.tagdefinition.md) |
`line` | [ParsedLine](_tojson_models_parsedline_.parsedline.md) |

**Returns:** void

___

### StopParsingUntilLevel

▸ **StopParsingUntilLevel**(`level`: Number): void

*Defined in [ToJSON/models/Store.ts:113](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/models/Store.ts#L113)*

#### Parameters:

Name | Type |
------ | ------ |
`level` | Number |

**Returns:** void
