**[gedcom-node](../README.md)**

> [Globals](../globals.md) / ["models/Statistics"](../modules/_models_statistics_.md) / Statistics

# Class: Statistics

Class with parsing statistics

## Hierarchy

* **Statistics**

## Index

### Constructors

* [constructor](_models_statistics_.statistics.md#constructor)

### Properties

* [IncorrectLines](_models_statistics_.statistics.md#incorrectlines)
* [NotParsedLines](_models_statistics_.statistics.md#notparsedlines)
* [ParsedLines](_models_statistics_.statistics.md#parsedlines)

### Accessors

* [IncorrectLinesCount](_models_statistics_.statistics.md#incorrectlinescount)
* [LinesCount](_models_statistics_.statistics.md#linescount)
* [NotParsedLinesCount](_models_statistics_.statistics.md#notparsedlinescount)
* [NotParsedLinesList](_models_statistics_.statistics.md#notparsedlineslist)
* [ParsedLinesCount](_models_statistics_.statistics.md#parsedlinescount)

## Constructors

### constructor

\+ **new Statistics**(): [Statistics](_models_statistics_.statistics.md)

*Defined in [models/Statistics.ts:6](https://github.com/Jisco/GEDCOM-Node/blob/583e05d/src/models/Statistics.ts#L6)*

**Returns:** [Statistics](_models_statistics_.statistics.md)

## Properties

### IncorrectLines

•  **IncorrectLines**: [StatisticLine](_models_statistics_.statisticline.md)[]

*Defined in [models/Statistics.ts:20](https://github.com/Jisco/GEDCOM-Node/blob/583e05d/src/models/Statistics.ts#L20)*

**`returns`** list of all incorrect parsed lines

___

### NotParsedLines

•  **NotParsedLines**: [StatisticLine](_models_statistics_.statisticline.md)[]

*Defined in [models/Statistics.ts:24](https://github.com/Jisco/GEDCOM-Node/blob/583e05d/src/models/Statistics.ts#L24)*

**`returns`** list of all not parsed lines

___

### ParsedLines

•  **ParsedLines**: [StatisticLine](_models_statistics_.statisticline.md)[]

*Defined in [models/Statistics.ts:16](https://github.com/Jisco/GEDCOM-Node/blob/583e05d/src/models/Statistics.ts#L16)*

**`returns`** list of all correct parsed lines

## Accessors

### IncorrectLinesCount

• get **IncorrectLinesCount**(): number

*Defined in [models/Statistics.ts:36](https://github.com/Jisco/GEDCOM-Node/blob/583e05d/src/models/Statistics.ts#L36)*

**Returns:** number

a count of all incorrect parsed lines

___

### LinesCount

• get **LinesCount**(): number

*Defined in [models/Statistics.ts:50](https://github.com/Jisco/GEDCOM-Node/blob/583e05d/src/models/Statistics.ts#L50)*

**Returns:** number

a count of all processed lines

___

### NotParsedLinesCount

• get **NotParsedLinesCount**(): number

*Defined in [models/Statistics.ts:43](https://github.com/Jisco/GEDCOM-Node/blob/583e05d/src/models/Statistics.ts#L43)*

**Returns:** number

a count of all not parsed lines

___

### NotParsedLinesList

• get **NotParsedLinesList**(): string

*Defined in [models/Statistics.ts:57](https://github.com/Jisco/GEDCOM-Node/blob/583e05d/src/models/Statistics.ts#L57)*

**Returns:** string

a comma separated list of all not parsed line numbers

___

### ParsedLinesCount

• get **ParsedLinesCount**(): number

*Defined in [models/Statistics.ts:29](https://github.com/Jisco/GEDCOM-Node/blob/583e05d/src/models/Statistics.ts#L29)*

**Returns:** number

a count of all correctly parsed lines
