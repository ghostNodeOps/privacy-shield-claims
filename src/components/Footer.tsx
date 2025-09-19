import AnimatedSafeBox from "./AnimatedSafeBox";

const Footer = () => {
  return (
    <footer className="bg-card border-t mt-16">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col items-center space-y-8">
          <div className="flex items-center justify-center space-x-2">
            <AnimatedSafeBox delay={0} />
            <AnimatedSafeBox delay={1000} />
            <AnimatedSafeBox delay={2000} />
            <AnimatedSafeBox delay={3000} />
          </div>
          
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold text-primary">Your Data, Your Control</h3>
            <p className="text-muted-foreground max-w-2xl">
              End-to-end encrypted insurance claims processing. Your sensitive data remains private 
              and secure throughout the entire claims lifecycle.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground pt-8 border-t border-border w-full">
            <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent transition-colors">Security</a>
            <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-accent transition-colors">Contact</a>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 Privacy First Insurance. All rights reserved.</p>
            <p className="text-xs mt-1">Protected by end-to-end encryption</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;