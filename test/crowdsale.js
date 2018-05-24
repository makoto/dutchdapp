var CrowdSale = artifacts.require("./CrowdSale.sol");

contract('CrowdSale', function(accounts) {
  let owner = accounts[0];
  let ownerName = '@pitbull';
  let sale;
  let title = 'Nice event';
  let location = 'London';
  let startTime = Date.now();
  let endTime = Date.now(100000);

  async function assertPurchase(number, before, after){
    var success = true;
    var beforePrice = (await sale.getParticipant.call(accounts[number]))[0].toNumber();
    var beforeBalance = (await sale.getParticipant.call(accounts[number]))[1].toNumber();
    var increase = 0;
    console.log(number, before, after);
    assert.equal((await sale.getPrice.call()).toNumber(), before);
    await sale.buy(accounts[number], {from:accounts[number], value:before}).catch(()=>{ success = false });
    if(success){
      increase = before;
    }
    assert.equal((await sale.getParticipant.call(accounts[number]))[0].toNumber(), beforePrice + increase);
    assert.equal((await sale.getParticipant.call(accounts[number]))[1].toNumber(), beforePrice + increase);
    assert.equal((await sale.getPrice.call()).toNumber(), after);
    return success;
  }
  async function assertWithdraw(accountNumber, _, transfered){
    const { logs } = await sale.withdraw({from:accounts[accountNumber]});
    const event = logs.find((e) => {
      return e.event === 'Withdrawn' && e.args.account === accounts[accountNumber]
    });
    assert.equal(event.args.amount.toNumber(), transfered);
    return true;
  }

  describe('buying', function(){
    beforeEach(async function(){
      sale = await CrowdSale.new(owner, title, location, ownerName, startTime, endTime, 120, 60, 10, 4, {from:owner});
    })
  
    it("sets config", async function() {
      assert.equal((await sale.startPrice.call()), 120);
      assert.equal((await sale.targetPrice.call()), 60);
      assert.equal((await sale.cap.call()), 10);
      assert.equal((await sale.threshold.call()), 4);
      assert.equal((await sale.owner.call()), owner);
      assert.equal((await sale.end.call()), false);
    });
  
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
  
    it("no duplicate purchase", async function() {
      assert.equal(await assertPurchase(1, 120, 120), true);
      assert.equal(await assertPurchase(1, 120, 120), false);
    });
  })

  describe('userState', function(){
    let startPrice = 120;
    let user = accounts[1];
    it("shows the state", async function() {
      sale = await CrowdSale.new(owner, title, location, ownerName, startTime, endTime, startPrice, 100, 4, 2, {from:owner});
      assert.equal(await sale.getParticipantStatus.call(user), 0);
      assert.equal(await assertPurchase(1, 120, 120), true);
      assert.equal(await sale.getParticipantStatus.call(user), 1);
      await sale.finalize({from:owner});
      assert.equal(await sale.getParticipantStatus.call(user), 2);
      assert.equal(await assertWithdraw(1, 120, 0), true);
      assert.equal(await sale.getParticipantStatus.call(user), 3);
    });
  });

  describe('payback', function(){
    let startPrice = 120;
    let beforeBalance = [];
    let afterBalance = [];
    beforeEach(async function(){
      sale = await CrowdSale.new(owner, title, location, ownerName, startTime, endTime, startPrice, 100, 4, 2, {from:owner});
      assert.equal(await assertPurchase(1, 120, 120), true);
      assert.equal(await assertPurchase(2, 120, 110), true);
      assert.equal(await assertPurchase(3, 110, 100), true);
      assert.equal(await assertPurchase(4, 100, 100), true);
    })

    it("finalises", async function() {
      await sale.finalize({from:owner});
      assert.equal((await sale.end.call()), true);
      assert.equal((await sale.stage.call()), 1);
      assert.equal(await assertWithdraw(1, 120, 20), true);
      assert.equal(await assertWithdraw(2, 120, 20), true);
      assert.equal(await assertWithdraw(3, 110, 10), true);
      assert.equal(await assertWithdraw(4, 100, 0), true);
    });

    it("cancels", async function() {
      await sale.cancel({from:owner});
      assert.equal((await sale.end.call()), true);
      assert.equal((await sale.stage.call()), 2);
      assert.equal(await assertWithdraw(1, 120, 120), true);
      assert.equal(await assertWithdraw(2, 120, 120), true);
      assert.equal(await assertWithdraw(3, 110, 110), true);
      assert.equal(await assertWithdraw(4, 100, 100), true);
    });

    // TODO additional tests.
    // Non admin cannot finalise
    // Non admin cannot cancel
    // Cannot buy after ended.
    // Cannot withdraw twice.
  })
});

