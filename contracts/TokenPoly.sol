pragma solidity ^0.8.0;

import './TokenBase.sol';

contract TokenPoly is TokenBase {
    constructor() TokenBase('Matic Token', 'MTK') {}
}