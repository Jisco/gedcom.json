import { expect } from "chai";
import { first } from "lodash";
import TagDefinition from "../../src/Common/TagDefinition";
import { SearchDefinition } from "../../src/ToGEDCOM/parsing/searchDefinition";

describe("Search definition deep", () => {
  it("No definitions", () => {
    const result = SearchDefinition([], "");
    expect(result).to.be.undefined;
  });

  it("No Path", () => {
    const result = SearchDefinition([{ Tag: "Test" }], "");
    expect(result).to.be.undefined;
  });

  it("Find definitions", () => {
    const definition = [
      { Tag: "INDI", CollectAs: "Individuals", Property: "Id" },
      {
        Tag: "CHAN",
        Property: "Changed",
        Properties: [{ Tag: "DATE", Property: "ChangedDate", Type: "Date" }],
      },
      { Tag: "DATE", Property: "Date", Type: "Date" },
      { Tag: "TIME", Type: "Time" },
    ];

    expect(SearchDefinition(definition, "Individuals")).to.deep.equal(
      new TagDefinition(definition[0])
    );
    expect(SearchDefinition(definition, "Changed")).to.deep.equal(
      new TagDefinition(definition[1])
    );
    expect(SearchDefinition(definition, "Date")).to.deep.equal(
      new TagDefinition(definition[2])
    );
    expect(SearchDefinition(definition, "Changed.ChangedDate")).to.deep.equal(
      new TagDefinition(first(definition[1].Properties))
    );
  });

  it("Find definition deep", () => {
    const definition = [
      {
        Tag: "INDI",
        CollectAs: "Individuals",
        Property: "Id",
        Properties: [
          {
            Tag: "NAME",
            Property: "FullName",
          },
        ],
      },
      { Tag: "NAME", Property: "FullName" },
    ];

    expect(SearchDefinition(definition, "Individuals.FullName")).to.deep.equal(
      new TagDefinition(first(definition[0].Properties))
    );

    expect(SearchDefinition(definition, "FullName")).to.deep.equal(
      new TagDefinition(definition[1])
    );
  });

  it("Find definition very deep", () => {
    const definition = [
      {
        Tag: "INDI",
        CollectAs: "Individuals",
        Property: "Id",
        Properties: [
          {
            Tag: "INDI2",
            CollectAs: "Individuals2",
            Properties: [
              {
                Tag: "INDI3",
                CollectAs: "Individuals3",
                Properties: [
                  {
                    Tag: "INDI4",
                    CollectAs: "Individuals4",
                    Properties: [
                      {
                        Tag: "INDI5",
                        Property: "FullName",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      { Tag: "NAME", Property: "FullName" },
    ];

    expect(
      SearchDefinition(
        definition,
        "Individuals.Individuals2.Individuals3.Individuals4.FullName"
      )?.Tag
    ).to.equal("INDI5");

    expect(SearchDefinition(definition, "FullName")).to.deep.equal(
      new TagDefinition(definition[1])
    );
  });

  it("Find definition", () => {
    const definition = [
      {
        Tag: "Tag",
        Property: "Tag",
        Properties: [
          {
            Tag: "SubTag",
          },
        ],
      },
    ];

    expect(SearchDefinition(definition, "AAA.Tag")).to.deep.equal(
      new TagDefinition(definition[0])
    );

    expect(SearchDefinition(definition, "AAA.BBB.Tag")).to.deep.equal(
      new TagDefinition(definition[0])
    );

    expect(SearchDefinition(definition, "AAA.BBB.CCC.Tag")).to.deep.equal(
      new TagDefinition(definition[0])
    );
  });

  it("No definition of tag in properties", () => {
    const definition = [
      {
        Tag: "Tag",
        Properties: [
          {
            Tag: "SubTag2",
          },
        ],
      },
    ];

    expect(SearchDefinition(definition, "AAA.Tag")).to.be.undefined;
  });

  it("Find Date\\Time Definition", () => {
    const definition = [
      {
        Tag: "DATES",
        Property: "Dates",
        Properties: [
          {
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
          },
        ],
      },
    ];

    expect(SearchDefinition(definition, "Dates.Date")).to.deep.equal(
      new TagDefinition(first(definition[0].Properties))
    );
  });
});
