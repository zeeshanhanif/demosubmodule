import { BigNumber, Wallet } from 'ethers';
import { ethers } from 'hardhat';
var crypto = require('crypto');
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import { expect } from 'chai';
import { DemoNFT, DemoNFT__factory } from '../typechain-types';

// CommDevice is same as Equipment
describe("DemoNFT: Initial Test Cases", function () {
  let demoNFT:DemoNFT;
  before(async()=>{
    const [owner, addr1, addr2] = await ethers.getSigners();

    const DemoNFT:DemoNFT__factory = await ethers.getContractFactory("DemoNFT");
    demoNFT = await DemoNFT.deploy("EquipmentB", "EQB");
    await demoNFT.deployed();
  });


  it("Default URI should be set", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();
    expect(await demoNFT.connect(addr1).defaultURI()).to.be.equal("ipfs://QmXsMLpKjznF3z1KsVm5tNs3E94vj4BFAyAHvD5RTWgQ1J");
  });

  it("TotalMinted=0", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();
    
    expect(await demoNFT.connect(addr1).totalSupply()).to.be.equal(0);
  });

  it("Manager should be same as owner", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();
    expect(await demoNFT.connect(addr2).manager()).to.be.equal(owner.address);
  });


  it("Token URI should fail because not token has been minted", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();
    await expect((demoNFT.connect(addr2).tokenURI(1))).to.be.revertedWith("Token does not exists");
  });

  it("Mint should successfull", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();
    expect(demoNFT.connect(addr1).mint()).to.be.ok;
  });

  it("TotalMinted=1", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();
    
    expect(await demoNFT.connect(addr1).totalSupply()).to.be.equal(1);
  });

});
