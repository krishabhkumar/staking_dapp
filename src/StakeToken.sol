// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract StakeToken is ERC20, Ownable {

    address public stakingContract;  

    // uint public price = 0.1 ether;

    constructor(address _stakingContract)
        ERC20("StakeToken", "STK")
        Ownable(msg.sender)  // 0x5B3...
    {
        stakingContract = _stakingContract;
    }

    function mint(address _user, uint256 _amount) external {
        _mint(_user, _amount);
    }

    function approve(address owner, uint256 amount) override public returns (bool) {
            _approve(owner, stakingContract, amount);
            return true;
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
