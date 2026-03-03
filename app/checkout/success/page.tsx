'use client';

import React, { Suspense } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ShoppingBag, ArrowRight, Clock } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const SuccessContent = () => {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  const isPending = status === 'pending';

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      className="flex flex-col items-center text-center gap-6"
    >
      <div className={`w-24 h-24 rounded-full flex items-center justify-center ${isPending ? 'bg-yellow-50 text-yellow-500' : 'bg-emerald-50 text-emerald-500'}`}>
        {isPending ? <Clock size={48} /> : <CheckCircle2 size={48} />}
      </div>
      
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-black">
          {isPending ? 'Payment Pending' : 'Order Confirmed!'}
        </h1>
        <p className="text-sm text-gray-500 max-w-[300px]">
          {isPending 
            ? 'Your payment is being processed. We will notify you once it is confirmed.' 
            : 'Thank you for your purchase. Your order has been placed successfully and is being prepared.'}
        </p>
      </div>

      <div className="flex flex-col w-full gap-3 mt-4">
        <Link
          href="/"
          className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-black text-white text-sm font-bold hover:bg-gray-800 transition-all shadow-xl shadow-black/10"
        >
          <ShoppingBag size={18} />
          Back to Shopping
        </Link>
        <Link
          href="/catalog"
          className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-gray-50 text-gray-600 text-sm font-bold hover:bg-gray-100 transition-all"
        >
          Browse More
          <ArrowRight size={18} />
        </Link>
      </div>
    </motion.div>
  );
};

const SuccessPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-white">
      <Suspense fallback={<div className="animate-pulse text-gray-400">Loading...</div>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
};

export default SuccessPage;
