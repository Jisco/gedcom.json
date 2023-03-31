import { expect } from "chai";
import { ParseDateToLine } from "../../src/ToGEDCOM/parsing/parseDate";
import TagDefinition from "../../src/Common/TagDefinition";

describe.only("Date parsing tests", () => {
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

  it("Value Property in Object is no date", () => {
    expect(
      ParseDateToLine(0, new TagDefinition({}), { Value: "No Date" }).result
    ).to.be.undefined;
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

      expect(ParseDateToLine(0, definition, object).result).to.equal(
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

      expect(ParseDateToLine(0, definition, object).result).to.equal(
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
