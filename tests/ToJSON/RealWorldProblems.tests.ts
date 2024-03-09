import Parsing from '../../src/ToJSON/models/Parsing';
import ParsingOptions from '../../src/ToJSON/models/ParsingOptions';
import { expect } from 'chai';

describe('Real World Problems', () => {
  it('Handling EVEN #32', () => {
    const ged = `
      0 @I1@ INDI
      1 NAME John /Doe/
      1 EVEN 
      2 TYPE Census
      2 PLAC London, England
      1 EVEN
      2 TYPE Employment
      2 PLAC Paris, France
      0 TRLR    
    `;

    const options = new ParsingOptions();
    options.SetText(ged);

    const parsing = new Parsing(options);
    const result = parsing.ParseText();

    expect(result.Object).to.deep.equal({
      Individuals: [
        {
          Events: [
            {
              Place: 'London, England',
              Type: 'Census',
            },
            {
              Place: 'Paris, France',
              Type: 'Employment',
            },
          ],
          Fullname: 'John /Doe/',
          Id: '@I1@',
        },
      ],
    });
  });

  it('Elements are lost from arrays of arrays #35', () => {
    const ged = `
      0 @I1@ INDI
      1 NAME John /Doe/
      1 OCCU Scholar
      2 SOUR School Book
      1 OCCU Soldier
      2 SOUR Army records
      2 SOUR Government records
      3 TEXT Page number: 2140
      3 REFN http://URL.com/95105046
      4 TYPE URL
      0 TRLR  
    `;

    const options = new ParsingOptions();
    options.SetText(ged);
    const parsing = new Parsing(options);

    const result = parsing.ParseText();

    expect(result.Object).to.deep.equal({
      Individuals: [
        {
          Fullname: 'John /Doe/',
          Id: '@I1@',
          Occupation: [
            {
              Source: {
                Name: 'School Book',
              },
              Value: 'Scholar',
            },
            {
              Source: [
                {
                  Name: 'Army records',
                },
                {
                  Name: 'Government records',
                  Reference: {
                    Type: 'URL',
                    Value: 'http://URL.com/95105046',
                  },
                  Text: 'Page number: 2140',
                },
              ],
              Value: 'Soldier',
            },
          ],
        },
      ],
    });
  });
});
