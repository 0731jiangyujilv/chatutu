// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

abstract contract ReceiverTemplate {
    address public immutable forwarder;

    error OnlyForwarder();

    constructor(address _forwarder) {
        forwarder = _forwarder;
    }

    modifier onlyForwarder() {
        if (msg.sender != forwarder) revert OnlyForwarder();
        _;
    }

    function onReport(bytes calldata metadata, bytes calldata report) external onlyForwarder {
        _processReport(report);
    }

    function _processReport(bytes calldata report) internal virtual;
}
