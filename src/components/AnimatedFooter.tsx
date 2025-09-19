import { useEffect, useRef } from 'react';

const AnimatedFooter = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation variables
    let animationId: number;
    let time = 0;
    const routes: Array<{
      startAngle: number;
      endAngle: number;
      radius: number;
      color: string;
      speed: number;
      progress: number;
    }> = [];

    // Initialize payment routes
    for (let i = 0; i < 12; i++) {
      routes.push({
        startAngle: (i * 30) * Math.PI / 180,
        endAngle: ((i * 30) + 180) * Math.PI / 180,
        radius: 60 + (i % 3) * 20,
        color: ['#00ffff', '#0099ff', '#ff00ff', '#00ff00'][i % 4],
        speed: 0.02 + (i % 3) * 0.01,
        progress: 0,
      });
    }

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      ctx.clearRect(0, 0, rect.width, rect.height);
      
      // Draw central globe
      ctx.strokeStyle = '#00ffff';
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 40, 0, 2 * Math.PI);
      ctx.stroke();
      
      // Draw inner circles
      ctx.globalAlpha = 0.3;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 30, 0, 2 * Math.PI);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI);
      ctx.stroke();
      
      // Draw encrypted payment routes
      routes.forEach((route, index) => {
        route.progress += route.speed;
        if (route.progress > 1) route.progress = 0;
        
        // Create gradient for each route
        const gradient = ctx.createLinearGradient(
          centerX + Math.cos(route.startAngle) * route.radius,
          centerY + Math.sin(route.startAngle) * route.radius,
          centerX + Math.cos(route.endAngle) * route.radius,
          centerY + Math.sin(route.endAngle) * route.radius
        );
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(0.5, route.color);
        gradient.addColorStop(1, 'transparent');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 3;
        ctx.globalAlpha = 0.8;
        
        // Draw route arc
        ctx.beginPath();
        ctx.arc(
          centerX, 
          centerY, 
          route.radius, 
          route.startAngle, 
          route.startAngle + (route.endAngle - route.startAngle) * route.progress
        );
        ctx.stroke();
        
        // Draw moving payment dot
        const dotAngle = route.startAngle + (route.endAngle - route.startAngle) * route.progress;
        const dotX = centerX + Math.cos(dotAngle) * route.radius;
        const dotY = centerY + Math.sin(dotAngle) * route.radius;
        
        ctx.fillStyle = route.color;
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(dotX, dotY, 3, 0, 2 * Math.PI);
        ctx.fill();
        
        // Add glow effect
        ctx.shadowColor = route.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(dotX, dotY, 2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      
      time += 0.016;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <footer className="relative bg-card border-t border-primary/20 overflow-hidden">
      <div className="absolute inset-0 circuit-bg opacity-20" />
      
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />
      
      <div className="relative z-10 container mx-auto py-12 px-4">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Logo and Tagline */}
          <div className="space-y-4">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="w-8 h-8 rounded-full border-2 border-primary neon-glow" />
              <span className="text-xl font-bold text-primary">CyberPay</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Confidential cross-border payments with military-grade encryption.
            </p>
          </div>
          
          {/* Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Features</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center justify-center md:justify-start gap-2">
                <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
                Encrypted Settlements
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse" />
                Global Network
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <div className="w-2 h-2 bg-neon-purple rounded-full animate-pulse" />
                Zero Knowledge
              </li>
            </ul>
          </div>
          
          {/* Security */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Security</h3>
            <div className="text-sm space-y-2">
              <p className="text-muted-foreground">256-bit AES Encryption</p>
              <p className="text-muted-foreground">Multi-signature Wallets</p>
              <p className="text-muted-foreground">Quantum-resistant Protocols</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-primary/20 mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 CyberPay. All transactions are encrypted and confidential.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default AnimatedFooter;