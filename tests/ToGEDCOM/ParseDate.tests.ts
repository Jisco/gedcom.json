import { expect } from "chai";
import { ParseDateToLine } from "../../src/ToGEDCOM/parsing/parseDate";
import TagDefinition from "../../src/Common/TagDefinition";
import ConvertToDate from "../../src/Common/converter/ConvertToDate";

describe("Date parsing tests", () => {
  it("No Definition", () => {
    expect(ParseDateToLine(0, undefined, {}).result).to.be.undefined;
  });

  it("No Object", () => {
    expect(ParseDateToLine(0, new TagDefinition({}), undefined).result).to.be
      .undefined;
  });

  it("No Value Property in Object", () => {
    expect(ParseDateToLine(0, new TagDefinition({}), {}).result).to.be
      .undefined;
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

      expect(ParseDateToLine(0, definition, object).result).to.equal(
        "0 DATE 4 FEB 1980"
      );
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

      expect(ParseDateToLine(0, definition, object).result).to.equal(
        "0 DATE FROM 4 FEB 1980 TO 4 JUN 1999"
      );
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

      expect(ParseDateToLine(1, definition, object).result).to.equal(
        "1 DATE 4 JUN 1999\n2 TIME 14:35:22"
      );
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

      expect(ParseDateToLine(1, definition, object).result).to.equal(
        "1 DATE 4 JUN 1999 14:35:22"
      );
    });
  });

  // describe("Convert Object to Time String", () => {
  //   it("No Value", () => {
  //     expect(ParseDateToLine(0, undefined, undefined)).to.be.undefined;
  //   });
  // });
});
