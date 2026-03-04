'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Zap, Truck } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import Image from 'next/image';
import Link from 'next/link';

const Cart = () => {
  const { items, isOpen, closeCart, updateQuantity, removeItem } = useCart();

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-[450px] bg-background border-l border-white/5 shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="px-8 py-8 border-b border-white/5 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl premium-gradient flex items-center justify-center shadow-lg shadow-primary/20">
                  <ShoppingBag size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-white tracking-tight">YOUR BAG</h2>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">
                    {items.length} {items.length === 1 ? 'ITEM' : 'ITEMS'} SELECTED
                  </p>
                </div>
              </div>
              <button
                onClick={closeCart}
                className="p-3 rounded-2xl bg-secondary text-gray-400 hover:text-white transition-all border border-white/5"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-8 no-scrollbar">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
                  <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center text-gray-700">
                    <ShoppingBag size={48} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-lg font-bold text-white">Your bag is empty</p>
                    <p className="text-sm text-gray-500 max-w-[200px]">Looks like you haven&apos;t added any premium tech yet.</p>
                  </div>
                  <button
                    onClick={closeCart}
                    className="mt-4 px-10 py-4 rounded-2xl premium-gradient text-white text-xs font-black uppercase tracking-[0.2em] hover:shadow-2xl hover:shadow-primary/30 transition-all"
                  >
                    START SHOPPING
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.variantId}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex gap-6 group"
                  >
                    <div className="relative w-28 aspect-square rounded-3xl overflow-hidden bg-secondary border border-white/5 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex flex-col gap-1">
                          <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug">{item.title}</h3>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                              {item.color}
                            </span>
                            <span className="text-gray-700">•</span>
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                              {item.size}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.variantId)}
                          className="p-2 rounded-xl bg-secondary/50 text-gray-600 hover:text-primary transition-all border border-white/5"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex justify-between items-end mt-4">
                        <div className="flex items-center gap-4 bg-secondary/50 rounded-2xl px-3 py-1.5 border border-white/5">
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            className="p-1 text-gray-500 hover:text-white transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-xs font-black text-white w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            className="p-1 text-gray-500 hover:text-white transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-sm font-black text-primary">
                            Rp{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-8 py-10 border-t border-white/5 bg-secondary/20 flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Subtotal</span>
                    <span className="text-sm font-bold text-white">Rp{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Truck size={14} className="text-primary" />
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Shipping</span>
                    </div>
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
                      FREE
                    </span>
                  </div>
                  <div className="h-px bg-white/5 my-2" />
                  <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Total Amount</span>
                      <span className="text-2xl font-black text-white tracking-tighter">Rp{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-primary uppercase tracking-widest">
                      <Zap size={10} fill="currentColor" /> Earn 500 Points
                    </div>
                  </div>
                </div>
                <Link 
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full flex items-center justify-center gap-4 py-5 rounded-[1.5rem] premium-gradient text-white text-sm font-black uppercase tracking-[0.2em] hover:shadow-2xl hover:shadow-primary/40 transition-all group"
                >
                  CHECKOUT NOW
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
