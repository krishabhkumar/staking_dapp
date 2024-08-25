// stake
// withdraw
// claim reward
// reward mechenism
// reward math

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./RewardToken.sol"; // changed
import "./StakeToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Staking is Ownable {
    RewardToken rewardToken; // changed
    StakeToken stakeToken; // changed

    uint256 price_of_one_token = 10 wei;

    uint256 public totalStakedToken;
    uint256 public rewardPerTokenStored;
    uint256 public lastUpdateTime;
    uint256 public REWARD_RATE = 10;

    constructor() Ownable(msg.sender) {
        rewardToken = new RewardToken (); // changed
        stakeToken = new StakeToken(address(this));
    }

    error Staking_TransferFailed();
    error Rewarding_TransferFailed();
    error InvalidAmount();
    error NoStakedToken();
    error NoClaimableReward();
    error InsufficientValue();

    event TokenMint(address user, uint256 amount);
    event TokenStaking(address user, uint256 amount);
    event TokenWithdrawal(address user, uint256 amount);
    event RewardClaimed(address user, uint256 amount);


    mapping(address user => uint256 amountStaked) public balances;
    mapping(address => uint256) public userRewardPerTokenPaid;
    mapping(address user => uint256 reward) public rewards;

    // step-1 // stake token minting
    function mintStakeToken(
        uint256 amount
    ) external payable  {
        if (amount == 0) {
            revert InvalidAmount();
        }
        uint costOfMintingToken = amount * price_of_one_token;
        if (msg.value < costOfMintingToken) {
            revert InsufficientValue();
        }
        // balanceOfStakeToken[msg.sender] = amount;
        stakeToken.mint(msg.sender, amount);
        approveStakeToken(amount);
        emit TokenMint(msg.sender, amount);
    }

    function approveStakeToken(
        uint256 amount
    ) private {
        address owner = msg.sender;
        bool success = stakeToken.approve(owner, amount); // User approves the Staking contract to spend tokens
        require(success, "Approval failed");
        //uint256 allowance = stakeToken.allowance(owner, address(this)); // Check the allowance after approval
    }

    modifier updateReward(address _user) {
        rewardPerTokenStored = rewardPerToken(); // untill now
        lastUpdateTime = block.timestamp;
        rewards[_user] = earned(_user);
        userRewardPerTokenPaid[_user] = rewardPerTokenStored;

        _;
    }
    modifier moreThanZero(uint _amount) {
        if (_amount <= 0) {
            revert InvalidAmount();
        }
        _;
    }

    function rewardPerToken() public view returns (uint256) {
        if (totalStakedToken == 0) {
            return rewardPerTokenStored;
        }
        return
            rewardPerTokenStored +
            (((block.timestamp - lastUpdateTime) * REWARD_RATE * 1e18) /
                totalStakedToken);
    }

    function earned(address _user) public view returns (uint256) {
        uint256 currentBalance = balances[_user];
        uint256 pastRewards = rewards[_user];
        uint256 earnedAmount = ((currentBalance *
            (rewardPerToken() - userRewardPerTokenPaid[_user])) / 1e18) +
            pastRewards;
        return earnedAmount;
    }

    function stake(
        uint256 _amount
    ) external updateReward(msg.sender) moreThanZero(_amount) {
        balances[msg.sender] += _amount;
        totalStakedToken += _amount;
        bool success = stakeToken.transferFrom(
            msg.sender,
            address(this),
            _amount
        );
        if (!success) {
            revert Staking_TransferFailed();
        }
        emit TokenStaking(msg.sender, _amount);
    }

    function withdraw(
        uint256 _amount
    ) external updateReward(msg.sender) moreThanZero(_amount) {
        balances[msg.sender] -= _amount;
        totalStakedToken -= _amount;
        bool success = stakeToken.transfer(msg.sender, _amount);
        if (!success) {
            revert Staking_TransferFailed();
        }

        emit TokenWithdrawal(msg.sender, _amount);
    }

    function claimReward()
        external
        updateReward(msg.sender)
    {
        if (balances[msg.sender] == 0) {
            revert NoStakedToken();
        } // updated
        uint256 reward = rewards[msg.sender];
        if (reward == 0) {
            revert NoClaimableReward();
        } // changed

        // mint reward token on this contract // this contract will mint it
        // mintRewardToken(reward);
        rewardToken.mintToken(address(this), reward); // changed
        bool success = rewardToken.transfer(msg.sender, reward);
        if (!success) {
            revert Rewarding_TransferFailed();
        }
        rewards[msg.sender] = 0;
        
    }

    function checkOwner() public view returns (address, address, address) {
        return (
            address(this),
            stakeToken.checkOwnership(),
            rewardToken.returnOwner()
        );
    }

    function checkRewardBalance() public view returns (uint256) {
        return rewardToken.balanceOf(msg.sender);
    }
    function checkBalance() public view returns (uint256) {
        return balances[msg.sender];
    }
}
