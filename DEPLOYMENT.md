# Vercel Deployment Guide for Privacy Shield Claims

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Ensure your code is pushed to GitHub
3. **Environment Variables**: Prepare the required environment variables

## Step-by-Step Deployment Instructions

### Step 1: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project" on the dashboard
3. Import your GitHub repository: `ghostNodeOps/privacy-shield-claims`
4. Click "Import" to proceed

### Step 2: Configure Project Settings

#### Framework Preset
- **Framework Preset**: Vite
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

#### Environment Variables
Add the following environment variables in the Vercel dashboard:

```env
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=your_sepolia_rpc_url_here
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_walletconnect_project_id_here
NEXT_PUBLIC_INFURA_API_KEY=your_infura_api_key_here
NEXT_PUBLIC_CONTRACT_ADDRESS=your_deployed_contract_address_here
```

**To add environment variables:**
1. In your Vercel project dashboard, go to "Settings"
2. Click on "Environment Variables" in the left sidebar
3. Add each variable with the values above
4. Make sure to set them for "Production", "Preview", and "Development"

### Step 3: Deploy

1. Click "Deploy" button
2. Wait for the build process to complete (usually 2-3 minutes)
3. Your application will be available at the provided Vercel URL

### Step 4: Configure Custom Domain (Optional)

1. In your Vercel project dashboard, go to "Settings"
2. Click on "Domains" in the left sidebar
3. Add your custom domain
4. Follow the DNS configuration instructions

## Post-Deployment Configuration

### Step 5: Update Contract Address

After deploying your smart contract to Sepolia testnet:

1. Deploy the contract using the provided script:
   ```bash
   npx hardhat run scripts/deploy.js --network sepolia
   ```

2. Copy the deployed contract address

3. Update the environment variable in Vercel:
   - Go to your project settings
   - Update `NEXT_PUBLIC_CONTRACT_ADDRESS` with the actual contract address
   - Redeploy the application

### Step 6: Verify Deployment

1. Visit your deployed application URL
2. Connect a Web3 wallet (MetaMask, Rainbow, etc.)
3. Switch to Sepolia testnet
4. Test the claim submission functionality

## Build Configuration

### Vite Configuration
The project uses Vite with the following configuration:
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node.js Version**: 18.x (recommended)

### Package.json Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Ensure all dependencies are properly installed
   - Check that all environment variables are set
   - Verify the build command is correct

2. **Wallet Connection Issues**
   - Verify WalletConnect Project ID is correct
   - Check that the RPC URL is accessible
   - Ensure the chain ID matches Sepolia (11155111)

3. **Contract Interaction Issues**
   - Verify the contract address is correct
   - Ensure the contract is deployed on Sepolia
   - Check that the ABI matches the deployed contract

### Environment Variables Checklist

- [ ] `NEXT_PUBLIC_CHAIN_ID` = 11155111
- [ ] `NEXT_PUBLIC_RPC_URL` = Your Sepolia RPC URL
- [ ] `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` = Your WalletConnect Project ID
- [ ] `NEXT_PUBLIC_INFURA_API_KEY` = Your Infura API Key
- [ ] `NEXT_PUBLIC_CONTRACT_ADDRESS` = Your deployed contract address

## Security Considerations

1. **Environment Variables**: Never commit sensitive keys to the repository
2. **Contract Security**: Ensure the smart contract is properly audited
3. **FHE Implementation**: Verify that FHE encryption is working correctly
4. **Access Control**: Implement proper access controls for claim processing

## Monitoring and Analytics

1. **Vercel Analytics**: Enable in project settings for performance monitoring
2. **Error Tracking**: Consider integrating error tracking services
3. **User Analytics**: Implement privacy-compliant analytics if needed

## Support

For deployment issues:
1. Check Vercel documentation: [vercel.com/docs](https://vercel.com/docs)
2. Review build logs in the Vercel dashboard
3. Ensure all environment variables are correctly set
4. Verify the GitHub repository is properly connected

## Next Steps

After successful deployment:
1. Test all functionality thoroughly
2. Deploy the smart contract to Sepolia testnet
3. Update the contract address in environment variables
4. Configure custom domain if needed
5. Set up monitoring and analytics
6. Prepare for mainnet deployment when ready
