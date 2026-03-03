'use client';

import React from 'react';
import { motion } from 'motion/react';
import { 
  Settings, 
  ChevronRight, 
  CreditCard, 
  MapPin, 
  Package, 
  Heart, 
  LogOut,
  ShieldCheck,
  HelpCircle
} from 'lucide-react';
import Image from 'next/image';

export default function Profile() {
  const menuItems = [
    { icon: Package, label: 'My Orders', count: 3 },
    { icon: Heart, label: 'Wishlist', count: 12 },
    { icon: CreditCard, label: 'Payment Methods' },
    { icon: MapPin, label: 'Shipping Address' },
    { icon: ShieldCheck, label: 'Privacy & Security' },
    { icon: HelpCircle, label: 'Help Center' },
  ];

  return (
    <div className="flex flex-col pb-8">
      {/* Header */}
      <header className="px-6 pt-10 pb-8 flex flex-col items-center gap-4 bg-gray-50/50">
        <div className="relative">
          <div className="w-24 h-24 rounded-[32px] overflow-hidden border-4 border-white shadow-xl relative">
            <Image 
              src="https://picsum.photos/seed/avatar/200/200" 
              alt="Avatar" 
              fill 
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <button className="absolute -bottom-1 -right-1 p-2 rounded-xl bg-black text-white shadow-lg border-2 border-white">
            <Settings size={14} />
          </button>
        </div>
        <div className="text-center">
          <h1 className="text-xl font-bold text-black">Wahyu Pratama Rendi</h1>
          <p className="text-xs font-medium text-gray-400">wahyupratmarendi@gmail.com</p>
        </div>
      </header>

      {/* Stats */}
      <section className="px-6 -mt-6">
        <div className="bg-white rounded-[32px] p-6 shadow-xl shadow-black/5 border border-gray-100 flex justify-between items-center">
          <div className="flex flex-col items-center gap-1 flex-1 border-r border-gray-100">
            <span className="text-lg font-bold text-black">12</span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Wishlist</span>
          </div>
          <div className="flex flex-col items-center gap-1 flex-1 border-r border-gray-100">
            <span className="text-lg font-bold text-black">3</span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Orders</span>
          </div>
          <div className="flex flex-col items-center gap-1 flex-1">
            <span className="text-lg font-bold text-black">450</span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Points</span>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section className="px-6 mt-8 flex flex-col gap-2">
        {menuItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between p-4 rounded-2xl bg-white hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-gray-50 text-gray-600 group-hover:bg-black group-hover:text-white transition-colors">
                  <Icon size={20} />
                </div>
                <span className="text-sm font-bold text-gray-700">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.count && (
                  <span className="px-2 py-0.5 rounded-lg bg-red-50 text-red-500 text-[10px] font-bold">
                    {item.count}
                  </span>
                )}
                <ChevronRight size={16} className="text-gray-300 group-hover:text-black transition-colors" />
              </div>
            </motion.button>
          );
        })}
      </section>

      {/* Logout */}
      <section className="px-6 mt-8">
        <button className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl bg-red-50 text-red-500 hover:bg-red-100 transition-colors text-sm font-bold">
          <LogOut size={20} />
          Log Out
        </button>
      </section>

      {/* App Version */}
      <footer className="mt-12 text-center pb-8">
        <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.3em]">RWP Store v1.0.0</p>
      </footer>
    </div>
  );
}
