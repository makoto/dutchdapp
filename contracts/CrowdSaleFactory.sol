pragma solidity ^0.4.18;
import './CrowdSale.sol';

contract CrowdSaleFactory {
  address[] public projects;
  address public owner;

  constructor() {
    owner = msg.sender;
  }

  function createProject(string title, string location, uint startTime, uint endTime, uint startPrice, uint targetPrice, uint cap, uint threshold) public{
    projects.push(new CrowdSale(msg.sender, title, location, startTime, endTime, startPrice, targetPrice, cap, threshold));
  }

  function numOfProjects() public constant returns (uint){
    return projects.length;
  }
}
