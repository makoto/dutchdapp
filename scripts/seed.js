const CrowdSale = artifacts.require("./CrowdSale.sol");
const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));
// const names = [null, '@paddyucl']
const names = [null, '@jlo', '@RonConway', '@NeYoCompound', '@chrisbrown', '@lildickytweets', '@demibrener', '@maraoz', '@eordano', '@smpalladino']

module.exports =  async function(callback) {
    let sale = await CrowdSale.deployed()
    let participants = await sale.numParticipants.call()
    console.log('participants', participants.toNumber())
    for(i=1;i<10;i++){
        await snooze(2000);
        participants = await sale.numParticipants.call()
        price = await sale.getPrice.call()
        account = web3.eth.accounts[i];
        name = names[i];
        sale.buy(name,{from:account, value:price});
        console.log('participants', i, participants.toNumber(), name, price.toNumber(), account);
    }
}