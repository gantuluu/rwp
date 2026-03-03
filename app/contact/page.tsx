'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Mail, MapPin, Phone, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="px-6 py-6 flex items-center gap-4 border-b border-gray-50">
        <Link href="/" className="p-2 rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors">
          <ChevronLeft size={20} />
        </Link>
        <h1 className="text-lg font-bold text-black">Hubungi Kami</h1>
      </header>

      <main className="px-6 py-8 flex flex-col gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4"
        >
          <h2 className="text-2xl font-bold text-black">Ada Pertanyaan?</h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            Tim layanan pelanggan kami siap membantu Anda setiap hari Senin - Sabtu, pukul 09:00 - 17:00 WIB.
          </p>
        </motion.div>

        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-4 p-5 rounded-3xl bg-gray-50 border border-gray-100">
            <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center">
              <Mail size={24} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email</span>
              <span className="text-sm font-bold text-black">wahyupratmarendi@gmail.com</span>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-3xl bg-gray-50 border border-gray-100">
            <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center">
              <MapPin size={24} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Alamat</span>
              <span className="text-sm font-bold text-black leading-tight">Kepung, Kediri, Jawa Timur</span>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-3xl bg-gray-50 border border-gray-100">
            <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center">
              <MessageCircle size={24} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">WhatsApp</span>
              <span className="text-sm font-bold text-black">0812-XXXX-XXXX</span>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4 mt-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Media Sosial</h3>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition-all">
              <span className="text-xs font-bold">IG</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition-all">
              <span className="text-xs font-bold">FB</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
