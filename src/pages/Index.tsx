import Header from "@/components/Header";
import ClaimsDashboard from "@/components/ClaimsDashboard";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ClaimsDashboard />
      </main>
      <Footer />
    </div>
  );
};

export default Index;