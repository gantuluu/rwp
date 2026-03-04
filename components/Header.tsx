'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, User, Bell, HelpCircle, Menu, X } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { motion, AnimatePresence } from 'motion/react';

const Header = () => {
  const { items, openCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${isScrolled ? 'glass py-2 shadow-lg' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 md:px-6">
        {/* Top Bar - Desktop Only */}
        <div className="hidden md:flex justify-between items-center text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-2">
          <div className="flex gap-4">
            <Link href="/seller" className="hover:text-primary transition-colors">Seller Centre</Link>
            <Link href="/download" className="hover:text-primary transition-colors">Download App</Link>
            <div className="h-3 w-px bg-gray-800" />
            <span className="flex items-center gap-1">Follow us on <span className="text-white">Instagram</span></span>
          </div>
          <div className="flex gap-4 items-center">
            <Link href="/notifications" className="flex items-center gap-1 hover:text-primary transition-colors">
              <Bell size={12} /> Notifications
            </Link>
            <Link href="/help" className="flex items-center gap-1 hover:text-primary transition-colors">
              <HelpCircle size={12} /> Help
            </Link>
            <div className="h-3 w-px bg-gray-800" />
            <Link href="/profile" className="flex items-center gap-1 hover:text-primary transition-colors">
              <User size={12} /> My Account
            </Link>
          </div>
        </div>

        {/* Main Header */}
        <div className="flex items-center gap-4 md:gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl premium-gradient flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              <ShoppingCart className="text-white" size={20} />
            </div>
            <span className="text-lg md:text-2xl font-black tracking-tighter text-white uppercase">
              RWP<span className="text-primary">STORE</span>
            </span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 relative group hidden sm:block">
            <input 
              type="text" 
              placeholder="Search for premium tech..." 
              className="w-full bg-secondary/50 border border-white/5 rounded-xl py-2.5 md:py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/50 focus:bg-secondary transition-all outline-none text-white"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={18} />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-lg premium-gradient text-white text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity hidden md:block">
              Search
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={openCart}
              className="relative p-2.5 rounded-xl bg-secondary/50 border border-white/5 text-white hover:bg-secondary transition-all group"
            >
              <ShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full premium-gradient flex items-center justify-center text-[10px] font-black border-2 border-background">
                  {items.length}
                </span>
              )}
            </button>
            
            <button 
              className="md:hidden p-2.5 rounded-xl bg-secondary/50 border border-white/5 text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <Link href="/profile" className="hidden md:flex items-center gap-3 p-1.5 pr-4 rounded-xl bg-secondary/50 border border-white/5 hover:bg-secondary transition-all group">
              <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors">
                <User size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-white uppercase tracking-widest">Login</span>
                <span className="text-[8px] text-gray-500 uppercase tracking-widest">Account</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/5 overflow-hidden mt-2"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="w-full bg-secondary/50 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm outline-none text-white"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Link href="/catalog" className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-secondary/50 border border-white/5">
                  <ShoppingCart size={24} className="text-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Catalog</span>
                </Link>
                <Link href="/profile" className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-secondary/50 border border-white/5">
                  <User size={24} className="text-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Profile</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
