'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Search, Bell, ArrowRight, Loader2, ShoppingBag, Zap, ChevronRight, Star, Clock } from 'lucide-react';
import { fetchProducts, Product } from '@/lib/data';
import { useCart } from '@/hooks/use-cart';
import ProductCard from '@/components/ProductCard';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    };
    loadData();
  }, []);

  const flashSaleProducts = products.slice(0, 6);
  const categories = [
    { name: 'iPhone', icon: '📱' },
    { name: 'Laptops', icon: '💻' },
    { name: 'Watches', icon: '⌚' },
    { name: 'Audio', icon: '🎧' },
    { name: 'Gaming', icon: '🎮' },
    { name: 'Cameras', icon: '📷' },
    { name: 'Tablets', icon: '📟' },
    { name: 'Accessories', icon: '🔌' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-primary" size={48} />
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500">Loading Premium Experience</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 md:gap-12 pb-12">
      {/* Hero Section */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 relative h-[300px] md:h-[450px] rounded-[2rem] overflow-hidden group"
          >
            <Image 
              src="https://picsum.photos/seed/tech/1200/800" 
              alt="Hero Main" 
              fill 
              className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent p-8 md:p-16 flex flex-col justify-center gap-4">
              <span className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/30 w-fit">
                Exclusive Launch
              </span>
              <h2 className="text-4xl md:text-6xl font-black leading-tight text-white tracking-tighter">
                FUTURE <br /> <span className="text-primary">UNLOCKED.</span>
              </h2>
              <p className="text-sm md:text-base text-gray-400 max-w-md line-clamp-2">
                Discover the next generation of premium technology. Limited edition releases now available.
              </p>
              <button className="mt-4 flex items-center gap-3 px-8 py-4 rounded-2xl premium-gradient text-white text-xs font-black uppercase tracking-widest hover:shadow-2xl hover:shadow-primary/40 transition-all w-fit group/btn">
                Shop Collection 
                <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          <div className="hidden lg:flex flex-col gap-4 md:gap-6">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative flex-1 rounded-[2rem] overflow-hidden group"
            >
              <Image 
                src="https://picsum.photos/seed/watch/600/400" 
                alt="Hero Sub 1" 
                fill 
                className="object-cover opacity-70 group-hover:scale-110 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 p-8 flex flex-col justify-end gap-2 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-xl font-bold text-white">Smart Wearables</h3>
                <p className="text-xs text-gray-400">Up to 40% OFF</p>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="relative flex-1 rounded-[2rem] overflow-hidden group"
            >
              <Image 
                src="https://picsum.photos/seed/audio/600/400" 
                alt="Hero Sub 2" 
                fill 
                className="object-cover opacity-70 group-hover:scale-110 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 p-8 flex flex-col justify-end gap-2 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-xl font-bold text-white">Audio Perfection</h3>
                <p className="text-xs text-gray-400">New Arrivals</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="glass rounded-[2.5rem] p-8 md:p-12">
          <div className="flex justify-between items-end mb-8">
            <div className="flex flex-col gap-1">
              <h3 className="text-xl md:text-2xl font-black text-white tracking-tight uppercase">Categories</h3>
              <div className="h-1 w-12 bg-primary rounded-full" />
            </div>
            <button className="text-[10px] font-bold text-gray-500 hover:text-primary transition-colors uppercase tracking-widest flex items-center gap-2">
              View All <ChevronRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4 md:gap-8">
            {categories.map((cat, i) => (
              <motion.button
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex flex-col items-center gap-3 group"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-secondary/50 border border-white/5 flex items-center justify-center text-2xl group-hover:bg-primary/10 group-hover:border-primary/30 transition-all group-hover:-translate-y-1">
                  {cat.icon}
                </div>
                <span className="text-[10px] font-bold text-gray-500 group-hover:text-white transition-colors uppercase tracking-wider text-center">
                  {cat.name}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Flash Sale Section */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="bg-primary/5 border border-primary/20 rounded-[2.5rem] p-8 md:p-12 overflow-hidden relative">
          {/* Background Glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8 relative z-10">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white font-black uppercase tracking-widest text-sm italic">
                <Zap size={18} fill="currentColor" /> Flash Sale
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-white font-mono text-xl">
                  <span className="bg-secondary px-2 py-1 rounded-lg border border-white/10">02</span>
                  <span className="text-primary">:</span>
                  <span className="bg-secondary px-2 py-1 rounded-lg border border-white/10">45</span>
                  <span className="text-primary">:</span>
                  <span className="bg-secondary px-2 py-1 rounded-lg border border-white/10">12</span>
                </div>
              </div>
            </div>
            <button className="text-[10px] font-bold text-primary hover:text-white transition-colors uppercase tracking-widest flex items-center gap-2">
              See more deals <ChevronRight size={14} />
            </button>
          </div>

          <div className="flex overflow-x-auto gap-4 md:gap-6 no-scrollbar pb-4 relative z-10">
            {flashSaleProducts.map((product) => (
              <div key={product.id} className="w-[180px] md:w-[220px] flex-shrink-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Product Grid */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-end mb-8">
          <div className="flex flex-col gap-1">
            <h3 className="text-xl md:text-2xl font-black text-white tracking-tight uppercase">Daily Discover</h3>
            <div className="h-1 w-12 bg-primary rounded-full" />
          </div>
          <div className="flex gap-2">
            {['All', 'Trending', 'New', 'Best Sellers'].map((tab) => (
              <button 
                key={tab}
                className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                  tab === 'All' ? 'bg-primary text-white' : 'bg-secondary/50 text-gray-500 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <button className="px-12 py-4 rounded-2xl bg-secondary border border-white/5 text-white text-xs font-black uppercase tracking-widest hover:bg-primary transition-all shadow-xl">
            Load More Products
          </button>
        </div>
      </section>
    </div>
  );
}
