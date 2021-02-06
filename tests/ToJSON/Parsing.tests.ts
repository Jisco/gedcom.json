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
});