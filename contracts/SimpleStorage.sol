// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract SimpleStorage {
  uint storedData;
  // constructor(){
  //   storedData =5;
  // }
  function set(uint x) public {
    storedData = x;
  }

  function get() public view returns (uint) {
    return storedData;
  }
}
