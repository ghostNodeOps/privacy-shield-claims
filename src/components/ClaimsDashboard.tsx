import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAccount } from 'wagmi';
import { useUserClaims, useContractStats } from "@/lib/contract";
import ClaimCard from "./ClaimCard";

const ClaimsDashboard = () => {
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Get user claims from contract
  const { data: userClaimIds, isLoading: isLoadingClaims } = useUserClaims();
  const { data: contractStats } = useContractStats();

  // Mock claims for demonstration (in real app, these would come from contract)
  const mockClaims = [
    {
      claimId: "CLM-2024-001",
      status: "approved" as const,
      amount: "$2,500.00",
      type: "Auto Collision",
      date: "2024-01-15",
      encrypted: true
    },
    {
      claimId: "CLM-2024-002", 
      status: "pending" as const,
      amount: "$1,200.00",
      type: "Home Water Damage",
      date: "2024-01-20",
      encrypted: true
    },
    {
      claimId: "CLM-2024-003",
      status: "encrypted" as const,
      amount: "$850.00", 
      type: "Medical",
      date: "2024-01-18",
      encrypted: true
    },
    {
      claimId: "CLM-2024-004",
      status: "denied" as const,
      amount: "$3,100.00",
      type: "Property Theft", 
      date: "2024-01-12",
      encrypted: true
    }
  ];

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-primary mb-2">Confidential Claims Dashboard</h2>
        <p className="text-muted-foreground">
          Manage your encrypted insurance claims with complete privacy protection
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search encrypted claims..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="default">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
        <Button variant="secure" size="default" onClick={() => navigate("/new-claim")}>
          <Plus className="mr-2 h-4 w-4" />
          New Claim
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockClaims.map((claim) => (
          <ClaimCard key={claim.claimId} {...claim} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <div className="inline-flex items-center space-x-2 bg-encrypted/50 text-encrypted-foreground px-4 py-2 rounded-lg">
          <div className="w-2 h-2 bg-accent rounded-full" />
          <span className="text-sm font-medium">All data encrypted • Zero-knowledge architecture</span>
        </div>
      </div>
    </div>
  );
};

export default ClaimsDashboard;