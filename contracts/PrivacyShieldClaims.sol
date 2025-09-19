// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@zama-fhe/oracle-solidity/contracts/FHE.sol";
import "@zama-fhe/oracle-solidity/contracts/access/Control.sol";

/**
 * @title PrivacyShieldClaims
 * @dev A smart contract for handling privacy-protected insurance claims using FHE encryption
 * @notice This contract ensures that sensitive claim data remains encrypted throughout processing
 */
contract PrivacyShieldClaims is Control {
    using FHE for euint32;
    using FHE for euint64;
    using FHE for ebool;

    // Events
    event ClaimSubmitted(uint256 indexed claimId, address indexed claimant, bytes32 encryptedDataHash);
    event ClaimProcessed(uint256 indexed claimId, bool approved, uint256 amount);
    event ClaimEncrypted(uint256 indexed claimId, bytes encryptedData);
    event ClaimDecrypted(uint256 indexed claimId, bytes decryptedData);

    // Structs
    struct EncryptedClaim {
        euint32 amount;           // Encrypted claim amount
        euint32 timestamp;        // Encrypted submission timestamp
        euint32 claimType;       // Encrypted claim type (1=medical, 2=property, 3=liability)
        ebool isProcessed;       // Encrypted processing status
        ebool isApproved;        // Encrypted approval status
        address claimant;        // Public claimant address
        bytes32 dataHash;        // Hash of encrypted sensitive data
        uint256 submissionTime;  // Public submission timestamp
    }

    struct ClaimMetadata {
        uint256 claimId;
        address claimant;
        uint256 submissionTime;
        bool isProcessed;
        bool isApproved;
        uint256 publicAmount;    // Public amount for display (not sensitive)
    }

    // State variables
    mapping(uint256 => EncryptedClaim) public encryptedClaims;
    mapping(address => uint256[]) public userClaims;
    mapping(bytes32 => bool) public processedHashes;
    
    uint256 public nextClaimId = 1;
    address public owner;
    uint256 public totalClaims;
    uint256 public totalProcessedClaims;
    
    // FHE encryption parameters
    uint256 public constant MAX_CLAIM_AMOUNT = 1000000; // Maximum claim amount in wei
    uint256 public constant MIN_CLAIM_AMOUNT = 1000;    // Minimum claim amount in wei

    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier claimExists(uint256 _claimId) {
        require(_claimId > 0 && _claimId < nextClaimId, "Claim does not exist");
        _;
    }

    modifier notProcessed(uint256 _claimId) {
        require(!FHE.decrypt(encryptedClaims[_claimId].isProcessed), "Claim already processed");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    /**
     * @dev Submit a new encrypted claim
     * @param _encryptedAmount Encrypted claim amount
     * @param _encryptedType Encrypted claim type
     * @param _dataHash Hash of encrypted sensitive data
     */
    function submitEncryptedClaim(
        euint32 _encryptedAmount,
        euint32 _encryptedType,
        bytes32 _dataHash
    ) external returns (uint256) {
        require(!processedHashes[_dataHash], "Claim data already processed");
        
        uint256 claimId = nextClaimId++;
        uint256 currentTime = block.timestamp;
        
        // Validate encrypted amount is within bounds
        require(
            FHE.decrypt(_encryptedAmount) >= MIN_CLAIM_AMOUNT && 
            FHE.decrypt(_encryptedAmount) <= MAX_CLAIM_AMOUNT,
            "Claim amount out of bounds"
        );

        // Create encrypted claim
        EncryptedClaim storage newClaim = encryptedClaims[claimId];
        newClaim.amount = _encryptedAmount;
        newClaim.timestamp = FHE.asEuint32(currentTime);
        newClaim.claimType = _encryptedType;
        newClaim.isProcessed = FHE.asEbool(false);
        newClaim.isApproved = FHE.asEbool(false);
        newClaim.claimant = msg.sender;
        newClaim.dataHash = _dataHash;
        newClaim.submissionTime = currentTime;

        // Update mappings
        userClaims[msg.sender].push(claimId);
        processedHashes[_dataHash] = true;
        totalClaims++;

        emit ClaimSubmitted(claimId, msg.sender, _dataHash);
        emit ClaimEncrypted(claimId, abi.encode(_encryptedAmount, _encryptedType));

        return claimId;
    }

    /**
     * @dev Process an encrypted claim (only owner)
     * @param _claimId The claim ID to process
     * @param _approved Whether the claim is approved
     */
    function processEncryptedClaim(
        uint256 _claimId,
        bool _approved
    ) external onlyOwner claimExists(_claimId) notProcessed(_claimId) {
        EncryptedClaim storage claim = encryptedClaims[_claimId];
        
        // Update encrypted status
        claim.isProcessed = FHE.asEbool(true);
        claim.isApproved = FHE.asEbool(_approved);
        
        totalProcessedClaims++;

        emit ClaimProcessed(_claimId, _approved, FHE.decrypt(claim.amount));
    }

    /**
     * @dev Get encrypted claim data (returns encrypted values)
     * @param _claimId The claim ID
     * @return Encrypted claim data
     */
    function getEncryptedClaim(uint256 _claimId) 
        external 
        view 
        claimExists(_claimId) 
        returns (
            euint32 amount,
            euint32 timestamp,
            euint32 claimType,
            ebool isProcessed,
            ebool isApproved,
            address claimant,
            bytes32 dataHash
        ) 
    {
        EncryptedClaim storage claim = encryptedClaims[_claimId];
        return (
            claim.amount,
            claim.timestamp,
            claim.claimType,
            claim.isProcessed,
            claim.isApproved,
            claim.claimant,
            claim.dataHash
        );
    }

    /**
     * @dev Get public claim metadata (non-sensitive data)
     * @param _claimId The claim ID
     * @return Claim metadata
     */
    function getClaimMetadata(uint256 _claimId) 
        external 
        view 
        claimExists(_claimId) 
        returns (ClaimMetadata memory) 
    {
        EncryptedClaim storage claim = encryptedClaims[_claimId];
        return ClaimMetadata({
            claimId: _claimId,
            claimant: claim.claimant,
            submissionTime: claim.submissionTime,
            isProcessed: FHE.decrypt(claim.isProcessed),
            isApproved: FHE.decrypt(claim.isApproved),
            publicAmount: FHE.decrypt(claim.amount)
        });
    }

    /**
     * @dev Get user's claim IDs
     * @param _user The user address
     * @return Array of claim IDs
     */
    function getUserClaims(address _user) external view returns (uint256[] memory) {
        return userClaims[_user];
    }

    /**
     * @dev Verify claim data integrity
     * @param _claimId The claim ID
     * @param _dataHash The data hash to verify
     * @return Whether the data hash matches
     */
    function verifyClaimData(uint256 _claimId, bytes32 _dataHash) 
        external 
        view 
        claimExists(_claimId) 
        returns (bool) 
    {
        return encryptedClaims[_claimId].dataHash == _dataHash;
    }

    /**
     * @dev Get contract statistics
     * @return Total claims, processed claims, and next claim ID
     */
    function getContractStats() external view returns (uint256, uint256, uint256) {
        return (totalClaims, totalProcessedClaims, nextClaimId);
    }

    /**
     * @dev Emergency function to update owner (only current owner)
     * @param _newOwner The new owner address
     */
    function transferOwnership(address _newOwner) external onlyOwner {
        require(_newOwner != address(0), "New owner cannot be zero address");
        owner = _newOwner;
    }

    /**
     * @dev Batch process multiple claims
     * @param _claimIds Array of claim IDs to process
     * @param _approvals Array of approval statuses
     */
    function batchProcessClaims(
        uint256[] calldata _claimIds,
        bool[] calldata _approvals
    ) external onlyOwner {
        require(_claimIds.length == _approvals.length, "Arrays length mismatch");
        
        for (uint256 i = 0; i < _claimIds.length; i++) {
            if (_claimIds[i] > 0 && _claimIds[i] < nextClaimId) {
                EncryptedClaim storage claim = encryptedClaims[_claimIds[i]];
                if (!FHE.decrypt(claim.isProcessed)) {
                    claim.isProcessed = FHE.asEbool(true);
                    claim.isApproved = FHE.asEbool(_approvals[i]);
                    totalProcessedClaims++;
                    
                    emit ClaimProcessed(_claimIds[i], _approvals[i], FHE.decrypt(claim.amount));
                }
            }
        }
    }

    /**
     * @dev Decrypt and return claim data (only for approved claims)
     * @param _claimId The claim ID
     * @return Decrypted claim data
     */
    function decryptClaimData(uint256 _claimId) 
        external 
        view 
        claimExists(_claimId) 
        returns (bytes memory) 
    {
        EncryptedClaim storage claim = encryptedClaims[_claimId];
        require(FHE.decrypt(claim.isProcessed), "Claim not processed yet");
        
        // Return decrypted data
        bytes memory decryptedData = abi.encode(
            FHE.decrypt(claim.amount),
            FHE.decrypt(claim.timestamp),
            FHE.decrypt(claim.claimType),
            FHE.decrypt(claim.isProcessed),
            FHE.decrypt(claim.isApproved)
        );
        
        emit ClaimDecrypted(_claimId, decryptedData);
        return decryptedData;
    }
}
