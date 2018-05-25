var CrowdSale = artifacts.require("CrowdSale");
var MyToken = artifacts.require("MyToken");
let startPrice = web3.toWei(120, 'ether');
let targetPrice = web3.toWei(60, 'ether');
module.exports = async function(deployer) {
  await deployer.deploy(MyToken);
  let token = await MyToken.deployed()
  deployer.deploy(CrowdSale, token.address, 0, '@pitbull charity gig', 'the Moon', '@pitbull', Date.now(), Date.now(10000), startPrice, targetPrice, 10, 4);
};
