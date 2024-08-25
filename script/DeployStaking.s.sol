// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Script, console} from "forge-std/Script.sol";
import "../src/Staking.sol";
import "../src/RewardToken.sol";
import "../src/StakeToken.sol";
import "./HelperConfig.s.sol";

contract DeployStaking is Script {

    uint256 deployer;
    Staking staking;
    RewardToken rewardToken;
    StakeToken stakeToken;

    function run() external returns (address ) {
       HelperConfig helperConfig = new HelperConfig();
       deployer = helperConfig.activeConfigKey();
       vm.startBroadcast(deployer);
       staking = new Staking();
       vm.stopBroadcast();

       console.log("This is staking contract address:", address(staking));
       return address(staking);
    }

}
