// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RewardToken is ERC20, Ownable {
    constructor()
        /* uint tokenSupply */ ERC20("Reward Token", "RTK")
        Ownable(msg.sender)
    {}

    function decimals() public pure override returns (uint8) {
        return 0;
    }

    function mintToken(address _to, uint supplyNeeded) public {
        _mint(_to, supplyNeeded);
    }

    function transferOwnership() public {
        transferOwnership(msg.sender);
    }

    function returnOwner() public view returns (address) {
        return owner();
    }
}
