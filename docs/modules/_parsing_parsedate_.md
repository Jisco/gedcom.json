**[gedcom-node](../README.md)**

> [Globals](../globals.md) / "parsing/parseDate"

# Module: "parsing/parseDate"

## Index

### Variables

* [lastConfig](_parsing_parsedate_.md#lastconfig)
* [lastDate](_parsing_parsedate_.md#lastdate)

### Functions

* [ClearDateTimeMergingInfos](_parsing_parsedate_.md#cleardatetimemerginginfos)
* [ConvertDateStringToObject](_parsing_parsedate_.md#convertdatestringtoobject)
* [ConvertStringToDate](_parsing_parsedate_.md#convertstringtodate)
* [ConvertTimeStringToObject](_parsing_parsedate_.md#converttimestringtoobject)
* [ParseDate](_parsing_parsedate_.md#parsedate)

## Variables

### lastConfig

• `Let` **lastConfig**: any

*Defined in [parsing/parseDate.ts:19](https://github.com/Jisco/GEDCOM-Node/blob/583e05d/src/parsing/parseDate.ts#L19)*

properties for merging time and date

___

### lastDate

• `Let` **lastDate**: any

*Defined in [parsing/parseDate.ts:19](https://github.com/Jisco/GEDCOM-Node/blob/583e05d/src/parsing/parseDate.ts#L19)*

properties for merging time and date

## Functions

### ClearDateTimeMergingInfos

▸ **ClearDateTimeMergingInfos**(): void

*Defined in [parsing/parseDate.ts:25](https://github.com/Jisco/GEDCOM-Node/blob/583e05d/src/parsing/parseDate.ts#L25)*

Clears informations that are needed to merge date and time

**Returns:** void

___

### ConvertDateStringToObject

▸ **ConvertDateStringToObject**(`config`: any, `value`: any): object

*Defined in [parsing/parseDate.ts:88](https://github.com/Jisco/GEDCOM-Node/blob/583e05d/src/parsing/parseDate.ts#L88)*

Converts a gedcom date string to an object

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`config` | any | The parsing configuration |
`value` | any | The gedcom date string |

**Returns:** object

An object with the JS date and other properties

___

### ConvertStringToDate

▸ **ConvertStringToDate**(`date`: string, `result`: any, `config`: any): void

*Defined in [parsing/parseDate.ts:261](https://github.com/Jisco/GEDCOM-Node/blob/583e05d/src/parsing/parseDate.ts#L261)*

Converts a single date string to an object

**`internal`** 

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`date` | string | the date string |
`result` | any | the object |
`config` | any | the config |

**Returns:** void

___

### ConvertTimeStringToObject

▸ **ConvertTimeStringToObject**(`value`: any, `ownProperty`: any): any

*Defined in [parsing/parseDate.ts:37](https://github.com/Jisco/GEDCOM-Node/blob/583e05d/src/parsing/parseDate.ts#L37)*

Merges a time value with the last parsed date value

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | any | The time text |
`ownProperty` | any | If defined it adds the time value as own property to the date object |

**Returns:** any

The time value

___

### ParseDate

▸ **ParseDate**(`date`: string, `config`: any, `markAsBetweenIfNotExact?`: boolean): any

*Defined in [parsing/parseDate.ts:164](https://github.com/Jisco/GEDCOM-Node/blob/583e05d/src/parsing/parseDate.ts#L164)*

Function to parse a gedcom date string to an object

**`internal`** 

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`date` | string | - | the gedcom date string |
`config` | any | - | the parsing configuartion |
`markAsBetweenIfNotExact` | boolean | false | flag so that a date, if it is not specified exactly, is output as two values that lie in the given period aka BETWEEN |

**Returns:** any

the date object
