**[gedcom.js](../README.md)**

> [Globals](../globals.md) / ["ToJSON/models/Statistics"](../modules/_tojson_models_statistics_.md) / Statistics

# Class: Statistics

Class with parsing statistics

## Hierarchy

* **Statistics**

## Index

### Constructors

* [constructor](_tojson_models_statistics_.statistics.md#constructor)

### Properties

* [IncorrectLines](_tojson_models_statistics_.statistics.md#incorrectlines)
* [NotParsedLines](_tojson_models_statistics_.statistics.md#notparsedlines)
* [NotParsedLinesWithoutGEDCOMTag](_tojson_models_statistics_.statistics.md#notparsedlineswithoutgedcomtag)
* [ParsedLines](_tojson_models_statistics_.statistics.md#parsedlines)

### Accessors

* [IncorrectLinesCount](_tojson_models_statistics_.statistics.md#incorrectlinescount)
* [LinesCount](_tojson_models_statistics_.statistics.md#linescount)
* [NotParsedLinesCount](_tojson_models_statistics_.statistics.md#notparsedlinescount)
* [NotParsedLinesList](_tojson_models_statistics_.statistics.md#notparsedlineslist)
* [NotParsedLinesWithoutGEDCOMTagCount](_tojson_models_statistics_.statistics.md#notparsedlineswithoutgedcomtagcount)
* [ParsedLinesCount](_tojson_models_statistics_.statistics.md#parsedlinescount)

## Constructors

### constructor

\+ **new Statistics**(): [Statistics](_tojson_models_statistics_.statistics.md)

*Defined in [ToJSON/models/Statistics.ts:7](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/models/Statistics.ts#L7)*

**Returns:** [Statistics](_tojson_models_statistics_.statistics.md)

## Properties

### IncorrectLines

•  **IncorrectLines**: [StatisticLine](_tojson_models_statisticline_.statisticline.md)[]

*Defined in [ToJSON/models/Statistics.ts:22](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/models/Statistics.ts#L22)*

**`returns`** list of all incorrect parsed lines

___

### NotParsedLines

•  **NotParsedLines**: [StatisticLine](_tojson_models_statisticline_.statisticline.md)[]

*Defined in [ToJSON/models/Statistics.ts:26](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/models/Statistics.ts#L26)*

**`returns`** list of all not parsed lines

___

### NotParsedLinesWithoutGEDCOMTag

•  **NotParsedLinesWithoutGEDCOMTag**: [StatisticLine](_tojson_models_statisticline_.statisticline.md)[]

*Defined in [ToJSON/models/Statistics.ts:31](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/models/Statistics.ts#L31)*

**`returns`** list of all not parsed lines

___

### ParsedLines

•  **ParsedLines**: [StatisticLine](_tojson_models_statisticline_.statisticline.md)[]

*Defined in [ToJSON/models/Statistics.ts:18](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/models/Statistics.ts#L18)*

**`returns`** list of all correct parsed lines

## Accessors

### IncorrectLinesCount

• get **IncorrectLinesCount**(): number

*Defined in [ToJSON/models/Statistics.ts:43](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/models/Statistics.ts#L43)*

**Returns:** number

a count of all incorrect parsed lines

___

### LinesCount

• get **LinesCount**(): number

*Defined in [ToJSON/models/Statistics.ts:64](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/models/Statistics.ts#L64)*

**Returns:** number

a count of all processed lines

___

### NotParsedLinesCount

• get **NotParsedLinesCount**(): number

*Defined in [ToJSON/models/Statistics.ts:50](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/models/Statistics.ts#L50)*

**Returns:** number

a count of all not parsed lines

___

### NotParsedLinesList

• get **NotParsedLinesList**(): string

*Defined in [ToJSON/models/Statistics.ts:71](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/models/Statistics.ts#L71)*

**Returns:** string

a comma separated list of all not parsed line numbers

___

### NotParsedLinesWithoutGEDCOMTagCount

• get **NotParsedLinesWithoutGEDCOMTagCount**(): number

*Defined in [ToJSON/models/Statistics.ts:57](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/models/Statistics.ts#L57)*

**Returns:** number

a count of all not parsed lines

___

### ParsedLinesCount

• get **ParsedLinesCount**(): number

*Defined in [ToJSON/models/Statistics.ts:36](https://github.com/Jisco/gedcom.js/blob/af9d585/src/ToJSON/models/Statistics.ts#L36)*

**Returns:** number

a count of all correctly parsed lines
