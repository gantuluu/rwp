'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function RefundPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="px-6 py-6 flex items-center gap-4 border-b border-gray-50">
        <Link href="/" className="p-2 rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors">
          <ChevronLeft size={20} />
        </Link>
        <h1 className="text-lg font-bold text-black">Kebijakan Pengembalian</h1>
      </header>

      <main className="px-6 py-8 flex flex-col gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center">
            <RefreshCw size={24} />
          </div>
          <h2 className="text-xl font-bold text-black">Jaminan Kepuasan</h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            Kami ingin Anda puas dengan setiap pembelian di RWP Store. Jika terdapat masalah dengan produk yang Anda terima, kami siap membantu proses pengembalian.
          </p>
        </motion.div>

        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-bold text-black">1. Syarat Pengembalian</h3>
            <ul className="list-disc list-inside text-xs text-gray-500 leading-relaxed flex flex-col gap-1">
              <li>Produk cacat produksi atau rusak saat diterima.</li>
              <li>Produk yang diterima tidak sesuai dengan pesanan.</li>
              <li>Produk masih dalam kondisi baru dan segel belum dibuka.</li>
              <li>Klaim dilakukan maksimal 2x24 jam setelah produk diterima.</li>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-bold text-black">2. Bukti Video Unboxing</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Wajib menyertakan video unboxing tanpa terputus sebagai bukti utama untuk setiap klaim kerusakan atau kekurangan barang. Tanpa video unboxing, klaim tidak dapat kami proses.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-bold text-black">3. Proses Pengembalian Dana</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Pengembalian dana (refund) akan diproses dalam waktu 3-7 hari kerja setelah barang yang dikembalikan kami terima dan verifikasi. Dana akan dikembalikan melalui metode pembayaran yang sama atau transfer bank.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
