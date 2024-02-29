import { expect } from 'chai';
import { ParseText } from '../../src/ToJSON/parsing/parsing';

describe('Get result', () => {
    it('Includes the result and statistics', () => {

        let testData = `
            0 @I1@ INDI
            1 NAME John /Doe/
            1 OCCU Scholar
            0 TRLR
        `.trimStart().trimEnd();

        let options = `
            Config:
              - IgnoreMaxLineLength: true
              - ExcludeParsedLinesFromStats: true
              - ReplaceIdentifiersWithUUIDs: false
            Definition:
              - Tag: INDI
                CollectAs: Individuals
                CollectAsArray: true
                Property: Id
                Properties:
                  - Tag: NAME
                    Property: Fullname
                  - Tag: OCCU
                    Property: Occupation`;

        const result = ParseText(testData, options);
        expect(result).to.deep.equal({
            Object: {
                Individuals: [
                    {
                        Id: "@I1@",
                        Fullname: "John /Doe/",
                        Occupation: "Scholar"
                    }
                ]
            },
            Statistics: {
                IncorrectLines: [],
                NotParsedLines: [],
                NotParsedLinesWithoutGEDCOMTag: [],
                ParsedLineCount: 4
            }
        });
    });
});
