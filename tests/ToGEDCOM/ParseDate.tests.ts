import { expect } from "chai";
import { ParseDateToLine } from "../../src/ToGEDCOM/parsing/parseDate";
import TagDefinition from "../../src/Common/TagDefinition";
import ConvertToDate from "../../src/Common/converter/ConvertToDate";
import ObjectParsingResult from "../../src/ToGEDCOM/models/processing/ObjectParsingResult";

describe("Date parsing tests", () => {
  it("No Definition", () => {
    const result = new ObjectParsingResult();
    ParseDateToLine(0, undefined, {}, result);
    expect(result.lines).to.have.lengthOf(0);
  });

  it("No Object", () => {
    const result = new ObjectParsingResult();
    ParseDateToLine(0, new TagDefinition({}), undefined, result);
    expect(result.lines).to.have.lengthOf(0);
  });

  it("No Value Property in Object", () => {
    const result = new ObjectParsingResult();
    ParseDateToLine(0, new TagDefinition({}), {}, result);
    expect(result.lines).to.have.lengthOf(0);
  });

  describe("Different single date settings", () => {
    it("HasDay only", () => {
      const definition = new TagDefinition({
        Tag: "DATE",
        Property: "Date",
        Type: "Date",
      });

      const object = {
        Value: new Date(1999, 5, 4, 0, 0, 0), // Value is date and time combined
        HasYear: false,
        HasMonth: false,
        HasDay: true,
      };
      const result = new ObjectParsingResult();
      ParseDateToLine(1, definition, object, result);
      expect(result.lines).to.deep.equal(["1 DATE 4"]);
    });

    it("HasMonth only", () => {
      const definition = new TagDefinition({
        Tag: "DATE",
        Property: "Date",
        Type: "Date",
      });

      const object = {
        Value: new Date(1999, 5, 4, 0, 0, 0), // Value is date and time combined
        HasYear: false,
        HasMonth: true,
        HasDay: false,
      };
      const result = new ObjectParsingResult();
      ParseDateToLine(1, definition, object, result);
      expect(result.lines).to.deep.equal(["1 DATE JUN"]);
    });

    it("HasYear only", () => {
      const definition = new TagDefinition({
        Tag: "DATE",
        Property: "Date",
        Type: "Date",
      });

      const object = {
        Value: new Date(1999, 5, 4, 0, 0, 0), // Value is date and time combined
        HasYear: true,
        HasMonth: false,
        HasDay: false,
      };
      const result = new ObjectParsingResult();
      ParseDateToLine(1, definition, object, result);
      expect(result.lines).to.deep.equal(["1 DATE 1999"]);
    });

    it("HasMonth and HasYear", () => {
      const definition = new TagDefinition({
        Tag: "DATE",
        Property: "Date",
        Type: "Date",
      });

      const object = {
        Value: new Date(1999, 5, 4, 0, 0, 0), // Value is date and time combined
        HasYear: true,
        HasMonth: true,
        HasDay: false,
      };
      const result = new ObjectParsingResult();
      ParseDateToLine(1, definition, object, result);
      expect(result.lines).to.deep.equal(["1 DATE JUN 1999"]);
    });
  });

  describe("Markers", () => {
    describe("single", () => {
      it("EST", () => {
        const definition = new TagDefinition({
          Tag: "DATE",
          Property: "Date",
          Type: "Date",
        });

        const object = {
          Value: new Date(1999, 5, 4, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: true,
          Estimated: true,
        };
        const result = new ObjectParsingResult();

        ParseDateToLine(1, definition, object, result);
        expect(result.lines).to.deep.equal(["1 DATE EST 4 JUN 1999"]);
      });
      it("ABT", () => {
        const definition = new TagDefinition({
          Tag: "DATE",
          Property: "Date",
          Type: "Date",
        });

        const object = {
          Value: new Date(1999, 5, 4, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: true,
          About: true,
        };
        const result = new ObjectParsingResult();
        ParseDateToLine(1, definition, object, result);
        expect(result.lines).to.deep.equal(["1 DATE ABT 4 JUN 1999"]);
      });
      it("CAL", () => {
        const definition = new TagDefinition({
          Tag: "DATE",
          Property: "Date",
          Type: "Date",
        });

        const object = {
          Value: new Date(1999, 5, 4, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: true,
          Calculated: true,
        };
        const result = new ObjectParsingResult();

        ParseDateToLine(1, definition, object, result);
        expect(result.lines).to.deep.equal(["1 DATE CAL 4 JUN 1999"]);
      });
      it("AFT", () => {
        const definition = new TagDefinition({
          Tag: "DATE",
          Property: "Date",
          Type: "Date",
        });

        const object = {
          Value: new Date(1999, 5, 4, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: true,
          After: true,
        };
        const result = new ObjectParsingResult();
        ParseDateToLine(1, definition, object, result);
        expect(result.lines).to.deep.equal(["1 DATE AFT 4 JUN 1999"]);
      });
      it("BEF", () => {
        const definition = new TagDefinition({
          Tag: "DATE",
          Property: "Date",
          Type: "Date",
        });

        const object = {
          Value: new Date(1999, 5, 4, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: true,
          Before: true,
        };
        const result = new ObjectParsingResult();

        ParseDateToLine(1, definition, object, result);
        expect(result.lines).to.deep.equal(["1 DATE BEF 4 JUN 1999"]);
      });
      it("INT", () => {
        const definition = new TagDefinition({
          Tag: "DATE",
          Property: "Date",
          Type: "Date",
        });

        const object = {
          Value: "Something",
          Interpreted: true,
        };
        const result = new ObjectParsingResult();
        ParseDateToLine(1, definition, object, result);
        expect(result.lines).to.deep.equal(["1 DATE INT Something"]);
      });
    });

    describe("multiple", () => {
      it("2 Markers", () => {
        const definition = new TagDefinition({
          Tag: "DATE",
          Property: "Date",
          Type: "Date",
        });

        const object = {
          Value: new Date(1999, 5, 4, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: true,
          Estimated: true,
          About: true,
        };
        const result = new ObjectParsingResult();

        ParseDateToLine(1, definition, object, result);
        expect(result.lines).to.deep.equal(["1 DATE EST ABT 4 JUN 1999"]);
      });

      it("3 Markers", () => {
        const definition = new TagDefinition({
          Tag: "DATE",
          Property: "Date",
          Type: "Date",
        });

        const object = {
          Value: new Date(1999, 5, 4, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: true,
          Estimated: true,
          About: true,
          Calculated: true,
        };
        const result = new ObjectParsingResult();

        ParseDateToLine(1, definition, object, result);
        expect(result.lines).to.deep.equal(["1 DATE EST ABT CAL 4 JUN 1999"]);
      });
    });
  });

  describe("Calendars", () => {
    describe("Hebrew", () => {
      it("Single date", () => {
        const definition = new TagDefinition({
          Tag: "DATE",
          Property: "Date",
          Type: "Date",
        });
        const object = {
          Value: new Date(1980, 1, 4, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: true,
          Calendar: "Hebrew",
        };
        const result = new ObjectParsingResult();
        ParseDateToLine(1, definition, object, result);
        expect(result.lines).to.deep.equal(["1 DATE @#DHEBREW@ 17 SHV 5740"]);
      });

      it("Month/Year", () => {
        const definition = new TagDefinition({
          Tag: "DATE",
          Property: "Date",
          Type: "Date",
        });

        const object = {
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
          Calendar: "Hebrew",
        };
        const result = new ObjectParsingResult();

        ParseDateToLine(1, definition, object, result);
        expect(result.lines).to.deep.equal(["1 DATE @#DHEBREW@ SHV 5740"]);
      });

      it("Year", () => {
        const definition = new TagDefinition({
          Tag: "DATE",
          Property: "Date",
          Type: "Date",
        });

        const object = {
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
          Calendar: "Hebrew",
        };
        const result = new ObjectParsingResult();

        ParseDateToLine(1, definition, object, result);
        expect(result.lines).to.deep.equal(["1 DATE @#DHEBREW@ 5740"]);
      });

      it("from to gregorian", () => {
        const definition = new TagDefinition({
          Tag: "DATE",
          Property: "Date",
          Type: "Date",
        });
        const object = {
          From: {
            Value: new Date(1980, 1, 4, 0, 0, 0),
            HasYear: true,
            HasMonth: true,
            HasDay: true,
            Calendar: "Hebrew",
          },
          To: {
            Value: new Date(1980, 11, 31, 0, 0, 0),
            HasYear: true,
            HasMonth: true,
            HasDay: true,
          },
        };
        const result = new ObjectParsingResult();
        ParseDateToLine(1, definition, object, result);
        expect(result.lines).to.deep.equal([
          "1 DATE FROM @#DHEBREW@ 17 SHV 5740 TO 31 DEC 1980",
        ]);
      });

      it("from to", () => {
        const definition = new TagDefinition({
          Tag: "DATE",
          Property: "Date",
          Type: "Date",
        });
        const object = {
          From: {
            Value: new Date(1980, 1, 4, 0, 0, 0),
            HasYear: true,
            HasMonth: true,
            HasDay: true,
            Calendar: "Hebrew",
          },
          To: {
            Value: new Date(1980, 11, 32, 0, 0, 0),
            HasYear: true,
            HasMonth: true,
            HasDay: true,
            Calendar: "Hebrew",
          },
        };
        const result = new ObjectParsingResult();
        ParseDateToLine(1, definition, object, result);
        expect(result.lines).to.deep.equal([
          "1 DATE FROM @#DHEBREW@ 17 SHV 5740 TO @#DHEBREW@ 25 TVT 5741",
        ]);
      });
    });

    describe("Julian", () => {
      it("Single date", () => {
        const definition = new TagDefinition({
          Tag: "DATE",
          Property: "Date",
          Type: "Date",
        });
        const object = {
          Value: new Date(1980, 1, 4, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: true,
          Calendar: "Julian",
        };
        const result = new ObjectParsingResult();

        ParseDateToLine(1, definition, object, result);
        expect(result.lines).to.deep.equal(["1 DATE @#DJULIAN@ 22 JAN 1980"]);
      });

      it("Month/Year", () => {
        const definition = new TagDefinition({
          Tag: "DATE",
          Property: "Date",
          Type: "Date",
        });
        const object = {
          Between: {
            Value: new Date(1980, 0, 14, 0, 0, 0),
            HasYear: true,
            HasMonth: true,
            HasDay: true,
            Calendar: "Julian",
          },
          And: {
            Value: new Date(1980, 1, 14, 0, 0, 0),
            HasYear: true,
            HasMonth: true,
            HasDay: true,
            Calendar: "Julian",
          },
        };
        const result = new ObjectParsingResult();
        ParseDateToLine(1, definition, object, result);
        expect(result.lines).to.deep.equal(["1 DATE @#DJULIAN@ JAN 1980"]);
      });

      it("Year", () => {
        const definition = new TagDefinition({
          Tag: "DATE",
          Property: "Date",
          Type: "Date",
        });
        const object = {
          Between: {
            Value: new Date(1980, 0, 14, 0, 0, 0),
            HasYear: true,
            HasMonth: true,
            HasDay: true,
            Calendar: "Julian",
          },
          And: {
            Value: new Date(1981, 0, 14, 0, 0, 0),
            HasYear: true,
            HasMonth: true,
            HasDay: true,
            Calendar: "Julian",
          },
        };
        const result = new ObjectParsingResult();
        ParseDateToLine(1, definition, object, result);
        expect(result.lines).to.deep.equal(["1 DATE @#DJULIAN@ 1980"]);
      });

      it("from to gregorian", () => {
        const definition = new TagDefinition({
          Tag: "DATE",
          Property: "Date",
          Type: "Date",
        });
        const object = {
          From: {
            Value: new Date(1980, 1, 4, 0, 0, 0),
            HasYear: true,
            HasMonth: true,
            HasDay: true,
            Calendar: "Julian",
          },
          To: {
            Value: new Date(1980, 11, 31, 0, 0, 0),
            HasYear: true,
            HasMonth: true,
            HasDay: true,
          },
        };
        const result = new ObjectParsingResult();
        ParseDateToLine(1, definition, object, result);
        expect(result.lines).to.deep.equal([
          "1 DATE FROM @#DJULIAN@ 22 JAN 1980 TO 31 DEC 1980",
        ]);
      });

      it("from to", () => {
        const definition = new TagDefinition({
          Tag: "DATE",
          Property: "Date",
          Type: "Date",
        });
        const object = {
          From: {
            Value: new Date(1980, 1, 4, 0, 0, 0),
            HasYear: true,
            HasMonth: true,
            HasDay: true,
            Calendar: "Julian",
          },
          To: {
            Value: new Date(1980, 11, 31, 0, 0, 0),
            HasYear: true,
            HasMonth: true,
            HasDay: true,
            Calendar: "Julian",
          },
        };

        const result = new ObjectParsingResult();
        ParseDateToLine(1, definition, object, result);
        expect(result.lines).to.deep.equal([
          "1 DATE FROM @#DJULIAN@ 22 JAN 1980 TO @#DJULIAN@ 18 DEC 1980",
        ]);
      });
    });
  });

  describe("Special cases", () => {
    describe("Between", () => {
      describe("Exact", () => {
        it("Full Dates", () => {
          const definition = new TagDefinition({
            Tag: "DATE",
            Property: "Date",
            Type: "Date",
          });

          const object = {
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
          };

          const result = new ObjectParsingResult();
          ParseDateToLine(1, definition, object, result);
          expect(result.lines).to.deep.equal([
            "1 DATE BETWEEN 4 FEB 1980 AND 4 JUN 1999",
          ]);
        });

        it("Full Month", () => {
          const definition = new TagDefinition({
            Tag: "DATE",
            Property: "Date",
            Type: "Date",
          });

          const object = {
            Between: {
              Value: new Date(1980, 0, 1, 0, 0, 0),
              HasYear: true,
              HasMonth: true,
              HasDay: false,
            },
            And: {
              Value: new Date(1999, 0, 1, 0, 0, 0),
              HasYear: true,
              HasMonth: true,
              HasDay: false,
            },
          };
          const result = new ObjectParsingResult();
          ParseDateToLine(1, definition, object, result);
          expect(result.lines).to.deep.equal([
            "1 DATE BETWEEN JAN 1980 AND JAN 1999",
          ]);
        });

        it("Full Year", () => {
          const definition = new TagDefinition({
            Tag: "DATE",
            Property: "Date",
            Type: "Date",
          });

          const object = {
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
          };
          const result = new ObjectParsingResult();
          ParseDateToLine(1, definition, object, result);
          expect(result.lines).to.deep.equal(["1 DATE BETWEEN 1980 AND 1999"]);
        });
      });

      describe("Short Format", () => {
        it("Full Month Same Year", () => {
          const definition = new TagDefinition({
            Tag: "DATE",
            Property: "Date",
            Type: "Date",
          });

          const object = {
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
          };
          const result = new ObjectParsingResult();
          ParseDateToLine(1, definition, object, result);
          expect(result.lines).to.deep.equal(["1 DATE JAN 1999"]);
        });

        it("Full Month Next Year", () => {
          const definition = new TagDefinition({
            Tag: "DATE",
            Property: "Date",
            Type: "Date",
          });

          const object = {
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
          };
          const result = new ObjectParsingResult();
          ParseDateToLine(1, definition, object, result);
          expect(result.lines).to.deep.equal(["1 DATE DEC 1999"]);
        });

        it("Full Year", () => {
          const definition = new TagDefinition({
            Tag: "DATE",
            Property: "Date",
            Type: "Date",
          });

          const object = {
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
          };
          const result = new ObjectParsingResult();
          ParseDateToLine(1, definition, object, result);
          expect(result.lines).to.deep.equal(["1 DATE 1999"]);
        });
      });
    });
  });

  describe("Different property name definition", () => {
    it("Own Value Propertyname definition", () => {
      const definition = new TagDefinition({
        Tag: "DATE",
        ConvertTo: {
          Type: "Date",
          Original: "Initial",
          Value: "JSDate",
        } as ConvertToDate,
      });

      const object = {
        JSDate: new Date(1980, 1, 4, 0, 0, 0),
        HasYear: true,
        HasMonth: true,
        HasDay: true,
        Initial: "4 FEB 1980",
      };

      const result = new ObjectParsingResult();
      ParseDateToLine(0, definition, object, result);
      expect(result.lines).to.deep.equal(["0 DATE 4 FEB 1980"]);
    });

    it("Own Propertynames definition", () => {
      const definition = new TagDefinition({
        Tag: "DATE",
        ConvertTo: {
          Type: "Date",
          From: "Start",
          To: "End",
          Original: "Initial",
          Value: "JSDate",
        } as ConvertToDate,
      });

      const object = {
        Start: {
          JSDate: new Date(1980, 1, 4, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: true,
        },
        End: {
          JSDate: new Date(1999, 5, 4, 0, 0, 0),
          HasYear: true,
          HasMonth: true,
          HasDay: true,
        },
        Initial: "FROM 4 FEB 1980 TO 4 JUN 1999",
      };

      const result = new ObjectParsingResult();
      ParseDateToLine(0, definition, object, result);
      expect(result.lines).to.deep.equal([
        "0 DATE FROM 4 FEB 1980 TO 4 JUN 1999",
      ]);
    });
  });

  describe("Date and Time", () => {
    it("Return Date and Time in single Line", () => {
      const definition = new TagDefinition({
        Tag: "DATE",
        Property: "Date",
        Type: "Date",
        Properties: [
          {
            Tag: "TIME",
            Property: "Time",
            ConvertTo: {
              Type: "Time",
            },
          },
        ],
      });

      const object = {
        Value: new Date(1999, 5, 4, 14, 35, 22), // Value is date and time combined
        HasYear: true,
        HasMonth: true,
        HasDay: true,
        Original: "4 JUN 1999",
        Time: "14:35:22", // is own property because of TIME has a property defined
      };

      const result = new ObjectParsingResult();
      ParseDateToLine(1, definition, object, result);
      expect(result.lines).to.deep.equal([
        "1 DATE 4 JUN 1999\n2 TIME 14:35:22",
      ]);
    });

    it("Return Date and Time in two Lines", () => {
      const definition = new TagDefinition({
        Tag: "DATE",
        Property: "Date",
        Type: "Date",
        Properties: [
          {
            Tag: "TIME",
            ConvertTo: {
              Type: "Time",
            },
          },
        ],
      });

      const object = {
        Value: new Date(1999, 5, 4, 14, 35, 22), // Value is date and time combined
        HasYear: true,
        HasMonth: true,
        HasDay: true,
        Original: "4 JUN 1999 14:35:22",
      };

      const result = new ObjectParsingResult();
      ParseDateToLine(1, definition, object, result);
      expect(result.lines).to.deep.equal(["1 DATE 4 JUN 1999 14:35:22"]);
    });
  });
});
