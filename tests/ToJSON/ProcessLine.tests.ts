import { expect } from 'chai';
import ParsedLine from '../../src/ToJSON/models/ParsedLine';
import ParsingPath from '../../src/ToJSON/models/ParsingPath';
import { ProcessLine, SearchDefinitionDeep, EndProcessing, ProcessStartLevel } from "../../src/ToJSON/parsing/processLine";

describe('ProcessLine Tests', () => {
    afterEach(() => {
        EndProcessing();
    });

    describe('ProcessLine', () => {
        it('No Line or Tag', () => {
            let result = ProcessLine(new ParsedLine(1, 1, ""), 1);
            expect(result.Parsed).to.be.false;
        });
    
        it('Parent has not be parsed', () => {
            let result = ProcessLine(new ParsedLine(1, 1, "Tag"), 1);
            expect(result.Parsed).to.be.false;
        });

        it('No tag definition found', () => {
            let result = ProcessLine(new ParsedLine(0, 0, "Tag"), 0);
            expect(result.Parsed).to.be.false;
        })
    });

    describe('Search definition deep', () => {
        it('No definitions', () => {
            let result = SearchDefinitionDeep([], [], "Tag");
            expect(result).to.be.undefined;
        });

        it('Find local definition', () => {
            let result = SearchDefinitionDeep([
                { Tag: 'INDI', CollectAs: 'Individuals', Property: 'Id' },
                { Tag: 'CHAN', Property: 'Changed', Properties: [ { Tag: 'DATE', Property: 'ChangedDate', Type: 'Date' } ] },
                { Tag: 'DATE', Property: 'Date', Type: 'Date' },
                { Tag: 'TIME', Type: 'Time' }
            ],
            [
                { Tag: 'INDI', Path: 'Individuals' },
                { Tag: 'CHAN', Path: 'Changed' }
            ], "DATE");

            expect(result).to.deep.equal({ Tag: 'DATE', Property: 'ChangedDate', Type: 'Date' });
        });

        it('Find definition', () => {
            let result = SearchDefinitionDeep([{
                Tag: "Tag",
                Properties: [
                    {
                        Tag: "SubTag"
                    }
                ]
            }], [ 
                new ParsingPath("Tag", "AAA.Tag")
            ], "SubTag");
            
            expect(result).to.deep.equal({ Tag: "SubTag"});
        });

        it('No definition of tag in properties', () => {
            let result = SearchDefinitionDeep([{
                Tag: "Tag",
                Properties: [
                    {
                        Tag: "SubTag2"
                    }
                ]
            }], [ 
                new ParsingPath("Tag", "AAA.Tag")
            ], "SubTag");
            
            expect(result).to.be.undefined;
        });

        it('No definition for path', () => {
            let result = SearchDefinitionDeep([{
                Tag: "Tag2",
                Properties: [
                    {
                        Tag: "SubTag"
                    }
                ]
            }], [ 
                new ParsingPath("Tag", "AAA.Tag")
            ], "SubTag");
            
            expect(result).to.be.undefined;
        });
    });

    describe('ProcessStartLevel', () => {
        it('Tag is TRLR', () => {
            expect(ProcessStartLevel(new ParsedLine(0, 0, "TRLR"))).to.be.true;
        });

        it ('No Tag definition', () => {
            expect(ProcessStartLevel(new ParsedLine(0, 0, "AAA"))).to.be.false;
        })
    });
});