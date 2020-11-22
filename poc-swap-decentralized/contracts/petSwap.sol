// SPDX-License-Identifier: MIT

import "./interfaces/IERC20.sol";
import "./libs/string.sol";

pragma solidity ^0.7.0;

contract PETSwap {
    address oracle_address;
    address token_address;

    uint256 pool_balance;
    uint256 swaps_id;

    struct ChainSwap {
        string dest;
        uint256 amount;
    }

    mapping (string => mapping (address => mapping(bytes32 => ChainSwap))) internal swaps;
    mapping(address => mapping(string => bytes32)) internal last_swaps_hashs;

    constructor(address _oracle_address, address _token_address) {
        oracle_address = _oracle_address;
        token_address = _token_address;
    }

    function fetchTokenBalance(address balance) public view returns(uint256) {
        IERC20 token = IERC20(token_address);
        return (token.balanceOf(balance));
    }

    function getHashAmount(address from, string memory chain, bytes32 hash_swap) public view returns(uint256) {
        return swaps[chain][from][hash_swap].amount;
    }

    function getHashDestination(address from, string memory chain, bytes32 hash_swap) public view returns(string memory) {
        return swaps[chain][from][hash_swap].dest;
    }

    function getLastSwapHash(string calldata chain) public view returns(bytes32) {
        return last_swaps_hashs[msg.sender][chain];
    }

    function swapToken(uint256 _amount, string calldata chain, 
        string memory _dest) public {
        ChainSwap memory swap = ChainSwap({dest: _dest, amount: _amount});
        bytes32 raw_hash = keccak256(abi.encode(_dest,
          strings.uint2str(_amount), strings.uint2str(swaps_id)));
        transferToken(_amount);
        swaps_id++;
        last_swaps_hashs[msg.sender][chain] = raw_hash;
        swaps[chain][msg.sender][raw_hash] = swap;
    }

    function transferToken(uint256 _amount) public payable {
        IERC20 token = IERC20(token_address);
        _amount = _amount * (10 ** uint256(token.decimals()));
        require(token.balanceOf(msg.sender) >= _amount);
        token.transferFrom(msg.sender, address(this), _amount);
        pool_balance += _amount;
    }
}