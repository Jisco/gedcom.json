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

      expect(result.Result.lines).to.deep.equal([
        "0 HEAD",
        "1 SOUR GRAMPS",
        "2 NAME GRAMPS",
        "2 VERS 2.2.6-1",
        "0 TRLR",
      ]);
    });

    it("With Date", () => {
      const testObject = {
        Head: {
          Source: {
            Name: ["GRAMPS", "GRAMPS"],
            Version: "2.2.6-1",
          },
          Date: {
            Original: "9 MAR 2007",
            HasYear: true,
            HasMonth: true,
            HasDay: true,
            Value: "2007-03-08T23:00:00.000Z",
          },
        },
      };

      const testDefinition = {
        Definition: [
          { Tag: "HEAD", CollectAs: "Head" },
          { Tag: "SOUR", CollectAs: "Source", Property: "Name" },
          { Tag: "NAME", Property: "Name" },
          { Tag: "VERS", Property: "Version" },
          { Tag: "DATE", Property: "Date", Type: "Date" },
        ],
      };

      const result = ProcessObject(testObject, testDefinition, () => {
        //
      });

      expect(result.Result.lines).to.deep.equal([
        "0 HEAD",
        "1 SOUR GRAMPS",
        "2 NAME GRAMPS",
        "2 VERS 2.2.6-1",
        "1 DATE 9 MAR 2007",
        "0 TRLR",
      ]);
    });

    it("Submitter", () => {
      const testObject = {
        Head: {
          Source: {
            Name: ["GRAMPS"],
            Version: "2.2.6-1",
          },
          Submitter: {
            Id: "@SUBM@",
          },
          Copyright: "Copyright (c) 2007 .",
        },
        Submitter: [
          {
            Id: "@SUBM@",
            Name: "Not Provided",
            Address: "Not Provided\nNot Provided",
          },
        ],
      };

      const testDefinition = {
        Definition: [
          { Tag: "HEAD", CollectAs: "Head" },
          { Tag: "SOUR", CollectAs: "Source", Property: "Name" },
          { Tag: "NAME", Property: "Name" },
          { Tag: "VERS", Property: "Version" },
          {
            Tag: "SUBM",
            CollectAs: "Submitter",
            CollectAsArray: true,
            Property: "Id",
          },
          { Tag: "ADDR", Property: "Address" },
          {
            Tag: "CONT",
            MergeWithLast: "true",
            StartWith: "\n",
          },
          {
            Tag: "COPR",
            Property: "Copyright",
          },
        ],
      };

      const result = ProcessObject(testObject, testDefinition, () => {
        //
      });

      expect(result.Result.lines).to.deep.equal([
        "0 HEAD",
        "1 SOUR GRAMPS",
        "2 VERS 2.2.6-1",
        "1 SUBM @SUBM@",
        "1 COPR Copyright (c) 2007 .",
        "0 @SUBM@ SUBM",
        "1 NAME Not Provided",
        "1 ADDR Not Provided",
        "2 CONT Not Provided",
        "0 TRLR",
      ]);
    });

    it.skip("Individuals", () => {
      const testObject = {
        Head: {},
        Individuals: [
          {
            Id: "@Abraham_Simpson@",
            Surname: "Simpson",
            Givenname: "Abraham",
            Fullname: "Abraham /Simpson/",
            Sex: "M",
            Relations: "@F0002@",
            Changed: {
              Date: {
                Original: "11 FEB 2007 15:05:36",
                HasYear: true,
                HasMonth: true,
                HasDay: true,
                Value: "2007-02-11T14:05:36.000Z",
              },
            },
          },
        ],
      };

      const testDefinition = {
        Definition: [
          { Tag: "HEAD", CollectAs: "Head" },
          { Tag: "SEX", CollectAs: "Sex" },
          {
            Tag: "FAM",
            CollectAs: "Relations",
            CollectAsArray: true,
            Property: "Id",
          },
          { Tag: "CHAN", CollectAs: "Changed" },
          { Tag: "FAMC", CollectAs: "Relations" },
          { Tag: "FAMS", CollectAs: "Relations" },
          { Tag: "FAMF", CollectAs: "FamilyFile" },
          {
            Tag: "DATE",
            Property: "Date",
            Type: "Date",
          },
          {
            Tag: "INDI",
            CollectAs: "Individuals",
            CollectAsArray: true,
            Property: "Id",
            Properties: [
              {
                Tag: "NAME",
                Property: "Fullname",
                Properties: [
                  { Tag: "GIVN", Property: "Givenname", MergeWithLast: "INDI" },
                  { Tag: "SURN", Property: "Surname", MergeWithLast: "INDI" },
                ],
              },
            ],
          },
        ],
      };

      const result = ProcessObject(testObject, testDefinition, () => {
        //
      });

      expect(result.Result.lines).to.deep.equal([
        "0 HEAD",
        "0 @Abraham_Simpson@ INDI",
        "1 NAME Abraham /Simpson/",
        "2 GIVN Abraham",
        "2 SURN Simpson",
        "1 SEX M",
        "1 FAMS @F0002@",
        "1 CHAN",
        "2 DATE 11 FEB 2007",
        "3 TIME 15:05:36",
        "0 TRLR",
      ]);
    });
  });
});
