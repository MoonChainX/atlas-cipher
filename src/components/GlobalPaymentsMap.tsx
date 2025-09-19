import { useEffect, useRef } from 'react';

const GlobalPaymentsMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate payment animations
    const animatePayments = () => {
      if (!mapRef.current) return;
      
      const trails = mapRef.current.querySelectorAll('.payment-trail');
      trails.forEach((trail, index) => {
        setTimeout(() => {
          trail.classList.add('animate-pulse');
        }, index * 500);
      });
    };

    const interval = setInterval(animatePayments, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden cyber-gradient">
      <div className="absolute inset-0 circuit-bg opacity-30" />
      
      {/* World Map Visualization */}
      <div ref={mapRef} className="relative h-full w-full flex items-center justify-center">
        {/* Central Globe */}
        <div className="relative">
          <div className="w-96 h-96 rounded-full border-2 border-primary neon-glow globe-rotate">
            <div className="absolute inset-4 rounded-full border border-primary/50" />
            <div className="absolute inset-8 rounded-full border border-primary/30" />
            
            {/* Continents representation */}
            <div className="absolute top-1/3 left-1/4 w-16 h-12 bg-primary/20 rounded-full" />
            <div className="absolute top-1/2 right-1/3 w-20 h-16 bg-primary/20 rounded-lg" />
            <div className="absolute bottom-1/3 left-1/3 w-12 h-10 bg-primary/20 rounded-full" />
          </div>
          
          {/* Payment Trails */}
          <div className="absolute inset-0">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="payment-trail absolute w-1 bg-neon-green/60 rounded-full"
                style={{
                  height: `${120 + i * 20}px`,
                  transform: `rotate(${i * 45}deg)`,
                  transformOrigin: 'bottom center',
                  bottom: '50%',
                  left: '50%',
                  marginLeft: '-2px',
                }}
              />
            ))}
          </div>
          
          {/* Orbiting Payment Nodes */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 bg-primary rounded-full neon-glow animate-ping"
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${i * 60}deg) translateY(-240px) rotate(-${i * 60}deg)`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>
        
        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="paymentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--neon-cyan))" stopOpacity="0" />
              <stop offset="50%" stopColor="hsl(var(--neon-cyan))" stopOpacity="0.8" />
              <stop offset="100%" stopColor="hsl(var(--neon-green))" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30) * Math.PI / 180;
            const x1 = 50 + 30 * Math.cos(angle);
            const y1 = 50 + 30 * Math.sin(angle);
            const x2 = 50 + 45 * Math.cos(angle + Math.PI);
            const y2 = 50 + 45 * Math.sin(angle + Math.PI);
            
            return (
              <line
                key={i}
                x1={`${x1}%`}
                y1={`${y1}%`}
                x2={`${x2}%`}
                y2={`${y2}%`}
                stroke="url(#paymentGradient)"
                strokeWidth="2"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            );
          })}
        </svg>
        
        {/* Regional Payment Hubs */}
        <div className="absolute top-1/4 left-1/4 flex flex-col items-center">
          <div className="w-3 h-3 bg-neon-green rounded-full animate-ping" />
          <span className="text-xs text-neon-green mt-1">Americas</span>
        </div>
        
        <div className="absolute top-1/3 right-1/4 flex flex-col items-center">
          <div className="w-3 h-3 bg-neon-blue rounded-full animate-ping" />
          <span className="text-xs text-neon-blue mt-1">Europe</span>
        </div>
        
        <div className="absolute bottom-1/3 right-1/3 flex flex-col items-center">
          <div className="w-3 h-3 bg-neon-purple rounded-full animate-ping" />
          <span className="text-xs text-neon-purple mt-1">Asia</span>
        </div>
        
        <div className="absolute bottom-1/4 left-1/3 flex flex-col items-center">
          <div className="w-3 h-3 bg-neon-orange rounded-full animate-ping" />
          <span className="text-xs text-neon-orange mt-1">Africa</span>
        </div>
      </div>
      
      {/* Live Transaction Feed */}
      <div className="absolute top-8 right-8 bg-card/80 backdrop-blur-md rounded-lg p-4 max-w-sm">
        <h3 className="text-sm font-semibold text-primary mb-2">Live Encrypted Transactions</h3>
        <div className="space-y-2 text-xs">
          {[
            { from: "US", to: "UK", amount: "****", status: "Encrypted" },
            { from: "JP", to: "AU", amount: "****", status: "Processing" },
            { from: "DE", to: "CA", amount: "****", status: "Settled" },
          ].map((tx, i) => (
            <div key={i} className="flex justify-between items-center p-2 bg-muted/50 rounded">
              <span className="text-muted-foreground">{tx.from} → {tx.to}</span>
              <span className="text-primary">{tx.amount}</span>
              <span className="text-neon-green text-xs">{tx.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GlobalPaymentsMap;