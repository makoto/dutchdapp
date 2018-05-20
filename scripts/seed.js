const CrowdSale = artifacts.require("./CrowdSale.sol");
const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));
const names = ['@makoto_inoue', '@jlo', '@RonConway', '@NeYoCompound', '@chrisbrown', '@lildickytweets', '@demibrener', '@maraoz', '@eordano', '@smpalladino']

module.exports =  async function(callback) {
    const makoto = web3.eth.accounts[0];
    let sale = await CrowdSale.deployed()
    let participants = await sale.numParticipants.call()
    console.log('participants', participants.toNumber())
    for(i=1;i<9;i++){
        await snooze(2000);
        participants = await sale.numParticipants.call()
        price = await sale.getPrice.call()
        account = web3.eth.accounts[i];
        name = names[i];
        await sale.buy(name,{from:account, value:price});
        console.log('buy', i, participants.toNumber(), name, price.toNumber(), account);
    }
    await snooze(2000);
    await sale.finalize({from:web3.eth.accounts[0]});
    for(i=1;i<3;i++){
        await snooze(2000);
        participants = await sale.numParticipants.call()
        price = await sale.getPrice.call()
        account = web3.eth.accounts[i];
        name = names[i];
        await sale.withdraw({from:account});
        console.log('withdraw', i, participants.toNumber(), name, price.toNumber(), account);
    }

}