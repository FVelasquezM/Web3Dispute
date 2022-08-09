//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.10;

contract Owned {
    address owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner is allowed to perform this action");
        _;
    }
}
