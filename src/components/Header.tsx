import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
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

  const handleShopClick = () => {
    window.open('https://biogrowthorganics.com/', '_blank');
  };

  const handleContactClick = () => {
    window.open('https://biogrowthorganics.com/pages/contact-us', '_blank');
  };

  return (
    <header className="w-full bg-white/95 backdrop-blur-sm py-4 px-6 sticky top-0 z-50 shadow-md border-b border-gray-100">
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
        <nav className="hidden md:flex items-center gap-6">
          <Button 
            variant="ghost" 
            onClick={onStartPlan}
            className="text-gray-700 hover:text-primary font-medium"
          >
            Custom Plan
          </Button>
          <Button 
            variant="ghost" 
            onClick={handleShopClick}
            className="text-gray-700 hover:text-primary font-medium"
          >
            Shop
          </Button>
          <Button 
            variant="ghost" 
            onClick={handleContactClick}
            className="text-gray-700 hover:text-primary font-medium"
          >
            Contact Us
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <Drawer>
          <DrawerTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden text-gray-700 hover:text-primary"
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
              <DrawerClose asChild>
                <Button 
                  variant="ghost" 
                  onClick={onStartPlan}
                  className="text-gray-700 hover:text-primary font-medium justify-start"
                >
                  Custom Plan
                </Button>
              </DrawerClose>
              <DrawerClose asChild>
                <Button 
                  variant="ghost" 
                  onClick={handleShopClick}
                  className="text-gray-700 hover:text-primary font-medium justify-start"
                >
                  Shop
                </Button>
              </DrawerClose>
              <DrawerClose asChild>
                <Button 
                  variant="ghost" 
                  onClick={handleContactClick}
                  className="text-gray-700 hover:text-primary font-medium justify-start"
                >
                  Contact Us
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