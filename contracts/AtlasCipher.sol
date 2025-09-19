// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract AtlasCipher is SepoliaConfig {
    using FHE for *;
    
    struct PaymentTransaction {
        euint32 transactionId;
        euint32 amount;
        euint32 fee;
        address sender;
        address recipient;
        bool isSettled;
        bool isEncrypted;
        string memo;
        uint256 timestamp;
        uint256 settlementTime;
    }
    
    struct SettlementRecord {
        euint32 settlementId;
        euint32 totalAmount;
        euint32 transactionCount;
        bool isVerified;
        string settlementHash;
        address verifier;
        uint256 timestamp;
    }
    
    struct UserProfile {
        euint32 reputation;
        euint32 totalTransactions;
        euint32 totalVolume;
        bool isVerified;
        string profileHash;
        address user;
        uint256 createdAt;
    }
    
    mapping(uint256 => PaymentTransaction) public transactions;
    mapping(uint256 => SettlementRecord) public settlements;
    mapping(address => UserProfile) public userProfiles;
    mapping(address => euint32) public userBalances;
    mapping(address => uint256[]) public userTransactions;
    
    uint256 public transactionCounter;
    uint256 public settlementCounter;
    
    address public owner;
    address public verifier;
    address public feeCollector;
    
    event TransactionCreated(uint256 indexed transactionId, address indexed sender, address indexed recipient);
    event TransactionSettled(uint256 indexed transactionId, uint256 settlementTime);
    event SettlementProcessed(uint256 indexed settlementId, address indexed verifier);
    event UserProfileUpdated(address indexed user, uint32 reputation);
    event BalanceUpdated(address indexed user, uint32 newBalance);
    
    constructor(address _verifier, address _feeCollector) {
        owner = msg.sender;
        verifier = _verifier;
        feeCollector = _feeCollector;
    }
    
    function createTransaction(
        address recipient,
        externalEuint32 amount,
        externalEuint32 fee,
        string memory memo,
        bytes calldata inputProof
    ) public payable returns (uint256) {
        require(recipient != address(0), "Invalid recipient address");
        require(recipient != msg.sender, "Cannot send to self");
        
        uint256 transactionId = transactionCounter++;
        
        // Convert external encrypted values to internal encrypted values
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        euint32 internalFee = FHE.fromExternal(fee, inputProof);
        
        transactions[transactionId] = PaymentTransaction({
            transactionId: FHE.asEuint32(0), // Will be set properly later
            amount: internalAmount,
            fee: internalFee,
            sender: msg.sender,
            recipient: recipient,
            isSettled: false,
            isEncrypted: true,
            memo: memo,
            timestamp: block.timestamp,
            settlementTime: 0
        });
        
        // Update user transaction lists
        userTransactions[msg.sender].push(transactionId);
        userTransactions[recipient].push(transactionId);
        
        emit TransactionCreated(transactionId, msg.sender, recipient);
        return transactionId;
    }
    
    function settleTransaction(
        uint256 transactionId,
        externalEuint32 settlementProof,
        bytes calldata proofData
    ) public returns (uint256) {
        require(transactions[transactionId].sender != address(0), "Transaction does not exist");
        require(transactions[transactionId].isSettled == false, "Transaction already settled");
        require(msg.sender == verifier, "Only verifier can settle transactions");
        
        // Convert external proof to internal encrypted value
        euint32 internalProof = FHE.fromExternal(settlementProof, proofData);
        
        // Update transaction status
        transactions[transactionId].isSettled = true;
        transactions[transactionId].settlementTime = block.timestamp;
        
        // Create settlement record
        uint256 settlementId = settlementCounter++;
        settlements[settlementId] = SettlementRecord({
            settlementId: FHE.asEuint32(0), // Will be set properly later
            totalAmount: transactions[transactionId].amount,
            transactionCount: FHE.asEuint32(1),
            isVerified: true,
            settlementHash: string(abi.encodePacked(transactionId, block.timestamp)),
            verifier: msg.sender,
            timestamp: block.timestamp
        });
        
        emit TransactionSettled(transactionId, block.timestamp);
        emit SettlementProcessed(settlementId, msg.sender);
        return settlementId;
    }
    
    function updateUserProfile(
        address user,
        euint32 reputation,
        string memory profileHash
    ) public {
        require(msg.sender == verifier, "Only verifier can update profiles");
        require(user != address(0), "Invalid user address");
        
        if (userProfiles[user].user == address(0)) {
            // Create new profile
            userProfiles[user] = UserProfile({
                reputation: reputation,
                totalTransactions: FHE.asEuint32(0),
                totalVolume: FHE.asEuint32(0),
                isVerified: true,
                profileHash: profileHash,
                user: user,
                createdAt: block.timestamp
            });
        } else {
            // Update existing profile
            userProfiles[user].reputation = reputation;
            userProfiles[user].profileHash = profileHash;
        }
        
        emit UserProfileUpdated(user, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function updateUserBalance(address user, euint32 newBalance) public {
        require(msg.sender == verifier, "Only verifier can update balances");
        require(user != address(0), "Invalid user address");
        
        userBalances[user] = newBalance;
        emit BalanceUpdated(user, 0); // FHE.decrypt(newBalance) - will be decrypted off-chain
    }
    
    function getTransactionInfo(uint256 transactionId) public view returns (
        address sender,
        address recipient,
        bool isSettled,
        bool isEncrypted,
        string memory memo,
        uint256 timestamp,
        uint256 settlementTime
    ) {
        PaymentTransaction storage transaction = transactions[transactionId];
        return (
            transaction.sender,
            transaction.recipient,
            transaction.isSettled,
            transaction.isEncrypted,
            transaction.memo,
            transaction.timestamp,
            transaction.settlementTime
        );
    }
    
    function getSettlementInfo(uint256 settlementId) public view returns (
        bool isVerified,
        string memory settlementHash,
        address verifier,
        uint256 timestamp
    ) {
        SettlementRecord storage settlement = settlements[settlementId];
        return (
            settlement.isVerified,
            settlement.settlementHash,
            settlement.verifier,
            settlement.timestamp
        );
    }
    
    function getUserProfile(address user) public view returns (
        bool isVerified,
        string memory profileHash,
        uint256 createdAt
    ) {
        UserProfile storage profile = userProfiles[user];
        return (
            profile.isVerified,
            profile.profileHash,
            profile.createdAt
        );
    }
    
    function getUserTransactionCount(address user) public view returns (uint256) {
        return userTransactions[user].length;
    }
    
    function getUserTransactions(address user, uint256 index) public view returns (uint256) {
        require(index < userTransactions[user].length, "Index out of bounds");
        return userTransactions[user][index];
    }
    
    function getEncryptedAmount(uint256 transactionId) public view returns (bool) {
        return transactions[transactionId].isEncrypted;
    }
    
    function getEncryptedBalance(address user) public view returns (bool) {
        return userBalances[user] != FHE.asEuint32(0);
    }
    
    function withdrawFees() public {
        require(msg.sender == feeCollector, "Only fee collector can withdraw");
        require(address(this).balance > 0, "No fees to withdraw");
        
        payable(feeCollector).transfer(address(this).balance);
    }
    
    function updateVerifier(address newVerifier) public {
        require(msg.sender == owner, "Only owner can update verifier");
        require(newVerifier != address(0), "Invalid verifier address");
        verifier = newVerifier;
    }
    
    function updateFeeCollector(address newFeeCollector) public {
        require(msg.sender == owner, "Only owner can update fee collector");
        require(newFeeCollector != address(0), "Invalid fee collector address");
        feeCollector = newFeeCollector;
    }
}
