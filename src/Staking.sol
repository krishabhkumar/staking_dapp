// stake
// withdraw
// claim reward
// reward mechenism
// reward math

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./RewardToken.sol"; // changed
import "./StakeToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Staking is Ownable {
    //IERC20 public stakeToken;
    //IERC20 public rewardToken;
    RewardToken public rewardToken; // changed
    StakeToken public stakeToken; // changed

    // to be tested
    uint256 public rewardTokenThisContractOwn; // changed

    uint256 public totalStakedToken;
    uint256 public rewardPerTokenStored;
    uint256 public lastUpdateTime;
    uint256 public REWARD_RATE = 10;

    error Staking_TransferFailed();
    error Rewarding_TransferFailed();
    error InvalidAmount();
    error NoStakedToken();
    error NoReward();

    mapping(address user => uint256 amountStaked) public balances;
    mapping(address => uint256) public userRewardPerTokenPaid;
    mapping(address user => uint256 reward) public rewards;
    // associated with stake token
    mapping(address => uint256) balanceOfStakeToken;

    constructor() Ownable(msg.sender) {
        //stakeToken = IERC20(_stakeTokenAddress);
        //rewardToken = IERC20(_rewardToken);
        rewardToken = new RewardToken( /* 100 */ ); // changed
        stakeToken = new StakeToken(address(this));
    }
    // step-1 // user will do this
    // stake token minting

    function mintStakeToken(uint256 amount) external {
        if (amount == 0) {
            revert InvalidAmount();
        }
        balanceOfStakeToken[msg.sender] = amount;
        stakeToken.mint(amount);
    }

    modifier updateReward(address _user) {
        rewardPerTokenStored = rewardPerToken(); // untill now
        lastUpdateTime = block.timestamp;
        rewards[_user] = earned(_user);
        userRewardPerTokenPaid[_user] = rewardPerTokenStored;

        _;
    }

    modifier moreThanZero(uint256 _amount) {
        if (_amount <= 0) {
            revert InvalidAmount();
        }
        _;
    }

    function rewardPerToken() public view returns (uint256) {
        if (totalStakedToken == 0) {
            return rewardPerTokenStored;
        }
        return rewardPerTokenStored + (((block.timestamp - lastUpdateTime) * REWARD_RATE * 1e18) / totalStakedToken);
    }

    function earned(address _user) public view returns (uint256) {
        uint256 currentBalance = balances[_user];
        uint256 pastRewards = rewards[_user];
        uint256 earnedAmount =
            ((currentBalance * (rewardPerToken() - userRewardPerTokenPaid[_user])) / 1e18) + pastRewards;
        return earnedAmount;
    }

    function stake(uint256 _amount) external updateReward(msg.sender) moreThanZero(_amount) {
        balances[msg.sender] += _amount;
        totalStakedToken += _amount;
        bool success = stakeToken.transferFrom(msg.sender, address(this), _amount);
        if (!success) {
            revert Staking_TransferFailed();
        }
    }

    function withdraw(uint256 _amount) external updateReward(msg.sender) moreThanZero(_amount) {
        balances[msg.sender] -= _amount;
        totalStakedToken -= _amount;
        bool success = stakeToken.transfer(msg.sender, _amount);
        if (!success) {
            revert Staking_TransferFailed();
        }
    }

    function claimReward() external updateReward(msg.sender) {
        if (balances[msg.sender] == 0) {
            revert NoStakedToken();
        }
        if (rewards[msg.sender] == 0) {
            revert NoReward();
        }
        uint256 reward = rewards[msg.sender];
        rewardToken.mintToken(address(this), reward);
        bool success = rewardToken.transferFrom(address(this), msg.sender, reward);
        if (!success) {
            revert Rewarding_TransferFailed();
        }
        rewards[msg.sender] = 0;
    }

    function checkRewardTokenThisContractHave() public view returns (uint256) {
        return rewardToken.balanceOf(address(this));
    }

    function checkOwner() public view returns (address, address, address) {
        return (address(this), stakeToken.checkOwnership(), rewardToken.returnOwner());
    }

    function checkRewardBalance() public view returns (uint256) {
        return rewardToken.balanceOf(msg.sender);
    }

    function balanceOfStakedTokens() public view returns (uint256) {
        return balanceOfStakeToken[msg.sender];
    }
}
