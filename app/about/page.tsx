'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="px-6 py-6 flex items-center gap-4 border-b border-gray-50">
        <Link href="/" className="p-2 rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors">
          <ChevronLeft size={20} />
        </Link>
        <h1 className="text-lg font-bold text-black">Tentang Kami</h1>
      </header>

      <main className="px-6 py-8 flex flex-col gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4"
        >
          <div className="w-16 h-16 rounded-2xl bg-black flex items-center justify-center text-white">
            <HelpCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold text-black">RWP Store</h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            RWP Store adalah toko online modern yang berfokus pada penyediaan perangkat teknologi terbaru dan aksesoris berkualitas tinggi. Kami berkomitmen untuk memberikan pengalaman belanja yang mudah, aman, dan terpercaya bagi seluruh pelanggan kami.
          </p>
          <p className="text-sm text-gray-500 leading-relaxed">
            Berlokasi di Kepung, Kediri, Jawa Timur, kami melayani pengiriman ke seluruh wilayah Indonesia dengan standar pelayanan yang profesional.
          </p>
        </motion.div>

        <section className="flex flex-col gap-4 mt-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Visi Kami</h3>
          <p className="text-sm text-gray-600 italic">
            &quot;Menjadi mitra teknologi terpercaya bagi masyarakat dengan menghadirkan produk inovatif dan layanan yang memuaskan.&quot;
          </p>
        </section>
      </main>
    </div>
  );
}
