
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract Staking {
    IERC20 public immutable stakingToken;
    IERC20 public immutable rewardsToken;

    address public owner;
    uint public rewardRate;
    uint public lastUpdatedTime;
    uint public totalStakedToken;
    uint public rewardPerTokenStored;
    

    mapping(address staker => uint amount) public stakedAmount;
    mapping(address user => uint willNotGetPrevReward) public userRewardPerTokenPaid;
    mapping(address => uint) public rewards;

    event Staked(address indexed user, uint amount);
    event Withdrawal(address indexed user, uint amount);
    event RewardClaimed(address indexed user, uint amount);

    error InvalidAmount(uint amount);
    error TransferFailed();
    error NoStaked();


    constructor() {
        
         owner = msg.sender;
         rewardRate = 10; // per sec
         //durationRewardPaidOut = _duration;
         lastUpdatedTime = block.timestamp;

    }

    function rewardPerToken() public view returns(uint256) {
        if(totalStakedToken == 0) {
            return 0;
        }
        uint totalTime = block.timestamp - lastUpdatedTime;
        uint totalReward = (rewardRate * 10 ** 18) * totalTime;
        return rewardPerTokenStored + (totalReward / totalStakedToken);
    }

    function stake(uint _amount) external _updateRewardStatus(msg.sender) {
        if(_amount == 0) {
                 revert InvalidAmount(_amount);
        }
        stakedAmount[msg.sender] += _amount;
        totalStakedToken += _amount;

        emit Staked(msg.sender, _amount);

        bool success = stakingToken.transferFrom(msg.sender, address(this), _amount);
        require(success, "Failed to transfer!");
        
    }
    function withdraw(uint _amount) external _updateRewardStatus(msg.sender) {
        
        if(_amount == 0 || (_amount > stakedAmount[msg.sender])) {
                 revert InvalidAmount(_amount);
        }
        stakedAmount[msg.sender] -= _amount;
        totalStakedToken -= _amount;

        emit Withdrawal(msg.sender, _amount);

        bool success = stakingToken.transfer(msg.sender, _amount);
        require(success, "Failed to transfer!");
        
    }
    function claimReward() external  _updateRewardStatus(msg.sender) {
        if(stakedAmount[msg.sender] == 0) {
            revert NoStaked();
        }
        uint reward = rewards[msg.sender];
        rewards[msg.sender] = 0;
        emit RewardClaimed(msg.sender, reward);

       bool success = rewardsToken.transfer(msg.sender, reward);
        require(success, "Failed to transfer!");
           
    }

    modifier _updateRewardStatus(address _user) {  
        rewardPerTokenStored = rewardPerToken(); 
        lastUpdatedTime = block.timestamp;
        rewards[_user] = earned(_user);
        userRewardPerTokenPaid[_user] = rewardPerTokenStored;
        _;
    }

    function earned(address _user) public view returns(uint) {
        return stakedAmount[_user] * (rewardPerToken() - userRewardPerTokenPaid[_user]);
    }

    




}