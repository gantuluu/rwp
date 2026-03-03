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
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[500px] bg-white/80 backdrop-blur-md border-t border-gray-100 px-6 py-3 z-50">
      <div className="flex justify-between items-center">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;

          return (
            <Link key={item.path} href={item.path} className="relative flex flex-col items-center gap-1 group">
              <div className={`p-2 rounded-2xl transition-colors ${isActive ? 'text-black' : 'text-gray-400 group-hover:text-gray-600'}`}>
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] font-medium uppercase tracking-wider ${isActive ? 'text-black' : 'text-gray-400'}`}>
                {item.name}
              </span>
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -top-3 w-1 h-1 bg-black rounded-full"
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
