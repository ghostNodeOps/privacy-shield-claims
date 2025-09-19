import { useState, useEffect } from "react";

interface AnimatedSafeBoxProps {
  delay?: number;
}

const AnimatedSafeBox = ({ delay = 0 }: AnimatedSafeBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setIsOpen(prev => !prev);
      }, 4000);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className="relative w-16 h-16 mx-4">
      {/* Safe body */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted to-encrypted rounded-lg border-2 border-border shadow-lg">
        {/* Safe door */}
        <div 
          className={`absolute inset-1 bg-gradient-to-br from-card to-muted rounded border transition-transform duration-1000 origin-left ${
            isOpen ? 'rotate-y-90' : 'rotate-y-0'
          }`}
          style={{
            transform: isOpen ? 'perspective(200px) rotateY(-90deg)' : 'perspective(200px) rotateY(0deg)',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Handle */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-accent rounded-full shadow-sm" />
          
          {/* Lock mechanism */}
          <div className="absolute right-3 top-1/3 w-1 h-1 bg-primary rounded-full" />
          <div className="absolute right-3 bottom-1/3 w-1 h-1 bg-primary rounded-full" />
        </div>

        {/* Interior when open */}
        {isOpen && (
          <div className="absolute inset-2 bg-success/20 rounded animate-pulse">
            <div className="absolute inset-1 flex items-center justify-center">
              <div className="w-2 h-2 bg-success rounded-full animate-ping" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimatedSafeBox;