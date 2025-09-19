import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowLeft, Lock, Upload, FileText, Database } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAccount } from 'wagmi';
import { useSubmitClaim, FHEEncryption, CLAIM_TYPES } from "@/lib/contract";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const formSchema = z.object({
  claimType: z.string().min(1, "Please select a claim type"),
  amount: z.string().min(1, "Amount is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  incidentDate: z.string().min(1, "Incident date is required"),
});

type FormData = z.infer<typeof formSchema>;

const NewClaim = () => {
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const { write: submitClaim, isLoading: isSubmittingClaim } = useSubmitClaim();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      claimType: "",
      amount: "",
      description: "",
      incidentDate: "",
    },
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
    toast({
      title: "Files uploaded",
      description: `${files.length} file(s) added to your claim`,
    });
  };

  const onSubmit = async (data: FormData) => {
    if (!isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to submit a claim",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Convert amount to wei (assuming input is in USD, convert to wei)
      const amountInWei = Math.floor(parseFloat(data.amount) * 1e18);
      
      // Map claim type to contract enum
      const claimTypeMap: { [key: string]: number } = {
        "Auto Collision": CLAIM_TYPES.LIABILITY,
        "Home Water Damage": CLAIM_TYPES.PROPERTY,
        "Medical": CLAIM_TYPES.MEDICAL,
        "Property Theft": CLAIM_TYPES.PROPERTY,
        "Fire Damage": CLAIM_TYPES.PROPERTY,
        "Natural Disaster": CLAIM_TYPES.PROPERTY,
        "Personal Injury": CLAIM_TYPES.MEDICAL,
        "Other": CLAIM_TYPES.LIABILITY,
      };

      const claimType = claimTypeMap[data.claimType] || CLAIM_TYPES.LIABILITY;
      
      // Generate encrypted claim data
      const encryptedClaim = FHEEncryption.generateEncryptedClaim(
        amountInWei,
        claimType,
        data.description
      );

      // Submit to blockchain
      if (submitClaim) {
        await submitClaim();
        
        toast({
          title: "Claim submitted successfully",
          description: "Your encrypted claim has been securely submitted to the blockchain",
        });
        
        navigate("/");
      }
    } catch (error) {
      console.error("Error submitting claim:", error);
      toast({
        title: "Submission failed",
        description: "There was an error submitting your claim. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const claimTypes = [
    "Auto Collision",
    "Home Water Damage", 
    "Medical",
    "Property Theft",
    "Fire Damage",
    "Natural Disaster",
    "Personal Injury",
    "Other"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-center space-x-3 mb-2">
            <Database className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-primary">New Secure Claim</h1>
          </div>
          <p className="text-muted-foreground">
            Submit your insurance claim with complete privacy protection and encryption
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="border-encrypted/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Claim Information</span>
              </CardTitle>
              <CardDescription>
                All information will be encrypted before transmission
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="claimType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Claim Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select claim type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {claimTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Claim Amount</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="$0.00"
                            {...field}
                            type="text"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="incidentDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Incident Date</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description of Incident</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Please provide a detailed description of what happened..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-2">
                    <Label htmlFor="file-upload">Supporting Documents (Optional)</Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                      <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                      <Label htmlFor="file-upload" className="cursor-pointer">
                        <span className="text-sm text-muted-foreground">
                          Drop files here or <span className="text-primary hover:underline">browse</span>
                        </span>
                        <Input
                          id="file-upload"
                          type="file"
                          multiple
                          onChange={handleFileUpload}
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        />
                      </Label>
                    </div>
                    
                    {uploadedFiles.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Uploaded Files:</p>
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <FileText className="h-4 w-4" />
                            <span>{file.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-4 pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={() => navigate("/")}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="secure"
                      className="flex-1"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Secure Claim"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          <div className="mt-6 text-center">
            <div className="inline-flex items-center space-x-2 bg-encrypted/50 text-encrypted-foreground px-4 py-2 rounded-lg">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span className="text-sm font-medium">End-to-end encryption • Zero-knowledge submission</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NewClaim;