import { expect } from "chai";
import ConvertToArray from "../../src/Common/converter/ConvertToArray";
import TagDefinition from "../../src/Common/TagDefinition";
import ParsedLine from "../../src/ToJSON/models/ParsedLine";
import {
  AddStartWith,
  ManipulateValue,
} from "../../src/ToJSON/processing/manipulateValues";

describe("Mainpulate Values", () => {
  it("Value is ID as Array", () => {
    const result = ManipulateValue(
      new TagDefinition({
        ConvertTo: new ConvertToArray(","),
      }),
      new ParsedLine(0, 0, "TAG", "", "@111@")
    );

    expect(result).to.be.deep.equal(["@111@"]);
  });

  it("Value is empty", () => {
    const result = ManipulateValue(
      new TagDefinition({
        ConvertTo: new ConvertToArray(","),
      }),
      new ParsedLine(0, 0, "TAG", undefined, undefined)
    );

    expect(result).to.be.deep.equal([""]);
  });
});

describe("AddStartWith", () => {
  it("Start with escaped new line", () => {
    const result = AddStartWith("\\n", "Text");
    expect(result).to.be.equal("\nText");
  });

  it("No StartWith", () => {
    const result = AddStartWith(undefined, "Text");
    expect(result).to.be.equal("Text");
  });

  it("No StartWith and value", () => {
    const result = AddStartWith(undefined, undefined);
    expect(result).to.be.equal("");
  });
});
