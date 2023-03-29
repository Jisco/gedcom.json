import { expect } from "chai";
import { ProcessObject } from "../../src/ToGEDCOM/parsing/processObject";

describe("Parsing object", () => {
  describe("CollectAs", () => {
    it("Simple", () => {
      const testObject = {
        Head: {
          Source: {
            Name: ["GRAMPS", "GRAMPS"],
            Version: "2.2.6-1",
          },
        },
      };

      const testDefinition = {
        Definition: [
          { Tag: "HEAD", CollectAs: "Head" },
          { Tag: "SOUR", CollectAs: "Source", Property: "Name" },
          { Tag: "NAME", Property: "Name" },
          { Tag: "VERS", Property: "Version" },
        ],
      };

      const result = ProcessObject(testObject, testDefinition, () => {
        //
      });

      expect(result.Text.split("\n")).to.deep.equal([
        "0 HEAD",
        "1 SOUR GRAMPS",
        "2 NAME GRAMPS",
        "2 VERS 2.2.6-1",
        "0 TRLR",
      ]);
    });
  });
});
