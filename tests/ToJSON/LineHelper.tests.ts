import { expect } from 'chai';
import { GetLineLevel, GetReferenceId } from '../../src/ToJSON/parsing/lineHelper';

it('GetLineLevel', () => {
    expect(GetLineLevel("0")).to.equal(0);
    expect(GetLineLevel("1")).to.equal(1);
    expect(GetLineLevel("2")).to.equal(2);
    expect(GetLineLevel("3")).to.equal(3);
    expect(GetLineLevel("4")).to.equal(4);
    expect(GetLineLevel("5")).to.equal(5);
    expect(GetLineLevel("6")).to.equal(6);
    expect(GetLineLevel("7")).to.equal(7);
    expect(GetLineLevel("8")).to.equal(8);
    expect(GetLineLevel("9")).to.equal(9);
    expect(GetLineLevel("10")).to.equal(10);
    expect(GetLineLevel("11")).to.equal(11);
    expect(GetLineLevel("99")).to.equal(99);
});

it('GetReferenceId', () => {
    expect(GetReferenceId("")).to.be.undefined;
    expect(GetReferenceId("Test")).to.be.undefined;
    expect(GetReferenceId("@Test@")).to.equal("@Test@");
    expect(GetReferenceId("@Test")).to.be.undefined;
    expect(GetReferenceId("Test@")).to.be.undefined;
    expect(GetReferenceId("@@Test@")).to.be.undefined;
    expect(GetReferenceId("@Test@@")).to.be.undefined;
    expect(GetReferenceId("   @Test@    ")).to.equal("@Test@");
});