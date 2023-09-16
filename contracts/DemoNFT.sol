// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "reference/src/ERC6551Registry.sol";
import "hardhat/console.sol";

contract DemoNFT is ERC721, Ownable {
    using Strings for uint256;

    string public defaultURI = "ipfs://QmXsMLpKjznF3z1KsVm5tNs3E94vj4BFAyAHvD5RTWgQ1J";
    string private baseURI;
    uint256 public totalSupply;
    address public manager;

    event Minted(address indexed to);

    modifier onlyOwnerOrManager() {
        require((owner() == msg.sender) || (manager == msg.sender), "Caller needs to be Owner or Manager");
        _;
    }

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {
        manager = msg.sender;
        //ERC6551Registry registry = new ERC6551Registry();
    }
    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string calldata _baseuri) public onlyOwnerOrManager {
		baseURI = _baseuri;
	}

    function setDefaultRI(string calldata _defaultURI) public onlyOwnerOrManager {
		defaultURI = _defaultURI;
	}

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "Token does not exists");
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString(),".json")) : defaultURI;
    }

    function mint() public {
        _safeMint(msg.sender, totalSupply++);
        emit Minted(msg.sender);
    }

}