import { FileText, Lock, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import logo from "@/assets/logo.png";

const Header = () => {
  return (
    <header className="border-b bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="Privacy Shield Claims" className="h-10 w-10" />
            <div>
              <h1 className="text-xl font-bold text-primary">Privacy Shield Claims</h1>
              <p className="text-sm text-muted-foreground">FHE-Encrypted Claims Protection</p>
            </div>
          </div>
          
          <nav className="flex items-center space-x-6">
            <Button variant="ghost" size="sm">
              <FileText className="mr-2 h-4 w-4" />
              Claims
            </Button>
            <Button variant="ghost" size="sm">
              <Lock className="mr-2 h-4 w-4" />
              Privacy
            </Button>
            <ConnectButton />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;