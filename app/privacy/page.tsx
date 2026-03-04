'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="px-6 py-6 flex items-center gap-4 border-b border-gray-50">
        <Link href="/" className="p-2 rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors">
          <ChevronLeft size={20} />
        </Link>
        <h1 className="text-lg font-bold text-black">Kebijakan Privasi</h1>
      </header>

      <main className="px-6 py-8 flex flex-col gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
            <ShieldCheck size={24} />
          </div>
          <h2 className="text-xl font-bold text-black">Data Anda Aman Bersama Kami</h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            Di RWP Store, kami sangat menghargai privasi Anda. Kebijakan ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda.
          </p>
        </motion.div>

        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-bold text-black">1. Informasi yang Kami Kumpulkan</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Kami mengumpulkan informasi seperti nama, alamat email, nomor telepon, dan alamat pengiriman saat Anda melakukan pemesanan untuk tujuan pemrosesan transaksi.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-bold text-black">2. Penggunaan Informasi</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Informasi Anda digunakan untuk memproses pesanan, mengirimkan pembaruan status pengiriman, dan memberikan layanan pelanggan yang lebih baik.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-bold text-black">3. Keamanan Data</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Kami menggunakan teknologi enkripsi SSL untuk melindungi data sensitif Anda selama proses transaksi pembayaran. Kami tidak menyimpan data kartu kredit atau informasi perbankan Anda secara langsung.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-bold text-black">4. Pihak Ketiga</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Kami hanya membagikan data Anda kepada mitra logistik dan penyedia layanan pembayaran (seperti Xendit) yang diperlukan untuk menyelesaikan transaksi Anda.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
