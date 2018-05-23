pragma solidity ^0.4.21;
import "zos-lib/contracts/migrations/Migratable.sol";

contract CrowdSale {
    string public title;
    string public location;
    string public ownerName;
    uint public startTime;
    uint public endTime;
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
        string name;
        address buyerAddress;
        uint price;
        uint balance;
    }

    enum Stages {
        Sale,
        Finalised,
        Canceled
    }

    event Bought(string name, uint deposit);
    event Finalised();
    event Canceled();
    event Withdrawn(string name, address account, uint amount);

  fuction initialize(address ownerAddress, string _title, string _location, string _ownerName, uint _startTime, uint _endTime, uint _startPrice, uint _targetPrice, uint _cap, uint _threshold) isInitializer("CrowdSale", "0") public {
    require(_startPrice > _targetPrice);
    require(_cap > _threshold);
    title = _title;
    location = _location;
    ownerName = _ownerName;
    startTime = _startTime;
    startTime = _startTime;
    endTime = _endTime;
    startPrice = _startPrice;
    targetPrice = _targetPrice;
    cap = _cap;
    threshold = _threshold;
    if (ownerAddress == 0x0) {
       owner = ownerAddress;    
    } else {
        owner = msg.sender;
    }
  }
  
  function buy(string name) public payable {
    require(participants[msg.sender].price == 0);
    require(!end);
    require(participantsIndex.length < cap);
    uint deposit = getPriceFor(participantsIndex.length + 1);
    require(deposit == msg.value);
    participantsIndex.push(msg.sender);
    participants[msg.sender] = Participant(name, msg.sender, deposit, deposit);
    emit Bought(name, deposit);
  }

  // change send to true
  // pay back to participants;
  function finalize() public {
    // require(msg.sender == owner);
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
    emit Withdrawn(participant.name, participant.buyerAddress, amount);
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

  function getParticipantStatus(address participantAddress) view returns(uint){
    Participant participant = participants[participantAddress];
    if(participant.price > 0){
      if(end){
        if(participant.balance > 0){
            return 2; // withdraw
        }else{
            return 3; // print out ticket
        }
      }else{
        return 1; // share
      }
    }else{
        return 0; // not registered
    }
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
