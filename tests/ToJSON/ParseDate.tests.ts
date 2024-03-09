import { expect } from 'chai';
import ConvertToDate from '../../src/ToJSON/models/converter/ConvertToDate';
import { ConvertDateStringToObject, ConvertTimeStringToObject, ClearDateTimeMergingInfos } from '../../src/ToJSON/parsing/parseDate';

describe('Date parsing tests', () => {
  beforeEach(() => {
    ClearDateTimeMergingInfos();
  });

  describe('Convert Time String to Object', () => {
    it('No Value', () => {
      expect(ConvertTimeStringToObject('')).to.be.undefined;
    });

    it('Last date was NOT a single date, time will not be attached', () => {
      let result = ConvertDateStringToObject(new ConvertToDate(), 'DEC 1999');
      expect(result).to.deep.equal({
        Between: {
          Value: new Date(1999, 11, 1, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: true,
        },
        And: {
          Value: new Date(2000, 0, 1, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: true,
        },
        Original: 'DEC 1999',
      });
      expect(ConvertTimeStringToObject('14:52')).to.be.equal('14:52');
      expect(result).to.deep.equal({
        Between: {
          Value: new Date(1999, 11, 1, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: true,
        },
        And: {
          Value: new Date(2000, 0, 1, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: true,
        },
        Original: 'DEC 1999',
      });
    });

    it('Attach Time to last date', () => {
      let result = ConvertDateStringToObject(new ConvertToDate(), '23 JUL 1980');

      expect(result).to.deep.equal({
        Value: new Date(1980, 6, 23, 0, 0, 0),
        HasYear: true,
        HasMonth: true,
        HasDay: true,
        Original: '23 JUL 1980',
      });

      expect(ConvertTimeStringToObject('14:52')).to.be.equal('14:52');

      expect(result).to.deep.equal({
        Value: new Date(1980, 6, 23, 14, 52, 0),
        HasYear: true,
        HasMonth: true,
        HasDay: true,
        Original: '23 JUL 1980 14:52',
      });
    });

    it('Attach Time with seconds to last date', () => {
      let result = ConvertDateStringToObject(new ConvertToDate(), '23 JUL 1980');

      expect(result).to.deep.equal({
        Value: new Date(1980, 6, 23, 0, 0, 0),
        HasYear: true,
        HasMonth: true,
        HasDay: true,
        Original: '23 JUL 1980',
      });

      expect(ConvertTimeStringToObject('14:52:33')).to.be.equal('14:52:33');

      expect(result).to.deep.equal({
        Value: new Date(1980, 6, 23, 14, 52, 33),
        HasYear: true,
        HasMonth: true,
        HasDay: true,
        Original: '23 JUL 1980 14:52:33',
      });
    });

    it('Attach Time with milliseconds are not allowed', () => {
      let result = ConvertDateStringToObject(new ConvertToDate(), '23 JUL 1980');

      expect(result).to.deep.equal({
        Value: new Date(1980, 6, 23, 0, 0, 0),
        HasYear: true,
        HasMonth: true,
        HasDay: true,
        Original: '23 JUL 1980',
      });

      expect(ConvertTimeStringToObject('14:52:33:44')).to.be.equal('14:52:33:44');

      expect(result).to.deep.equal({
        Value: new Date(1980, 6, 23, 0, 0, 0),
        HasYear: true,
        HasMonth: true,
        HasDay: true,
        Original: '23 JUL 1980',
      });
    });

    it('Time has to be hour and minute or hour, minute and second', () => {
      let result = ConvertDateStringToObject(new ConvertToDate(), '23 JUL 1980');
      expect(ConvertTimeStringToObject('14')).to.be.equal('14');
      expect(result).to.deep.equal({
        Value: new Date(1980, 6, 23, 0, 0, 0),
        HasYear: true,
        HasMonth: true,
        HasDay: true,
        Original: '23 JUL 1980',
      });
    });

    it('Time has to be correct values', () => {
      let result = ConvertDateStringToObject(new ConvertToDate(), '23 JUL 1980') as any;
      expect(ConvertTimeStringToObject('-14:52')).to.be.equal('-14:52');
      expect(result.Value).to.deep.equal(new Date(1980, 6, 23, 0, 0, 0));
      expect(result.Original).to.equal('23 JUL 1980 -14:52');

      ClearDateTimeMergingInfos();
      result = ConvertDateStringToObject(new ConvertToDate(), '23 JUL 1980') as any;
      expect(ConvertTimeStringToObject('14:61')).to.be.equal('14:61');
      expect(result.Value).to.deep.equal(new Date(1980, 6, 23, 0, 0, 0));
      expect(result.Original).to.equal('23 JUL 1980 14:61');
    });
  });

  describe('Convert Date String to Object', () => {
    it('No value', () => {
      expect(ConvertDateStringToObject(new ConvertToDate(), '')).to.be.undefined;
    });

    it('2 Markers', () => {
      let result = ConvertDateStringToObject(new ConvertToDate(), 'EST CAL 20 JAN 1999');

      expect(result).to.deep.equal({
        Value: new Date(1999, 0, 20, 0, 0, 0),
        HasYear: true,
        HasMonth: true,
        HasDay: true,
        Original: 'EST CAL 20 JAN 1999',
        Estimated: true,
        Calculated: true,
      });
    });

    it('3 Markers', () => {
      let result = ConvertDateStringToObject(new ConvertToDate(), 'EST CAL ABT 20 JAN 1999');

      expect(result).to.deep.equal({
        Value: new Date(1999, 0, 20, 0, 0, 0),
        HasYear: true,
        HasMonth: true,
        HasDay: true,
        Original: 'EST CAL ABT 20 JAN 1999',
        Estimated: true,
        Calculated: true,
        About: true,
      });
    });
  });

  describe('Calendars', () => {
    it('GREGORIAN', () => {
      let result = ConvertDateStringToObject(new ConvertToDate(), '@#DGREGORIAN@ 4 FEB 1980');
      expect(result).to.deep.equal({
        Value: new Date(1980, 1, 4, 0, 0, 0),
        HasYear: true,
        HasMonth: true,
        HasDay: true,
        Original: '@#DGREGORIAN@ 4 FEB 1980',
      });
    });

    it('GREGORIAN only single will work', () => {
      let result = ConvertDateStringToObject(new ConvertToDate(), '@#DGREGORIAN@ 4 FEB 1980');
      expect(result).to.deep.equal({
        Value: new Date(1980, 1, 4, 0, 0, 0),
        HasYear: true,
        HasMonth: true,
        HasDay: true,
        Original: '@#DGREGORIAN@ 4 FEB 1980',
      });
    });

    describe('JULIAN', () => {
      it('Single date', () => {
        let result = ConvertDateStringToObject(new ConvertToDate(), '@#DJULIAN@ 22 JAN 1980');
        expect(result).to.deep.equal({
          Value: new Date(1980, 1, 4, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: true,
          Original: '@#DJULIAN@ 22 JAN 1980',
          Calendar: 'Julian',
        });
      });

      it('Month/Year', () => {
        let result = ConvertDateStringToObject(new ConvertToDate(), '@#DJULIAN@ JAN 1980');

        expect(result).to.deep.equal({
          Between: {
            Value: new Date(1980, 0, 14, 0, 0, 0),
            HasYear: true,
            HasMonth: true,
            HasDay: true,
          },
          And: {
            Value: new Date(1980, 1, 14, 0, 0, 0),
            HasYear: true,
            HasMonth: true,
            HasDay: true,
          },
          Original: '@#DJULIAN@ JAN 1980',
          Calendar: 'Julian',
        });
      });

      it('Year', () => {
        let result = ConvertDateStringToObject(new ConvertToDate(), '@#DJULIAN@ 1980');

        expect(result).to.deep.equal({
          Between: {
            Value: new Date(1980, 0, 14, 0, 0, 0),
            HasYear: true,
            HasMonth: true,
            HasDay: true,
          },
          And: {
            Value: new Date(1981, 0, 14, 0, 0, 0),
            HasYear: true,
            HasMonth: true,
            HasDay: true,
          },
          Original: '@#DJULIAN@ 1980',
          Calendar: 'Julian',
        });
      });

      it('from to gregorian', () => {
        let result = ConvertDateStringToObject(new ConvertToDate(), 'FROM @#DJULIAN@ 22 JAN 1980 TO 31 DEC 1980');
        expect(result).to.deep.equal({
          From: {
            Value: new Date(1980, 1, 4, 0, 0, 0),
            HasYear: true,
            HasMonth: true,
            HasDay: true,
            Calendar: 'Julian',
          },
          To: {
            Value: new Date(1980, 11, 31, 0, 0, 0),
            HasYear: true,
            HasMonth: true,
            HasDay: true,
          },
          Original: 'FROM @#DJULIAN@ 22 JAN 1980 TO 31 DEC 1980',
        });
      });

      it('from to', () => {
        let result = ConvertDateStringToObject(new ConvertToDate(), 'FROM @#DJULIAN@ 22 JAN 1980 TO @#DJULIAN@ 18 DEC 1980');
        expect(result).to.deep.equal({
          From: {
            Value: new Date(1980, 1, 4, 0, 0, 0),
            HasYear: true,
            HasMonth: true,
            HasDay: true,
            Calendar: 'Julian',
          },
          To: {
            Value: new Date(1980, 11, 32, 0, 0, 0),
            HasYear: true,
            HasMonth: true,
            HasDay: true,
            Calendar: 'Julian',
          },
          Original: 'FROM @#DJULIAN@ 22 JAN 1980 TO @#DJULIAN@ 18 DEC 1980',
        });
      });
    });

    describe('HEBREW', () => {
      it('Single date', () => {
        let result = ConvertDateStringToObject(new ConvertToDate(), '@#DHEBREW@ 17 SHV 5740');
        expect(result).to.deep.equal({
          Value: new Date(1980, 1, 4, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: true,
          Original: '@#DHEBREW@ 17 SHV 5740',
          Calendar: 'Hebrew',
        });
      });

      it('Month/Year', () => {
        let result = ConvertDateStringToObject(new ConvertToDate(), '@#DHEBREW@ SHV 5740');

        expect(result).to.deep.equal({
          Between: {
            Value: new Date(1980, 0, 19, 0, 0, 0),
            HasYear: true,
            HasMonth: true,
            HasDay: true,
          },
          And: {
            Value: new Date(1980, 1, 18, 0, 0, 0),
            HasYear: true,
            HasMonth: true,
            HasDay: true,
          },
          Original: '@#DHEBREW@ SHV 5740',
          Calendar: 'Hebrew',
        });
      });

      it('Year', () => {
        let result = ConvertDateStringToObject(new ConvertToDate(), '@#DHEBREW@ 5740');

        expect(result).to.deep.equal({
          Between: {
            Value: new Date(1980, 2, 18, 0, 0, 0),
            HasYear: true,
            HasMonth: true,
            HasDay: true,
          },
          And: {
            Value: new Date(1981, 3, 5, 0, 0, 0),
            HasYear: true,
            HasMonth: true,
            HasDay: true,
          },
          Original: '@#DHEBREW@ 5740',
          Calendar: 'Hebrew',
        });
      });

      it('from to', () => {
        let result = ConvertDateStringToObject(new ConvertToDate(), 'FROM @#DHEBREW@ 17 SHV 5740 TO @#DHEBREW@ 25 TVT 5741');
        expect(result).to.deep.equal({
          From: {
            Value: new Date(1980, 1, 4, 0, 0, 0),
            HasYear: true,
            HasMonth: true,
            HasDay: true,
            Calendar: 'Hebrew',
          },
          To: {
            Value: new Date(1980, 11, 32, 0, 0, 0),
            HasYear: true,
            HasMonth: true,
            HasDay: true,
            Calendar: 'Hebrew',
          },
          Original: 'FROM @#DHEBREW@ 17 SHV 5740 TO @#DHEBREW@ 25 TVT 5741',
        });
      });
    });

    it('Unknown format', () => {
      let result = ConvertDateStringToObject(new ConvertToDate(), '@#DUnknown@ 22 JAN 1980');

      expect(result).to.deep.equal({
        Original: '@#DUnknown@ 22 JAN 1980',
      });
    });
  });

  describe('FROM TO', () => {
    it('Exact', () => {
      let result = ConvertDateStringToObject(new ConvertToDate(), 'FROM 4 FEB 1980 TO 4 JUN 1999');

      expect(result).to.deep.equal({
        From: {
          Value: new Date(1980, 1, 4, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: true,
        },
        To: {
          Value: new Date(1999, 5, 4, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: true,
        },
        Original: 'FROM 4 FEB 1980 TO 4 JUN 1999',
      });
    });

    it('Exact and month/year', () => {
      let result = ConvertDateStringToObject(new ConvertToDate(), 'FROM 31 JAN 1980 TO JUN 1999');

      expect(result).to.deep.equal({
        From: {
          Value: new Date(1980, 0, 31, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: true,
        },
        To: {
          Value: new Date(1999, 5, 1, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: false,
        },
        Original: 'FROM 31 JAN 1980 TO JUN 1999',
      });
    });

    it('Exact and year only', () => {
      let result = ConvertDateStringToObject(new ConvertToDate(), 'FROM 31 MAY 1980 TO 1999');

      expect(result).to.deep.equal({
        From: {
          Value: new Date(1980, 4, 31, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: true,
        },
        To: {
          Value: new Date(1999, 0, 1, 0, 0, 0),
          HasYear: true,
          HasMonth: false,
          HasDay: false,
        },
        Original: 'FROM 31 MAY 1980 TO 1999',
      });
    });

    it('Month and year only', () => {
      let result = ConvertDateStringToObject(new ConvertToDate(), 'FROM FEB 1980 TO 1999');

      expect(result).to.deep.equal({
        From: {
          Value: new Date(1980, 1, 1, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: false,
        },
        To: {
          Value: new Date(1999, 0, 1, 0, 0, 0),
          HasYear: true,
          HasMonth: false,
          HasDay: false,
        },
        Original: 'FROM FEB 1980 TO 1999',
      });
    });

    it('Month and year only with modifiers ABT and CAL', () => {
      let result = ConvertDateStringToObject(new ConvertToDate(), 'FROM ABT FEB 1980 TO CAL 1999');

      expect(result).to.deep.equal({
        From: {
          Value: new Date(1980, 1, 1, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: false,
          About: true,
        },
        To: {
          Value: new Date(1999, 0, 1, 0, 0, 0),
          HasYear: true,
          HasMonth: false,
          HasDay: false,
          Calculated: true,
        },
        Original: 'FROM ABT FEB 1980 TO CAL 1999',
      });
    });

    it('Exact with modifiers CAL and EST', () => {
      let result = ConvertDateStringToObject(new ConvertToDate(), 'FROM CAL 23 OCT 1980 TO EST NOV 1999');

      expect(result).to.deep.equal({
        From: {
          Value: new Date(1980, 9, 23, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: true,
          Calculated: true,
        },
        To: {
          Value: new Date(1999, 10, 1, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: false,
          Estimated: true,
        },
        Original: 'FROM CAL 23 OCT 1980 TO EST NOV 1999',
      });
    });
  });

  describe('FROM', () => {
    it('Exact', () => {
      let result = ConvertDateStringToObject(new ConvertToDate(), 'FROM 23 JUL 1980');

      expect(result).to.deep.equal({
        From: {
          Value: new Date(1980, 6, 23, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: true,
        },
        Original: 'FROM 23 JUL 1980',
      });
    });

    it('Exact with marker', () => {
      let result = ConvertDateStringToObject(new ConvertToDate(), 'FROM ABT 23 JUL 1980');

      expect(result).to.deep.equal({
        From: {
          Value: new Date(1980, 6, 23, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: true,
          About: true,
        },
        Original: 'FROM ABT 23 JUL 1980',
      });
    });

    it('Month/Year', () => {
      let result = ConvertDateStringToObject(new ConvertToDate(), 'FROM JUL 1980');

      expect(result).to.deep.equal({
        From: {
          Value: new Date(1980, 6, 1, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: false,
        },
        Original: 'FROM JUL 1980',
      });
    });
  });

  describe('TO', () => {
    it('Exact', () => {
      let result = ConvertDateStringToObject(new ConvertToDate(), 'TO 23 JUL 1980');

      expect(result).to.deep.equal({
        To: {
          Value: new Date(1980, 6, 23, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: true,
        },
        Original: 'TO 23 JUL 1980',
      });
    });

    it('Exact with marker', () => {
      let result = ConvertDateStringToObject(new ConvertToDate(), 'TO ABT 23 JUL 1980');

      expect(result).to.deep.equal({
        To: {
          Value: new Date(1980, 6, 23, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: true,
          About: true,
        },
        Original: 'TO ABT 23 JUL 1980',
      });
    });

    it('Month/Year', () => {
      let result = ConvertDateStringToObject(new ConvertToDate(), 'TO JUL 1980');

      expect(result).to.deep.equal({
        To: {
          Value: new Date(1980, 6, 1, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: false,
        },
        Original: 'TO JUL 1980',
      });
    });
  });

  describe('Between', () => {
    it('Exact', () => {
      let result = ConvertDateStringToObject(new ConvertToDate(), 'BETWEEN 4 FEB 1980 AND 4 JUN 1999');

      expect(result).to.deep.equal({
        Between: {
          Value: new Date(1980, 1, 4, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: true,
        },
        And: {
          Value: new Date(1999, 5, 4, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: true,
        },
        Original: 'BETWEEN 4 FEB 1980 AND 4 JUN 1999',
      });
    });

    it('Years', () => {
      let result = ConvertDateStringToObject(new ConvertToDate(), 'BETWEEN 1980 AND 1999');

      expect(result).to.deep.equal({
        Between: {
          Value: new Date(1980, 0, 1, 0, 0, 0),
          HasYear: true,
          HasMonth: false,
          HasDay: false,
        },
        And: {
          Value: new Date(1999, 0, 1, 0, 0, 0),
          HasYear: true,
          HasMonth: false,
          HasDay: false,
        },
        Original: 'BETWEEN 1980 AND 1999',
      });
    });
  });

  describe('Single date', () => {
    describe('With marker', () => {
      it('EST', () => {
        let result = ConvertDateStringToObject(new ConvertToDate(), 'EST 20 JAN 1999');

        expect(result).to.deep.equal({
          Value: new Date(1999, 0, 20, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: true,
          Original: 'EST 20 JAN 1999',
          Estimated: true,
        });
      });

      it('ABT', () => {
        let result = ConvertDateStringToObject(new ConvertToDate(), 'ABT 20 JAN 1999');

        expect(result).to.deep.equal({
          Value: new Date(1999, 0, 20, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: true,
          Original: 'ABT 20 JAN 1999',
          About: true,
        });
      });

      it('CAL', () => {
        let result = ConvertDateStringToObject(new ConvertToDate(), 'CAL 20 JAN 1999');

        expect(result).to.deep.equal({
          Value: new Date(1999, 0, 20, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: true,
          Original: 'CAL 20 JAN 1999',
          Calculated: true,
        });
      });

      it('AFT', () => {
        let result = ConvertDateStringToObject(new ConvertToDate(), 'AFT 20 JAN 1999');

        expect(result).to.deep.equal({
          Value: new Date(1999, 0, 20, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: true,
          Original: 'AFT 20 JAN 1999',
          After: true,
        });
      });

      it('BEF', () => {
        let result = ConvertDateStringToObject(new ConvertToDate(), 'BEF 20 JAN 1999');

        expect(result).to.deep.equal({
          Value: new Date(1999, 0, 20, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: true,
          Original: 'BEF 20 JAN 1999',
          Before: true,
        });
      });

      it('INT', () => {
        let result = ConvertDateStringToObject(new ConvertToDate(), 'INT 20 JAN 1999');

        expect(result).to.deep.equal({
          Value: '20 JAN 1999',
          Original: 'INT 20 JAN 1999',
          Interpreted: true,
        });
      });
    });

    it('Exact', () => {
      let result = ConvertDateStringToObject(new ConvertToDate(), '20 JAN 1999');

      expect(result).to.deep.equal({
        Value: new Date(1999, 0, 20, 0, 0, 0),
        HasYear: true,
        HasMonth: true,
        HasDay: true,
        Original: '20 JAN 1999',
      });
    });

    it('Month/Year', () => {
      let result = ConvertDateStringToObject(new ConvertToDate(), 'JAN 1999');

      expect(result).to.deep.equal({
        Between: {
          Value: new Date(1999, 0, 1, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: true,
        },
        And: {
          Value: new Date(1999, 1, 1, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: true,
        },
        Original: 'JAN 1999',
      });
    });

    it('Month/Year next year', () => {
      let result = ConvertDateStringToObject(new ConvertToDate(), 'DEC 1999');

      expect(result).to.deep.equal({
        Between: {
          Value: new Date(1999, 11, 1, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: true,
        },
        And: {
          Value: new Date(2000, 0, 1, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: true,
        },
        Original: 'DEC 1999',
      });
    });

    it('Year', () => {
      let result = ConvertDateStringToObject(new ConvertToDate(), '1999');

      expect(result).to.deep.equal({
        Between: {
          Value: new Date(1999, 0, 1, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: true,
        },
        And: {
          Value: new Date(2000, 0, 1, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: true,
        },
        Original: '1999',
      });
    });

    describe('Month tests', () => {
      it('JAN', () => {
        let result = ConvertDateStringToObject(new ConvertToDate(), '20 JAN 1999');

        expect(result).to.deep.equal({
          Value: new Date(1999, 0, 20, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: true,
          Original: '20 JAN 1999',
        });
      });
      it('FEB', () => {
        let result = ConvertDateStringToObject(new ConvertToDate(), '20 FEB 1999');

        expect(result).to.deep.equal({
          Value: new Date(1999, 1, 20, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: true,
          Original: '20 FEB 1999',
        });
      });
      it('MAR', () => {
        let result = ConvertDateStringToObject(new ConvertToDate(), '20 MAR 1999');

        expect(result).to.deep.equal({
          Value: new Date(1999, 2, 20, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: true,
          Original: '20 MAR 1999',
        });
      });
      it('APR', () => {
        let result = ConvertDateStringToObject(new ConvertToDate(), '20 APR 1999');

        expect(result).to.deep.equal({
          Value: new Date(1999, 3, 20, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: true,
          Original: '20 APR 1999',
        });
      });
      it('MAY', () => {
        let result = ConvertDateStringToObject(new ConvertToDate(), '20 MAY 1999');

        expect(result).to.deep.equal({
          Value: new Date(1999, 4, 20, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: true,
          Original: '20 MAY 1999',
        });
      });
      it('JUN', () => {
        let result = ConvertDateStringToObject(new ConvertToDate(), '20 JUN 1999');

        expect(result).to.deep.equal({
          Value: new Date(1999, 5, 20, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: true,
          Original: '20 JUN 1999',
        });
      });
      it('JUL', () => {
        let result = ConvertDateStringToObject(new ConvertToDate(), '20 JUL 1999');

        expect(result).to.deep.equal({
          Value: new Date(1999, 6, 20, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: true,
          Original: '20 JUL 1999',
        });
      });
      it('AUG', () => {
        let result = ConvertDateStringToObject(new ConvertToDate(), '20 AUG 1999');

        expect(result).to.deep.equal({
          Value: new Date(1999, 7, 20, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: true,
          Original: '20 AUG 1999',
        });
      });
      it('SEP', () => {
        let result = ConvertDateStringToObject(new ConvertToDate(), '20 SEP 1999');

        expect(result).to.deep.equal({
          Value: new Date(1999, 8, 20, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: true,
          Original: '20 SEP 1999',
        });
      });
      it('OCT', () => {
        let result = ConvertDateStringToObject(new ConvertToDate(), '20 OCT 1999');

        expect(result).to.deep.equal({
          Value: new Date(1999, 9, 20, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: true,
          Original: '20 OCT 1999',
        });
      });
      it('NOV', () => {
        let result = ConvertDateStringToObject(new ConvertToDate(), '20 NOV 1999');

        expect(result).to.deep.equal({
          Value: new Date(1999, 10, 20, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: true,
          Original: '20 NOV 1999',
        });
      });
      it('DEC', () => {
        let result = ConvertDateStringToObject(new ConvertToDate(), '20 DEC 1999');

        expect(result).to.deep.equal({
          Value: new Date(1999, 11, 20, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: true,
          Original: '20 DEC 1999',
        });
      });
    });
  });

  describe('Own Naming', () => {
    it('FROM TO', () => {
      let result = ConvertDateStringToObject(
        new ConvertToDate('ABT', 'CAL', 'EST', 'BEF', 'AFT', 'BET', 'AND', 'INT', 'START', 'END', 'RESULT', 'MONTH', 'YEAR', 'DAY', 'INITIAL'),
        'FROM 4 FEB 1980 TO 4 JUN 1999'
      );

      expect(result).to.deep.equal({
        START: {
          RESULT: new Date(1980, 1, 4, 0, 0, 0),
          YEAR: true,
          MONTH: true,
          DAY: true,
        },
        END: {
          RESULT: new Date(1999, 5, 4, 0, 0, 0),
          YEAR: true,
          MONTH: true,
          DAY: true,
        },
        INITIAL: 'FROM 4 FEB 1980 TO 4 JUN 1999',
      });
    });

    it('BETWEEN', () => {
      let result = ConvertDateStringToObject(
        new ConvertToDate('ABT', 'CAL', 'EST', 'BEF', 'AFT', 'BET', 'AND', 'INT', 'START', 'END', 'RESULT', 'MONTH', 'YEAR', 'DAY', 'INITIAL'),
        'BETWEEN 4 FEB 1980 AND 4 JUN 1999'
      );

      expect(result).to.deep.equal({
        BET: {
          RESULT: new Date(1980, 1, 4, 0, 0, 0),
          YEAR: true,
          MONTH: true,
          DAY: true,
        },
        AND: {
          RESULT: new Date(1999, 5, 4, 0, 0, 0),
          YEAR: true,
          MONTH: true,
          DAY: true,
        },
        INITIAL: 'BETWEEN 4 FEB 1980 AND 4 JUN 1999',
      });
    });

    describe('With marker', () => {
      it('EST', () => {
        let result = ConvertDateStringToObject(
          new ConvertToDate('ABT', 'CAL', 'EST', 'BEF', 'AFT', 'BET', 'AND', 'INT', 'START', 'END', 'RESULT', 'MONTH', 'YEAR', 'DAY', 'INITIAL'),
          'EST 20 JAN 1999'
        );

        expect(result).to.deep.equal({
          RESULT: new Date(1999, 0, 20, 0, 0, 0),
          YEAR: true,
          MONTH: true,
          DAY: true,
          INITIAL: 'EST 20 JAN 1999',
          EST: true,
        });
      });

      it('ABT', () => {
        let result = ConvertDateStringToObject(
          new ConvertToDate('ABT', 'CAL', 'EST', 'BEF', 'AFT', 'BET', 'AND', 'INT', 'START', 'END', 'RESULT', 'MONTH', 'YEAR', 'DAY', 'INITIAL'),
          'ABT 20 JAN 1999'
        );

        expect(result).to.deep.equal({
          RESULT: new Date(1999, 0, 20, 0, 0, 0),
          YEAR: true,
          MONTH: true,
          DAY: true,
          INITIAL: 'ABT 20 JAN 1999',
          ABT: true,
        });
      });

      it('CAL', () => {
        let result = ConvertDateStringToObject(
          new ConvertToDate('ABT', 'CAL', 'EST', 'BEF', 'AFT', 'BET', 'AND', 'INT', 'START', 'END', 'RESULT', 'MONTH', 'YEAR', 'DAY', 'INITIAL'),
          'CAL 20 JAN 1999'
        );

        expect(result).to.deep.equal({
          RESULT: new Date(1999, 0, 20, 0, 0, 0),
          YEAR: true,
          MONTH: true,
          DAY: true,
          INITIAL: 'CAL 20 JAN 1999',
          CAL: true,
        });
      });

      it('CALENDAR', () => {
        let result = ConvertDateStringToObject(
          new ConvertToDate('ABT', 'CAL', 'EST', 'BEF', 'AFT', 'BET', 'AND', 'INT', 'START', 'END', 'RESULT', 'MONTH', 'YEAR', 'DAY', 'INITIAL', 'CALENDAR'),
          '@#DJULIAN@ CAL 20 JAN 1999'
        );

        expect(result).to.deep.equal({
          RESULT: new Date(1999, 1, 2, 0, 0, 0),
          YEAR: true,
          MONTH: true,
          DAY: true,
          INITIAL: '@#DJULIAN@ CAL 20 JAN 1999',
          CAL: true,
          CALENDAR: 'Julian',
        });
      });

      it('AFT', () => {
        let result = ConvertDateStringToObject(
          new ConvertToDate('ABT', 'CAL', 'EST', 'BEF', 'AFT', 'BET', 'AND', 'INT', 'START', 'END', 'RESULT', 'MONTH', 'YEAR', 'DAY', 'INITIAL'),
          'AFT 20 JAN 1999'
        );

        expect(result).to.deep.equal({
          RESULT: new Date(1999, 0, 20, 0, 0, 0),
          YEAR: true,
          MONTH: true,
          DAY: true,
          INITIAL: 'AFT 20 JAN 1999',
          AFT: true,
        });
      });

      it('BEF', () => {
        let result = ConvertDateStringToObject(
          new ConvertToDate('ABT', 'CAL', 'EST', 'BEF', 'AFT', 'BET', 'AND', 'INT', 'START', 'END', 'RESULT', 'MONTH', 'YEAR', 'DAY', 'INITIAL'),
          'BEF 20 JAN 1999'
        );

        expect(result).to.deep.equal({
          RESULT: new Date(1999, 0, 20, 0, 0, 0),
          YEAR: true,
          MONTH: true,
          DAY: true,
          INITIAL: 'BEF 20 JAN 1999',
          BEF: true,
        });
      });

      it('INT', () => {
        let result = ConvertDateStringToObject(
          new ConvertToDate('ABT', 'CAL', 'EST', 'BEF', 'AFT', 'BET', 'AND', 'INT', 'START', 'END', 'RESULT', 'MONTH', 'YEAR', 'DAY', 'INITIAL'),
          'INT 20 JAN 1999'
        );

        expect(result).to.deep.equal({
          RESULT: '20 JAN 1999',
          INITIAL: 'INT 20 JAN 1999',
          INT: true,
        });
      });
    });
  });
});
