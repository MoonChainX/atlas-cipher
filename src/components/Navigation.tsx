import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Globe, ArrowRight } from 'lucide-react';
import logo from '@/assets/logo.png';

const Navigation = () => {
  const location = useLocation();
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/20">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img 
            src={logo} 
            alt="CyberPay Logo" 
            className="w-10 h-10"
          />
          <span className="text-xl font-bold text-primary">CyberPay</span>
        </Link>
        
        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === '/' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/settlement" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === '/settlement' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Settlement
          </Link>
        </div>
        
        {/* CTA Button */}
        <Link to="/settlement">
          <Button size="sm" className="neon-gradient">
            Start Settlement
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;