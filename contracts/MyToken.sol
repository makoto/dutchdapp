import "openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract MyToken is ERC721Token, Ownable {
  address public owner;

  constructor() public ERC721Token("Pitbull charity gig token", "PITBULL") {
    owner = msg.sender;
  }

  function mint(address buyerAddress, uint tokenId) {
    require(tx.origin == owner);
    super._mint(buyerAddress, tokenId);
  }

  // Did not implmet unique message but can add information such as
  // - The price they commit to pay
  // - Event id.
  // You can use this information to send VIP invitation for the next gigs
  //
  // function setTokenURI(uint256 _tokenId, string _message) external onlyOwner {
  //   super._setTokenURI(_tokenId, _message);
  // }
}
