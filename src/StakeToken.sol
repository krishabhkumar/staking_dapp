// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

//error InsufficientAmount();

contract StakeToken is ERC20, Ownable {
    address public stakingContract; // 0xAb8..

    // uint public price = 0.1 ether;

    constructor(address _stakingContract)
        ERC20("StakeToken", "STK")
        Ownable(msg.sender) // 0x5B3...
    {
        stakingContract = _stakingContract;
    }

    function mint(uint256 amount) external {
        // if (msg.value != amount * price) {}
        _mint(msg.sender, amount);
        // Automatically approve ContractA to spend on behalf of the user
        //_approve(msg.sender, stakingContract, amount);
        approve(stakingContract, amount);
    }

    function userBalance() public view returns (uint256) {
        return balanceOf(msg.sender);
    }

    function decimals() public pure override returns (uint8) {
        return 0;
    }

    function checkOwnership() public view returns (address) {
        return owner();
    }
}
