import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Leaf } from 'lucide-react';

interface HeaderProps {
  onStartPlan?: () => void;
}

const Header = ({ onStartPlan }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogoClick = () => {
    window.location.href = '/';
  };

  const handleShopClick = () => {
    window.open('https://biogrowthorganics.com/', '_blank');
  };

  const handleContactClick = () => {
    window.open('https://biogrowthorganics.com/pages/contact-us', '_blank');
  };

  const navLinks = [
    { label: 'Custom Plan', onClick: () => { onStartPlan?.(); setMobileOpen(false); } },
    { label: 'Shop', onClick: () => { handleShopClick(); setMobileOpen(false); } },
    { label: 'Contact Us', onClick: () => { handleContactClick(); setMobileOpen(false); } },
  ];

  return (
    <header
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-6">
        {/* Logo */}
        <div
          onClick={handleLogoClick}
          className="cursor-pointer flex items-center gap-2 transition-transform hover:scale-105"
        >
          <img
            src="/lovable-uploads/028c60fb-4502-4611-ae0f-31039b7b3e9f.png"
            alt="BioGrowth"
            className="h-8 w-auto"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={link.onClick}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                scrolled
                  ? 'text-foreground hover:bg-muted hover:text-brand'
                  : 'text-white/90 hover:text-white hover:bg-white/15'
              }`}
            >
              {link.label}
            </button>
          ))}
          <Button
            onClick={onStartPlan}
            size="sm"
            className="ml-3 bg-brand hover:bg-brand-dark text-brand-foreground rounded-full px-5 font-semibold shadow-md hover:shadow-lg transition-all duration-200"
          >
            <Leaf className="h-4 w-4 mr-1" />
            Get My Plan
          </Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden p-2 rounded-lg transition-colors ${
            scrolled
              ? 'text-foreground hover:bg-muted'
              : 'text-white hover:bg-white/15'
          }`}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white/95 backdrop-blur-md border-t border-border px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={link.onClick}
              className="w-full text-left px-4 py-3 rounded-xl text-foreground font-medium hover:bg-surface-green transition-colors"
            >
              {link.label}
            </button>
          ))}
          <Button
            onClick={() => { onStartPlan?.(); setMobileOpen(false); }}
            className="w-full mt-2 bg-brand hover:bg-brand-dark text-brand-foreground rounded-xl font-semibold"
          >
            <Leaf className="h-4 w-4 mr-1" />
            Get My Plan
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
