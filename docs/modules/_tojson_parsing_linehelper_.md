**[gedcom.js](../README.md)**

> [Globals](../globals.md) / "ToJSON/parsing/lineHelper"

# Module: "ToJSON/parsing/lineHelper"

## Index

### Functions

* [GetLineLevel](_tojson_parsing_linehelper_.md#getlinelevel)
* [GetReferenceId](_tojson_parsing_linehelper_.md#getreferenceid)

## Functions

### GetLineLevel

▸ **GetLineLevel**(`line`: string): number

*Defined in [ToJSON/parsing/lineHelper.ts:10](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/parsing/lineHelper.ts#L10)*

Parses the line level

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`line` | string | The line text |

**Returns:** number

The level

___

### GetReferenceId

▸ **GetReferenceId**(`refOrTag`: string): string \| undefined

*Defined in [ToJSON/parsing/lineHelper.ts:28](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/parsing/lineHelper.ts#L28)*

Parses the reference id

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`refOrTag` | string | The tag or reference id |

**Returns:** string \| undefined

The reference id or undefined
