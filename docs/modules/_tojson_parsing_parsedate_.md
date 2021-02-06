**[gedcom.js](../README.md)**

> [Globals](../globals.md) / "ToJSON/parsing/parseDate"

# Module: "ToJSON/parsing/parseDate"

## Index

### Variables

* [hebcal](_tojson_parsing_parsedate_.md#hebcal)
* [lastConfig](_tojson_parsing_parsedate_.md#lastconfig)
* [lastDate](_tojson_parsing_parsedate_.md#lastdate)

### Functions

* [ClearDateTimeMergingInfos](_tojson_parsing_parsedate_.md#cleardatetimemerginginfos)
* [ConvertDateStringToObject](_tojson_parsing_parsedate_.md#convertdatestringtoobject)
* [ConvertFromJulian](_tojson_parsing_parsedate_.md#convertfromjulian)
* [ConvertShortMonthToFullMonth](_tojson_parsing_parsedate_.md#convertshortmonthtofullmonth)
* [ConvertStringToDate](_tojson_parsing_parsedate_.md#convertstringtodate)
* [ConvertTimeStringToObject](_tojson_parsing_parsedate_.md#converttimestringtoobject)
* [ParseDate](_tojson_parsing_parsedate_.md#parsedate)
* [SetMarker](_tojson_parsing_parsedate_.md#setmarker)

## Variables

### hebcal

• `Let` **hebcal**: any = require('hebcal')

*Defined in [ToJSON/parsing/parseDate.ts:25](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/parsing/parseDate.ts#L25)*

___

### lastConfig

• `Let` **lastConfig**: [ConvertToDate](../classes/_tojson_models_converter_converttodate_.converttodate.md)

*Defined in [ToJSON/parsing/parseDate.ts:24](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/parsing/parseDate.ts#L24)*

properties for merging time and date

___

### lastDate

• `Let` **lastDate**: object

*Defined in [ToJSON/parsing/parseDate.ts:24](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/parsing/parseDate.ts#L24)*

properties for merging time and date

## Functions

### ClearDateTimeMergingInfos

▸ **ClearDateTimeMergingInfos**(): void

*Defined in [ToJSON/parsing/parseDate.ts:31](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/parsing/parseDate.ts#L31)*

Clears informations that are needed to merge date and time

**Returns:** void

___

### ConvertDateStringToObject

▸ **ConvertDateStringToObject**(`config`: [ConvertToDate](../classes/_tojson_models_converter_converttodate_.converttodate.md), `value`: string): undefined \| {}

*Defined in [ToJSON/parsing/parseDate.ts:91](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/parsing/parseDate.ts#L91)*

Converts a gedcom date string to an object

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`config` | [ConvertToDate](../classes/_tojson_models_converter_converttodate_.converttodate.md) | The parsing configuration |
`value` | string | The gedcom date string |

**Returns:** undefined \| {}

An object with the JS date and other properties

___

### ConvertFromJulian

▸ **ConvertFromJulian**(`date`: Dayjs): Dayjs

*Defined in [ToJSON/parsing/parseDate.ts:291](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/parsing/parseDate.ts#L291)*

#### Parameters:

Name | Type |
------ | ------ |
`date` | Dayjs |

**Returns:** Dayjs

___

### ConvertShortMonthToFullMonth

▸ **ConvertShortMonthToFullMonth**(`shortMonth`: string): \"Tishrei\" \| \"Cheshvan\" \| \"Kislev\" \| \"Tevet\" \| \"Shvat\" \| \"Adar 1\" \| \"Adar 2\" \| \"Nisan\" \| \"Iyyar\" \| \"Sivan\" \| \"Tamuz\" \| \"Av\" \| \"Elul\" \| ""

*Defined in [ToJSON/parsing/parseDate.ts:301](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/parsing/parseDate.ts#L301)*

#### Parameters:

Name | Type |
------ | ------ |
`shortMonth` | string |

**Returns:** \"Tishrei\" \| \"Cheshvan\" \| \"Kislev\" \| \"Tevet\" \| \"Shvat\" \| \"Adar 1\" \| \"Adar 2\" \| \"Nisan\" \| \"Iyyar\" \| \"Sivan\" \| \"Tamuz\" \| \"Av\" \| \"Elul\" \| ""

___

### ConvertStringToDate

▸ **ConvertStringToDate**(`date`: string, `result`: object, `config`: [ConvertToDate](../classes/_tojson_models_converter_converttodate_.converttodate.md), `calendarType`: string): void

*Defined in [ToJSON/parsing/parseDate.ts:341](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/parsing/parseDate.ts#L341)*

Converts a single date string to an object

**`internal`** 

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`date` | string | the date string |
`result` | object | the object |
`config` | [ConvertToDate](../classes/_tojson_models_converter_converttodate_.converttodate.md) | the config |
`calendarType` | string | - |

**Returns:** void

___

### ConvertTimeStringToObject

▸ **ConvertTimeStringToObject**(`value`: string, `ownProperty?`: undefined \| string): undefined \| string

*Defined in [ToJSON/parsing/parseDate.ts:43](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/parsing/parseDate.ts#L43)*

Merges a time value with the last parsed date value

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | string | The time text |
`ownProperty?` | undefined \| string | If defined it adds the time value as own property to the date object |

**Returns:** undefined \| string

The time value

___

### ParseDate

▸ **ParseDate**(`date`: string, `config`: [ConvertToDate](../classes/_tojson_models_converter_converttodate_.converttodate.md), `markAsBetweenIfNotExact?`: boolean): object

*Defined in [ToJSON/parsing/parseDate.ts:148](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/parsing/parseDate.ts#L148)*

Function to parse a gedcom date string to an object

**`internal`** 

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`date` | string | - | the gedcom date string |
`config` | [ConvertToDate](../classes/_tojson_models_converter_converttodate_.converttodate.md) | - | the parsing configuartion |
`markAsBetweenIfNotExact` | boolean | false | flag so that a date, if it is not specified exactly, is output as two values that lie in the given period aka BETWEEN |

**Returns:** object

the date object

___

### SetMarker

▸ **SetMarker**(`marker`: string, `result`: any, `config`: [ConvertToDate](../classes/_tojson_models_converter_converttodate_.converttodate.md)): void

*Defined in [ToJSON/parsing/parseDate.ts:268](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/parsing/parseDate.ts#L268)*

#### Parameters:

Name | Type |
------ | ------ |
`marker` | string |
`result` | any |
`config` | [ConvertToDate](../classes/_tojson_models_converter_converttodate_.converttodate.md) |

**Returns:** void
