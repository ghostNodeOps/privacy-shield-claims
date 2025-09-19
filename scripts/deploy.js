const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying PrivacyShieldClaims contract...");

  // Get the contract factory
  const PrivacyShieldClaims = await ethers.getContractFactory("PrivacyShieldClaims");

  // Deploy the contract
  const privacyShieldClaims = await PrivacyShieldClaims.deploy();

  // Wait for deployment to complete
  await privacyShieldClaims.waitForDeployment();

  const contractAddress = await privacyShieldClaims.getAddress();
  console.log("PrivacyShieldClaims deployed to:", contractAddress);

  // Verify deployment
  console.log("Contract owner:", await privacyShieldClaims.owner());
  console.log("Next claim ID:", await privacyShieldClaims.nextClaimId());
  console.log("Total claims:", await privacyShieldClaims.totalClaims());

  // Save deployment info
  const deploymentInfo = {
    contractAddress: contractAddress,
    network: "sepolia",
    deployer: await privacyShieldClaims.owner(),
    deploymentTime: new Date().toISOString(),
    contractName: "PrivacyShieldClaims"
  };

  console.log("Deployment completed successfully!");
  console.log("Contract Address:", contractAddress);
  console.log("Network: Sepolia Testnet");
  console.log("Deployer:", await privacyShieldClaims.owner());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });
