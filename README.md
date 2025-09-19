# 🔐 Privacy Shield Claims

> **Advanced FHE-Encrypted Insurance Claims Platform**

A cutting-edge decentralized platform that revolutionizes insurance claims processing through **Fully Homomorphic Encryption (FHE)** technology, ensuring complete data privacy while maintaining blockchain transparency.

## ✨ Key Features

### 🛡️ **Zero-Knowledge Architecture**
- **FHE-Encrypted Processing**: All sensitive claim data remains encrypted during computation
- **Privacy-Preserving Verification**: Claims are processed without exposing personal information
- **Decentralized Trust**: Transparent verification without compromising privacy

### 🔗 **Web3 Integration**
- **Multi-Wallet Support**: Seamless integration with MetaMask, Rainbow, WalletConnect
- **Smart Contract Automation**: Automated claim processing through intelligent contracts
- **Gas-Optimized Operations**: Efficient blockchain interactions

### 🚀 **Advanced Technology Stack**
- **Frontend**: React 18 + TypeScript + Vite
- **UI Framework**: shadcn/ui + Tailwind CSS
- **Web3**: RainbowKit + Wagmi + Viem
- **Encryption**: Zama FHE Oracle Integration
- **Blockchain**: Ethereum Sepolia Testnet

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ 
- **npm** or **yarn**
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/ghostNodeOps/privacy-shield-claims.git
cd privacy-shield-claims

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Configuration

Create a `.env.local` file with your configuration:

```env
# Blockchain Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=your_rpc_url_here
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address_here
```

## 🏗️ Development

### Available Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Application pages
├── lib/                # Utilities and configurations
│   ├── wallet.ts       # Web3 wallet configuration
│   └── contract.ts     # Smart contract interactions
├── hooks/              # Custom React hooks
└── assets/             # Static assets
```

## 🔧 Smart Contract Integration

### FHE-Encrypted Claims Processing

The platform uses advanced smart contracts with FHE encryption:

```solidity
// Example: Encrypted claim submission
function submitEncryptedClaim(
    euint32 _encryptedAmount,
    euint32 _encryptedType,
    bytes32 _dataHash
) external returns (uint256);
```

### Security Features

- **Encrypted Data Storage**: All sensitive information is FHE-encrypted
- **Zero-Knowledge Verification**: Claims are processed without data exposure
- **Decentralized Processing**: No single point of failure
- **Audit Trail**: Transparent blockchain records

## 🌐 Deployment

### Vercel Deployment

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Configure Environment**: Set up environment variables
3. **Deploy**: Automatic deployment on push to main branch

### Environment Variables for Production

```env
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=your_production_rpc_url
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_walletconnect_project_id
NEXT_PUBLIC_CONTRACT_ADDRESS=your_deployed_contract_address
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write comprehensive tests
- Update documentation
- Follow conventional commit messages

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Documentation**: [Project Wiki](https://github.com/ghostNodeOps/privacy-shield-claims/wiki)
- **Issues**: [GitHub Issues](https://github.com/ghostNodeOps/privacy-shield-claims/issues)
- **Discussions**: [GitHub Discussions](https://github.com/ghostNodeOps/privacy-shield-claims/discussions)

---

**Built with ❤️ for privacy and security**
