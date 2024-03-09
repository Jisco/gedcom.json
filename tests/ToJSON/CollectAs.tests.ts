import { expect } from 'chai';
import { ParseText } from '../../src/ToJSON/parsing/parsing';

describe('CollectAs', () => {
  let testData = `
    0 @ID@ WHAT
    1 ATTR1 Hey attribute 1
    1 ATTR2 Hey another attribute
    1 SUB1 What?!
    2 ATTR1 Hey an sub attribute
    3 DEEP Super Deep
    3 DEEP Super Deep too
    2 ATTR2 Hey a second sub attribute
    0 TRLR`;

  it('Dont Parse DEEP', () => {
    let options = `
      Definition:
      - Tag: WHAT
        CollectAs: Collection
        Property: Id
        Properties:
        - Tag: ATTR1
          Property: Attribute1
        - Tag: ATTR2
          Property: Attribute2
        - Tag: SUB1
          Property: SubProp
          MergeWithLast: WHAT
          Properties:
          - Tag: ATTR1
            Property: Attr1
            MergeWithLast: WHAT
      `;

    expect(ParseText(testData, options).Object).to.deep.equal({
      Collection: {
        Id: '@ID@',
        Attribute1: 'Hey attribute 1',
        Attribute2: 'Hey another attribute',
        SubProp: 'What?!',
        Attr1: 'Hey an sub attribute',
      },
    });
  });

  it('Flatten attributes', () => {
    let options = `
        Definition:
          - Tag: WHAT
            CollectAs: Collection
            Property: Id
            Properties:
              - Tag: ATTR1
                Property: Attribute1
              - Tag: ATTR2
                Property: Attribute2
              - Tag: SUB1
                Property: SubProp
                MergeWithLast: WHAT
                Properties:
                  - Tag: ATTR1
                    Property: Attr1
                    MergeWithLast: WHAT
                    Properties:
                      - Tag: DEEP
                        Property: Deep
                        MergeWithLast: WHAT
        `;

    expect(ParseText(testData, options).Object).to.deep.equal({
      Collection: {
        Id: '@ID@',
        Attribute1: 'Hey attribute 1',
        Attribute2: 'Hey another attribute',
        SubProp: 'What?!',
        Attr1: 'Hey an sub attribute',
        Deep: ['Super Deep too', 'Super Deep'],
      },
    });
  });

  it('Collect as subitems', () => {
    let options = `
        Definition:
          - Tag: WHAT
            CollectAs: Collection
            Property: Id
            Properties:
              - Tag: ATTR1
                Property: Attribute1
              - Tag: ATTR2
                Property: Attribute2
              - Tag: SUB1
                Property: SubItemId
                CollectAs: SubItems
                Properties:
                  - Tag: ATTR1
                    Property: Attr1
                    Properties:
                      - Tag: DEEP
                        Property: Deep
                        MergeWithLast: WHAT
        `;

    expect(ParseText(testData, options).Object).to.deep.equal({
      Collection: {
        Id: '@ID@',
        Attribute1: 'Hey attribute 1',
        Attribute2: 'Hey another attribute',
        SubItems: {
          SubItemId: 'What?!',
          Attr1: 'Hey an sub attribute',
        },
        Deep: ['Super Deep too', 'Super Deep'],
      },
    });
  });

  it('Collect merge with last tagged item', () => {
    let options = `
        Definition:
          - Tag: WHAT
            CollectAs: Collection
            Property: Id
            Properties:
              - Tag: ATTR1
                Property: Attribute1
              - Tag: ATTR2
                Property: Attribute2
              - Tag: SUB1
                Property: SubItemId
                CollectAs: SubItems
                Properties:
                  - Tag: ATTR1
                    Property: Attr1
                    Properties:
                      - Tag: DEEP
                        MergeWithLast: SUB1
                        Property: Deep
        `;

    expect(ParseText(testData, options).Object).to.deep.equal({
      Collection: {
        Id: '@ID@',
        Attribute1: 'Hey attribute 1',
        Attribute2: 'Hey another attribute',
        SubItems: {
          SubItemId: 'What?!',
          Attr1: 'Hey an sub attribute',
          Deep: ['Super Deep too', 'Super Deep'],
        },
      },
    });
  });

  it('Create Object and Arrays if needed', () => {
    let options = `
      Definition:
        - Tag: WHAT
          CollectAs: Collection
          Property: Id
          Properties:
            - Tag: ATTR1
              Property: Attribute1
            - Tag: ATTR2
              Property: Attribute2
            - Tag: SUB1
              Property: SubItemId
              CollectAs: SubItems
              Properties:
                - Tag: ATTR1
                  Property: Attr1
                  Properties:
                    - Tag: DEEP
                      Property: Deep
                - Tag: ATTR2
                  Property: Attr2
      `;

    expect(ParseText(testData, options).Object).to.deep.equal({
      Collection: {
        Id: '@ID@',
        Attribute1: 'Hey attribute 1',
        Attribute2: 'Hey another attribute',
        SubItems: {
          SubItemId: 'What?!',
          Attr1: {
            Value: 'Hey an sub attribute',
            Deep: ['Super Deep', 'Super Deep too'],
          },
          Attr2: 'Hey a second sub attribute',
        },
      },
    });
  });

  it('Collect as single value', () => {
    let options = `
        Definition:
          - Tag: WHAT
            CollectAs: Collection
            Property: Id
            Properties:
              - Tag: ATTR1
                Property: Attribute1
              - Tag: ATTR2
                Property: Attribute2
              - Tag: SUB1
                Property: SubItemId
                CollectAs: SubItems
                Properties:
                  - Tag: ATTR1
                    Property: Attr1
                    Properties:
                      - Tag: DEEP
                        MergeWithLast: SUB1
                        Property: Deep
                  - Tag: ATTR2
                    Property: Attr2
        `;

    expect(ParseText(testData, options).Object).to.deep.equal({
      Collection: {
        Id: '@ID@',
        Attribute1: 'Hey attribute 1',
        Attribute2: 'Hey another attribute',
        SubItems: {
          SubItemId: 'What?!',
          Attr1: 'Hey an sub attribute',
          Deep: ['Super Deep too', 'Super Deep'],
          Attr2: 'Hey a second sub attribute',
        },
      },
    });
  });

  it('Collect as independent single value', () => {
    let options = `
      Definition:
        - Tag: WHAT
          CollectAs: Collection
          Property: Id
          Properties:
            - Tag: ATTR1
              Property: Attribute1
            - Tag: ATTR2
              Property: Attribute2
            - Tag: SUB1
              Property: SubItemId
              CollectAs: SubItems
              Properties:
                - Tag: ATTR1
                  CollectAs: Attr1
                  Property: Attr1Id
                  Properties:
                    - Tag: DEEP
                      Property: Deep
      `;

    expect(ParseText(testData, options).Object).to.deep.equal({
      Collection: {
        Id: '@ID@',
        Attribute1: 'Hey attribute 1',
        Attribute2: 'Hey another attribute',
        SubItems: {
          SubItemId: 'What?!',
          Attr1: {
            Attr1Id: 'Hey an sub attribute',
            Deep: ['Super Deep', 'Super Deep too'],
          },
        },
      },
    });
  });

  it('Collect as sub property', () => {
    let options = `
        Definition:
          - Tag: WHAT
            CollectAs: Collection
            Property: Id
            Properties:
              - Tag: ATTR1
                Property: Attribute1.Attr1
              - Tag: ATTR2
                Property: Attribute1.Attr2
        `;

    expect(ParseText(testData, options).Object).to.deep.equal({
      Collection: {
        Id: '@ID@',
        Attribute1: {
          Attr1: 'Hey attribute 1',
          Attr2: 'Hey another attribute',
        },
      },
    });
  });
});
