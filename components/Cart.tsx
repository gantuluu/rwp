'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
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
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-[400px] bg-white shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="px-6 py-6 border-b border-gray-100 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gray-50 text-black">
                  <ShoppingBag size={20} />
                </div>
                <h2 className="text-lg font-bold text-black">Your Bag</h2>
                <span className="px-2 py-0.5 rounded-full bg-black text-white text-[10px] font-bold">
                  {items.length}
                </span>
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-xl hover:bg-gray-50 text-gray-400 hover:text-black transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-6 no-scrollbar">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center text-gray-300">
                    <ShoppingBag size={40} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-bold text-black">Your bag is empty</p>
                    <p className="text-xs text-gray-400">Looks like you haven&apos;t added anything yet.</p>
                  </div>
                  <button
                    onClick={closeCart}
                    className="mt-4 px-8 py-3 rounded-2xl bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.variantId}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-4 group"
                  >
                    <div className="relative w-24 aspect-square rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col gap-0.5">
                          <h3 className="text-sm font-bold text-black line-clamp-1">{item.title}</h3>
                          <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">
                            {item.color} • {item.size}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.variantId)}
                          className="text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-2 py-1">
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            className="p-1 text-gray-400 hover:text-black transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            className="p-1 text-gray-400 hover:text-black transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="text-sm font-bold text-black">
                          Rp{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-8 border-t border-gray-100 bg-gray-50/50 flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-xs font-medium text-gray-400">
                    <span>Subtotal</span>
                    <span>Rp{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-medium text-gray-400">
                    <span>Shipping</span>
                    <span className="text-emerald-500 font-bold uppercase tracking-widest">Free</span>
                  </div>
                  <div className="h-px bg-gray-100 my-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-black">Total</span>
                    <span className="text-xl font-bold text-black">Rp{subtotal.toLocaleString()}</span>
                  </div>
                </div>
                <Link 
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-black text-white text-sm font-bold hover:bg-gray-800 transition-all shadow-xl shadow-black/10 group"
                >
                  Checkout Now
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
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
