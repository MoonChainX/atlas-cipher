import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Globe, Shield, Zap } from 'lucide-react';
import logo from '@/assets/logo.png';

const Header = () => {
  return (
    <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 cyber-gradient" />
      <div className="absolute inset-0 circuit-bg opacity-30" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <img 
            src={logo} 
            alt="CyberPay Logo" 
            className="w-24 h-24 neon-glow"
          />
        </div>
        
        {/* Main Heading */}
        <h1 className="text-6xl md:text-8xl font-bold mb-6 neon-pulse">
          Global Payments,
          <br />
          <span className="text-primary">Privately Settled.</span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Revolutionary cross-border payment system where transaction amounts are encrypted during settlement, 
          protecting commercial privacy between sender and receiver.
        </p>
        
        {/* Feature Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Badge className="bg-neon-green/10 text-neon-green border-neon-green/20 px-4 py-2">
            <Shield className="w-4 h-4 mr-2" />
            End-to-End Encrypted
          </Badge>
          <Badge className="bg-neon-blue/10 text-neon-blue border-neon-blue/20 px-4 py-2">
            <Globe className="w-4 h-4 mr-2" />
            Global Network
          </Badge>
          <Badge className="bg-neon-purple/10 text-neon-purple border-neon-purple/20 px-4 py-2">
            <Zap className="w-4 h-4 mr-2" />
            Instant Settlement
          </Badge>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="neon-gradient hover:opacity-90 transition-opacity px-8 py-4 text-lg"
          >
            Connect Wallet
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-primary text-primary hover:bg-primary/10 px-8 py-4 text-lg"
          >
            View Network
          </Button>
        </div>
        
        {/* Privacy Notice */}
        <div className="mt-12 p-4 bg-card/50 backdrop-blur-md rounded-lg border border-primary/20 max-w-2xl mx-auto">
          <p className="text-sm text-muted-foreground">
            <Shield className="w-4 h-4 inline mr-2 text-primary" />
            Your transaction amounts are cryptographically sealed. Only you and your recipient can view the details.
          </p>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </header>
  );
};

export default Header;