import { expect } from "chai";
import { ParseDateToLine } from "../../src/ToGEDCOM/parsing/parseDate";

describe.only("Date parsing tests", () => {
  it("No Definition", () => {
    expect(ParseDateToLine(0, undefined, {}).result).to.be.undefined;
  });

  it("No Object", () => {
    expect(ParseDateToLine(0, {}, undefined).result).to.be.undefined;
  });

  it("No Value Property in Object", () => {
    expect(ParseDateToLine(0, {}, {}).result).to.be.undefined;
  });

  it("Value Property in Object is no date", () => {
    expect(ParseDateToLine(0, {}, { Value: "No Date" }).result).to.be.undefined;
  });

  // describe("Date and Time", () => {
  //   it("Return Date and Time in single Line", () => {
  //     const definition = {
  //       Definition
  //     }
  //   });

  //   it("Return Date and Time in two Lines", () => {

  //   });
  // })

  // describe("Convert Object to Time String", () => {
  //   it("No Value", () => {
  //     expect(ParseDateToLine(0, undefined, undefined)).to.be.undefined;
  //   });
  // });
});
