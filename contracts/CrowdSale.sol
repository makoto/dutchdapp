pragma solidity ^0.4.18;

contract CrowdSale {
    uint public startPrice;
    uint public targetPrice;
    uint public cap;
    uint public threshold;
    bool public end = false;
    address public owner;
    // NOTE: This is not the optimmal implementation
    // For production use, change to mapping;
    Participant[] participants;

  struct Participant{
      address buyerAddress;
      uint price;
      uint balance;
  }

  // Given start_price is $120, target_price is $60, capacity is 10, and threashold 
  function CrowdSale(uint _startPrice, uint _targetPrice, uint _cap, uint _threshold) public {
    require(_startPrice > _targetPrice);
    require(_cap > _threshold);
    startPrice = _startPrice;
    targetPrice = _targetPrice;
    cap = _cap;
    threshold = _threshold;
    owner = msg.sender;
  }
  
  function buy() public {
      // TODO: Stop buying more than once
      // TODO: set end to true if cap is reached
      require(!end);
      require(participants.length < cap);
      participants.push(Participant(msg.sender, getPriceFor(participants.length + 1), msg.value));
  }

  // change send to true
  // pay back to participants;
  function finalize() public {
      require(msg.sender == owner);
      end = true;
  }

  function numParticipants() view returns(uint){
      return participants.length;
  }

  function getParticipant(address participant) view returns(uint, uint){
      for(uint i=0;i<participants.length;i++){
          if(participants[i].buyerAddress == participant){
              return (participants[i].price, participants[i].balance);
          }
	  }
  }

  function getParticipantPrices() view returns(uint[]){
      uint[] prices;
      for(uint i=0;i<participants.length;i++){
          prices.push(participants[i].price);
	  }
      return prices;
  }

  event LogResult(uint, uint, uint);

  function getPrice() view returns(uint){
      return getPriceFor(participants.length);
  }

  function getPriceFor(uint num) public view returns(uint){
       if (participants.length == 0){
           return startPrice;
       }
       if (participants.length < threshold){
           return startPrice;
       }
       if (participants.length == cap){
           return targetPrice;
       }
       uint delta = (startPrice - targetPrice) / (cap - threshold);
       uint bonusDays = participants.length - threshold;
       uint result = startPrice - (delta * (bonusDays +1));
       return result;
  }
}
