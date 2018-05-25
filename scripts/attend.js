const CrowdSale = artifacts.require("./CrowdSale.sol");
const MyToken = artifacts.require("./MyToken.sol");
const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));

module.exports =  async function(callback) {
    let sale = await CrowdSale.deployed();
    let token = await MyToken.deployed()
    let owner = web3.eth.accounts[0];
    await sale.attend(owner, {from:owner});
}
