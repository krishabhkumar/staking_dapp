// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "forge-std/Script.sol";

contract HelperConfig is Script {
    uint256 public activeConfigKey;

    constructor() {
        if (block.chainid == 11155111) {
            activeConfigKey = sepoliaConfig();
        }
    }

    function sepoliaConfig() public view returns (uint256) {
        uint256 deployKey = vm.envUint("PRIVATE_KEY");
        return deployKey;
    }
}
