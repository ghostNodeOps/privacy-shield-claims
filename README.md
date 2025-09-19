# Privacy Shield Claims

A decentralized privacy protection platform built with FHE (Fully Homomorphic Encryption) technology for secure claim processing and data protection.

## Features

- **FHE-Encrypted Claims**: All sensitive data is encrypted using fully homomorphic encryption
- **Wallet Integration**: Seamless connection with popular Web3 wallets
- **Decentralized Processing**: Secure, transparent claim verification
- **Privacy-First Design**: User data remains encrypted throughout the entire process

## Technologies

This project is built with:

- **Frontend**: Vite, TypeScript, React, shadcn-ui, Tailwind CSS
- **Web3**: RainbowKit, Wagmi, Viem
- **Encryption**: FHE (Fully Homomorphic Encryption)
- **Blockchain**: Ethereum Sepolia Testnet

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/ghostNodeOps/privacy-shield-claims.git

# Navigate to the project directory
cd privacy-shield-claims

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Deployment

This project can be deployed to Vercel, Netlify, or any other static hosting service.

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details
