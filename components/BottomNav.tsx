'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, User } from 'lucide-react';
import { motion } from 'motion/react';

const BottomNav = () => {
  const pathname = usePathname();
  const isHidden = pathname.startsWith('/product/') || pathname.startsWith('/checkout');

  if (isHidden) return null;

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Catalog', path: '/catalog', icon: ShoppingBag },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full glass border-t border-white/5 px-6 py-3 z-50 md:hidden">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;

          return (
            <Link key={item.path} href={item.path} className="relative flex flex-col items-center gap-1 group">
              <div className={`p-2 rounded-2xl transition-all duration-300 ${isActive ? 'text-primary scale-110' : 'text-gray-500 group-hover:text-white'}`}>
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${isActive ? 'text-white' : 'text-gray-500'}`}>
                {item.name}
              </span>
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -top-3 w-1 h-1 bg-primary rounded-full shadow-[0_0_10px_rgba(238,77,45,0.8)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
