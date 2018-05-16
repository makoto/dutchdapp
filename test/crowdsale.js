var CrowdSale = artifacts.require("./CrowdSale.sol");

contract('CrowdSale', function(accounts) {
  let sale;
  let owner = accounts[0];
  beforeEach(async function(){
    sale = await CrowdSale.new(120, 60, 10, 4, {from:owner});
  })

  it("sets config", async function() {
    assert.equal((await sale.startPrice.call()), 120);
    assert.equal((await sale.targetPrice.call()), 60);
    assert.equal((await sale.cap.call()), 10);
    assert.equal((await sale.threshold.call()), 4);
    assert.equal((await sale.owner.call()), owner);
    assert.equal((await sale.end.call()), false);
  });

  async function assertPurchase(number, before, after){
    var success = true;
    var price = 0;
    console.log(number, before, after);
    assert.equal((await sale.getPrice.call()).toNumber(), before);
    await sale.buy({from:accounts[number]}).catch(()=>{ success = false });
    if(success){
      price = before;
    }
    assert.equal((await sale.getParticipant.call(accounts[number]))[0].toNumber(), price);
    assert.equal((await sale.getPrice.call()).toNumber(), after);
    return success;
  }

  it("reaches cap", async function() {
    assert.equal(await assertPurchase(1, 120, 120), true);
    assert.equal(await assertPurchase(2, 120, 120), true);
    assert.equal(await assertPurchase(3, 120, 120), true);
    assert.equal(await assertPurchase(4, 120, 110), true);
    assert.equal(await assertPurchase(5, 110, 100), true);
    assert.equal(await assertPurchase(6, 100, 90), true);
    assert.equal(await assertPurchase(7, 90, 80), true);
    assert.equal(await assertPurchase(8, 80, 70), true);
    assert.equal(await assertPurchase(9, 70, 60), true);
    assert.equal(await assertPurchase(10, 60, 60), true);
    assert.equal(await assertPurchase(11, 60, 60), false);
  });
});
