var CrowdSale = artifacts.require("CrowdSale");
let startPrice = web3.toWei(120, 'ether');
let targetPrice = web3.toWei(60, 'ether');
module.exports = function(deployer) {
  deployer.deploy(CrowdSale, 0, '@pitbull charity gig', 'the Moon', '@pitbull', Date.now(), Date.now(10000), startPrice, targetPrice, 10, 4);
};
