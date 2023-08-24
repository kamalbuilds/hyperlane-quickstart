const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Ownee", function () {
  let owner, ownee;

  before(async function () {
    [owner] = await ethers.getSigners();

    const Ownee = await ethers.getContractFactory("Ownee");
    ownee = await Ownee.deploy(owner.address);
    await ownee.deployed();
  });

  it("should set the fee", async function () {
    const newFee = 42;
    await ownee.setFee(newFee);

    const fee = await ownee.fee();
    expect(fee).to.equal(newFee);
  });

  it("should not allow non-owners to set the fee", async function () {
    const [ , nonOwner] = await ethers.getSigners();

    await expect(ownee.connect(nonOwner).setFee(100)).to.be.revertedWith(
      "Ownable: caller is not the owner"
    );
  });
});
