'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Search, Bell, ArrowRight, Loader2, ShoppingBag } from 'lucide-react';
import { fetchProducts, Product } from '@/lib/data';
import { useCart } from '@/hooks/use-cart';
import ProductCard from '@/components/ProductCard';
import Image from 'next/image';

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

  const { toggleCart, items } = useCart();
  const featuredProducts = products.slice(0, 4);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin text-black" size={32} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 pb-8">
      {/* Header */}
      <header className="px-6 pt-6 flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Welcome back,</span>
          <h1 className="text-xl font-bold text-black">Alex Rivera</h1>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={toggleCart}
            className="p-2.5 rounded-2xl bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors relative"
          >
            <ShoppingBag size={20} />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                {items.length}
              </span>
            )}
          </button>
          <button className="p-2.5 rounded-2xl bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors">
            <Search size={20} />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative h-48 rounded-[32px] overflow-hidden bg-black text-white group"
        >
          <Image 
            src="https://picsum.photos/seed/fashion/800/400" 
            alt="Hero" 
            fill 
            className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 p-8 flex flex-col justify-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">New Collection 2026</span>
            <h2 className="text-3xl font-bold leading-tight">Modern <br /> Essentials</h2>
            <button className="mt-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest group/btn">
              Shop Now 
              <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* Categories Horizontal Scroll */}
      <section className="flex flex-col gap-4">
        <div className="px-6 flex justify-between items-end">
          <h3 className="text-lg font-bold text-black">Categories</h3>
          <button className="text-xs font-bold text-gray-400 hover:text-black transition-colors">See All</button>
        </div>
        <div className="flex overflow-x-auto gap-4 px-6 no-scrollbar pb-2">
          {['iPhone', 'iWatch', 'MacBook', 'iPad', 'AirPods'].map((cat, i) => (
            <motion.button
              key={cat}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex-shrink-0 px-6 py-3 rounded-2xl bg-gray-50 text-sm font-medium text-gray-600 hover:bg-black hover:text-white transition-all"
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="px-6 flex flex-col gap-4">
        <div className="flex justify-between items-end">
          <h3 className="text-lg font-bold text-black">Featured</h3>
          <button className="text-xs font-bold text-gray-400 hover:text-black transition-colors">View All</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
