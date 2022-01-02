import { expect } from 'chai';
import { ParseText, ProcessNewLine } from '../../src/ToJSON/parsing/parsing';

describe('Parsing text', () => {
    it('No text or no options', () => {
        expect(ParseText().Object).to.deep.equal({});
        expect(ParseText(undefined).Object).to.deep.equal({});
        expect(ParseText(undefined, "").Object).to.deep.equal({});
        expect(ParseText("", "").Object).to.deep.equal({});        
        expect(ParseText("").Object).to.deep.equal({});      
        
        // yaml parsing error
        expect(ParseText("T","@T: A").Object).to.deep.equal({});
    });

    describe('Process line', () => {
        it('Line numbers are not successive', () => {
            ProcessNewLine(0, 0, "2 TAG Value", (l:any) => {
                expect(l).to.be.undefined;
            });
        });

        it('Parsing line with "user" defined tag', () => {
            let stats = ProcessNewLine(0, 0, "1 _TAG Value", (l:any) => {
                expect(l).to.not.be.undefined;
            });

            expect(stats.NotParsedLinesWithoutGEDCOMTag).lengthOf(1);
        });
    });

    it('With Progress', () => {
        let testData = `
        0 @N00010@ NOTE
        0 TRLR`;

        let options = `
        Definition:
        - Tag: NOTE
          CollectAs: Notes
          Property: Id
        `;

        let allLinesCount = 0;
        let invokeCounter = 0;
        let lineNumberArray: number[] = [];
        let progressFunc = (linesCount: number, lineNumber:number) => {
            allLinesCount = linesCount;
            invokeCounter++;
            lineNumberArray.push(lineNumber);
        };

        expect(ParseText(testData, options, progressFunc).Object).to.deep.equal({
          Notes:
          {
            Id: "@N00010@"
          }
        });

        expect(allLinesCount).to.equal(3);
        expect(invokeCounter).to.equal(3);
        expect(lineNumberArray).to.deep.equal([ 0, 1, 2 ]);
    });
});