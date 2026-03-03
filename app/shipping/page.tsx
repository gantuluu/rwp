'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Truck } from 'lucide-react';
import Link from 'next/link';

export default function ShippingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="px-6 py-6 flex items-center gap-4 border-b border-gray-50">
        <Link href="/" className="p-2 rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors">
          <ChevronLeft size={20} />
        </Link>
        <h1 className="text-lg font-bold text-black">Kebijakan Pengiriman</h1>
      </header>

      <main className="px-6 py-8 flex flex-col gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center">
            <Truck size={24} />
          </div>
          <h2 className="text-xl font-bold text-black">Pengiriman Cepat & Aman</h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            Kami bekerja sama dengan mitra logistik terpercaya untuk memastikan pesanan Anda sampai dengan selamat di tujuan.
          </p>
        </motion.div>

        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-bold text-black">1. Waktu Pemrosesan</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Pesanan yang masuk sebelum pukul 15:00 WIB akan diproses dan dikirim pada hari yang sama. Pesanan setelah jam tersebut akan dikirim pada hari kerja berikutnya.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-bold text-black">2. Estimasi Pengiriman</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Estimasi waktu pengiriman tergantung pada lokasi Anda dan layanan kurir yang dipilih (Reguler, Kilat, atau Kargo). Biasanya berkisar antara 2-5 hari kerja untuk wilayah Indonesia.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-bold text-black">3. Biaya Pengiriman</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Biaya pengiriman dihitung secara otomatis berdasarkan berat produk dan alamat tujuan Anda. Anda dapat melihat total biaya pengiriman pada halaman checkout sebelum melakukan pembayaran.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-bold text-black">4. Pelacakan Pesanan</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Nomor resi pengiriman akan kami informasikan melalui email atau dapat Anda lihat pada menu profil pesanan Anda setelah barang dikirim.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
