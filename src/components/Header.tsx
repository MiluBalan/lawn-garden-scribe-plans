import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, Search, User, ShoppingCart } from 'lucide-react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

interface HeaderProps {
  onStartPlan?: () => void;
}

const Header = ({ onStartPlan }: HeaderProps) => {
  const handleLogoClick = () => {
    window.location.href = '/';
  };

  const navItems = [
    { label: 'HOME', href: '/', onClick: () => window.location.href = '/' },
    { label: 'SHOP ALL', href: 'https://biogrowthorganics.com/', onClick: () => window.open('https://biogrowthorganics.com/', '_blank') },
    { label: 'PLANT VITAMINS', href: 'https://biogrowthorganics.com/collections/plant-vitamins', onClick: () => window.open('https://biogrowthorganics.com/collections/plant-vitamins', '_blank') },
    { label: 'ENZYMPLUS', href: 'https://biogrowthorganics.com/products/enzymplus', onClick: () => window.open('https://biogrowthorganics.com/products/enzymplus', '_blank') },
    { label: 'BLOGS', href: 'https://biogrowthorganics.com/blogs/news', onClick: () => window.open('https://biogrowthorganics.com/blogs/news', '_blank') },
  ];

  return (
    <header className="w-full bg-[#4A7C59] py-4 px-6 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div 
          onClick={handleLogoClick}
          className="cursor-pointer transition-transform hover:scale-105"
        >
          <img 
            src="/lovable-uploads/028c60fb-4502-4611-ae0f-31039b7b3e9f.png" 
            alt="BioGrowth" 
            className="h-8 w-auto"
          />
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={item.onClick}
              className="text-white font-bold text-sm hover:text-white/80 transition-colors"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Desktop Icons */}
        <div className="hidden lg:flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            className="text-white hover:text-white/80 hover:bg-white/10"
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="text-white hover:text-white/80 hover:bg-white/10"
          >
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="text-white hover:text-white/80 hover:bg-white/10"
            onClick={() => window.open('https://biogrowthorganics.com/cart', '_blank')}
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Cart</span>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <Drawer>
          <DrawerTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className="lg:hidden text-white hover:text-white/80 hover:bg-white/10"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Navigation</DrawerTitle>
            </DrawerHeader>
            <div className="flex flex-col gap-4 p-4 pb-8">
              {navItems.map((item) => (
                <DrawerClose key={item.label} asChild>
                  <Button 
                    variant="ghost" 
                    onClick={item.onClick}
                    className="text-gray-700 hover:text-primary font-semibold justify-start text-lg"
                  >
                    {item.label}
                  </Button>
                </DrawerClose>
              ))}
              <DrawerClose asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="justify-start"
                  onClick={() => window.open('https://biogrowthorganics.com/cart', '_blank')}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Cart
                </Button>
              </DrawerClose>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </header>
  );
};

export default Header;