import { Lock, Eye, EyeOff, Shield, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface ClaimCardProps {
  claimId: string;
  status: "encrypted" | "pending" | "approved" | "denied";
  amount: string;
  type: string;
  date: string;
  encrypted: boolean;
}

const ClaimCard = ({ claimId, status, amount, type, date, encrypted }: ClaimCardProps) => {
  const [isDecrypted, setIsDecrypted] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "success";
      case "denied": return "destructive";
      case "pending": return "secondary";
      default: return "encrypted";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved": return <Shield className="h-4 w-4" />;
      case "denied": return <Shield className="h-4 w-4" />;
      case "pending": return <Clock className="h-4 w-4" />;
      default: return <Lock className="h-4 w-4" />;
    }
  };

  return (
    <Card className={`p-6 transition-all duration-300 hover:shadow-lg ${encrypted && !isDecrypted ? 'animate-encrypt' : ''}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Lock className="h-5 w-5 text-accent" />
          <span className="font-mono text-sm text-muted-foreground">
            {isDecrypted ? claimId : "████-████-████"}
          </span>
        </div>
        <Badge variant={getStatusColor(status) as any} className="flex items-center space-x-1">
          {getStatusIcon(status)}
          <span className="capitalize">{status}</span>
        </Badge>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-sm text-muted-foreground">Claim Type</p>
          <p className="font-medium">
            {isDecrypted ? type : "████████████"}
          </p>
        </div>

        <div className="flex justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Amount</p>
            <p className="font-bold text-lg">
              {isDecrypted ? amount : "$████"}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Filed</p>
            <p className="font-medium">
              {isDecrypted ? date : "██/██/████"}
            </p>
          </div>
        </div>

        <div className="pt-3 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsDecrypted(!isDecrypted)}
            className="w-full"
          >
            {isDecrypted ? (
              <>
                <EyeOff className="mr-2 h-4 w-4" />
                Encrypt Data
              </>
            ) : (
              <>
                <Eye className="mr-2 h-4 w-4" />
                Decrypt & View
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ClaimCard;