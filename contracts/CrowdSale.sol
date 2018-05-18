pragma solidity ^0.4.18;

contract CrowdSale {
    uint public startPrice;
    uint public targetPrice;
    uint public cap;
    uint public threshold;
    bool public end = false;
    address public owner;
    mapping (address => Participant) public participants;
    address[] participantsIndex;
    Stages public stage;

    struct Participant{
        address buyerAddress;
        uint price;
        uint balance;
    }

    enum Stages {
        Sale,
        Finalised,
        Canceled
    }

    event Bought(uint deposit);
    event Finalised();
    event Canceled();
    event Withdrawn(address account, uint amount);
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
  
  function buy() public payable {
    require(participants[msg.sender].price == 0);
    require(!end);
    require(participantsIndex.length < cap);
    uint deposit = getPriceFor(participantsIndex.length + 1);
    require(deposit == msg.value);
    participantsIndex.push(msg.sender);
    participants[msg.sender] = Participant(msg.sender, deposit, deposit);
    emit Bought(deposit);
  }

  // change send to true
  // pay back to participants;
  function finalize() public {
    require(msg.sender == owner);
    end = true;
    stage = Stages.Finalised;
    emit Finalised();
  }

  function withdraw() public{
    require(stage != Stages.Sale);
    Participant participant = participants[msg.sender];
    require(participant.balance != 0);
    uint amount;
    if(stage == Stages.Finalised){
        amount = participant.price - getPrice();
    }else{
        amount = participant.balance;
    }
    participant.balance = 0;
    participant.buyerAddress.transfer(amount);
    emit Withdrawn(participant.buyerAddress, amount);
  }

  function cancel() public {
      require(msg.sender == owner);
      end = true;
      stage = Stages.Canceled;
      emit Canceled();
  }

  function numParticipants() view returns(uint){
      return participantsIndex.length;
  }

  // Duplicate
  function getParticipant(address participant) view returns(uint, uint){
    return (participants[participant].price, participants[participant].balance);
  }

  function getPrice() view returns(uint){
    return getPriceFor(participantsIndex.length);
  }

  function getPriceFor(uint num) public view returns(uint){
    if (participantsIndex.length == 0){
        return startPrice;
    }
    if (participantsIndex.length < threshold){
        return startPrice;
    }
    if (participantsIndex.length == cap){
        return targetPrice;
    }
    uint delta = (startPrice - targetPrice) / (cap - threshold);
    uint bonusDays = participantsIndex.length - threshold;
    uint result = startPrice - (delta * (bonusDays +1));
    return result;
  }
}
