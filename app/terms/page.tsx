'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, FileText } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="px-6 py-6 flex items-center gap-4 border-b border-gray-50">
        <Link href="/" className="p-2 rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors">
          <ChevronLeft size={20} />
        </Link>
        <h1 className="text-lg font-bold text-black">Syarat & Ketentuan</h1>
      </header>

      <main className="px-6 py-8 flex flex-col gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center">
            <FileText size={24} />
          </div>
          <h2 className="text-xl font-bold text-black">Aturan Penggunaan</h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            Dengan mengakses dan berbelanja di RWP Store, Anda dianggap telah membaca, memahami, dan menyetujui seluruh syarat dan ketentuan di bawah ini.
          </p>
        </motion.div>

        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-bold text-black">1. Transaksi & Pembayaran</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Semua transaksi dilakukan dalam mata uang Rupiah (IDR). Pembayaran harus diselesaikan sesuai dengan instruksi yang diberikan melalui gateway pembayaran kami.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-bold text-black">2. Ketersediaan Produk</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Kami berusaha memastikan stok produk selalu akurat. Namun, jika produk yang dipesan tidak tersedia, kami akan segera menghubungi Anda untuk opsi penggantian atau pengembalian dana.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-bold text-black">3. Harga Produk</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Harga yang tertera dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya. Harga yang berlaku adalah harga yang tertera pada saat Anda menyelesaikan pesanan.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-bold text-black">4. Akurasi Informasi</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Pengguna wajib memberikan informasi pengiriman yang akurat dan lengkap. Kami tidak bertanggung jawab atas kegagalan pengiriman akibat kesalahan alamat yang diberikan oleh pengguna.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
