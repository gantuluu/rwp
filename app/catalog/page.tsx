'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, ChevronLeft, Loader2, ShoppingBag } from 'lucide-react';
import { fetchProducts, categories, Product } from '@/lib/data';
import { useCart } from '@/hooks/use-cart';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

export default function Catalog() {
  const { toggleCart, items } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    };
    loadData();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin text-black" size={32} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-8">
      {/* Header */}
      <header className="px-6 pt-6 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="p-2.5 rounded-2xl bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors">
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-xl font-bold text-black">Catalog</h1>
          <div className="flex gap-2">
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
              <SlidersHorizontal size={20} />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-black transition-all text-sm font-medium"
          />
        </div>
      </header>

      {/* Categories */}
      <section className="flex overflow-x-auto gap-3 px-6 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`flex-shrink-0 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
              selectedCategory === cat
                ? 'bg-black text-white shadow-lg shadow-black/10'
                : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* Product Grid */}
      <section className="px-6 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            {filteredProducts.length} Results
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-gray-300">
              <Search size={32} />
            </div>
            <p className="text-sm font-medium text-gray-400">No products found</p>
          </div>
        )}
      </section>
    </div>
  );
}
