var SimpleStorage = artifacts.require("SimpleStorage");
var TutorialToken = artifacts.require("TutorialToken");
var ComplexStorage = artifacts.require("ComplexStorage");
var CrowdSale = artifacts.require("CrowdSale");
let startPrice = web3.toWei(12, 'ether');
let targetPrice = web3.toWei(6, 'ether');
module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(TutorialToken);
  deployer.deploy(ComplexStorage);
  deployer.deploy(CrowdSale, 0, '@paddyucl charity gig', 'Miami', Date.now(), Date.now(10000), startPrice, targetPrice, 10, 4);
};
