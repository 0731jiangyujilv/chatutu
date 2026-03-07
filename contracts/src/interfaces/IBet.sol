// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title IBet - Interface for 1v1 price bet contracts
/// @notice Defines the external interface for a simple 1v1 bet between two participants
interface IBet {
    enum BetStatus {
        Created,
        Locked,
        Settled,
        Cancelled
    }

    struct BetInfo {
        address participant1;
        address participant2;
        address token;
        uint256 amount;
        uint256 duration;
        address priceFeed;
        int256 startPrice;
        int256 endPrice;
        uint256 startTime;
        uint256 endTime;
        BetStatus status;
        address winner;
        uint256 feeBps;
        address feeRecipient;
    }

    event Deposited(address indexed participant, uint256 amount);
    event BetLocked(int256 startPrice, uint256 startTime, uint256 endTime);
    event BetSettled(address indexed winner, int256 endPrice);
    event BetCancelled();
    event EmergencyWithdraw(address indexed participant, uint256 amount);
    event FeesCollected(address indexed recipient, uint256 amount);

    error InvalidStatus();
    error NotParticipant();
    error AlreadyDeposited();
    error DepositTimeout();
    error BetNotExpired();
    error TimelockNotExpired();
    error InvalidFee();
    error OracleStalePrice();
    error OracleInvalidPrice();

    function deposit() external;
    function settle() external;
    function cancel() external;
    function emergencyWithdraw() external;
    function getBetInfo() external view returns (BetInfo memory);
}
