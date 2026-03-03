'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Mail, Phone, ShieldCheck, FileText, HelpCircle, Truck, RefreshCw } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-12 pb-32 px-6 border-t border-gray-100">
      <div className="flex flex-col gap-8">
        {/* Store Info */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-black">RWP Store</h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            Penyedia perangkat teknologi modern dan aksesoris berkualitas tinggi dengan layanan terbaik.
          </p>
          <div className="flex flex-col gap-3 mt-2">
            <div className="flex items-start gap-3 text-gray-600">
              <MapPin size={18} className="mt-0.5 flex-shrink-0" />
              <span className="text-xs font-medium">Kepung, Kediri, Jawa Timur</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Mail size={18} className="flex-shrink-0" />
              <span className="text-xs font-medium">wahyupratmarendi@gmail.com</span>
            </div>
          </div>
        </div>

        {/* Compliance Links */}
        <div className="grid grid-cols-2 gap-y-6 gap-x-4">
          <div className="flex flex-col gap-4">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Informasi</h3>
            <nav className="flex flex-col gap-3">
              <Link href="/about" className="text-xs font-bold text-gray-600 hover:text-black transition-colors flex items-center gap-2">
                <HelpCircle size={14} />
                Tentang Kami
              </Link>
              <Link href="/contact" className="text-xs font-bold text-gray-600 hover:text-black transition-colors flex items-center gap-2">
                <Phone size={14} />
                Hubungi Kami
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Kebijakan</h3>
            <nav className="flex flex-col gap-3">
              <Link href="/privacy" className="text-xs font-bold text-gray-600 hover:text-black transition-colors flex items-center gap-2">
                <ShieldCheck size={14} />
                Privasi
              </Link>
              <Link href="/terms" className="text-xs font-bold text-gray-600 hover:text-black transition-colors flex items-center gap-2">
                <FileText size={14} />
                Syarat & Ketentuan
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Layanan</h3>
            <nav className="flex flex-col gap-3">
              <Link href="/shipping" className="text-xs font-bold text-gray-600 hover:text-black transition-colors flex items-center gap-2">
                <Truck size={14} />
                Pengiriman
              </Link>
              <Link href="/refund" className="text-xs font-bold text-gray-600 hover:text-black transition-colors flex items-center gap-2">
                <RefreshCw size={14} />
                Pengembalian
              </Link>
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-200 flex flex-col items-center gap-4">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
            © 2026 RWP Store. All Rights Reserved.
          </p>
          <div className="flex gap-4 grayscale opacity-50">
            {/* Payment Icons Placeholder */}
            <div className="text-[8px] font-black border border-gray-300 px-2 py-1 rounded uppercase">Visa</div>
            <div className="text-[8px] font-black border border-gray-300 px-2 py-1 rounded uppercase">Mastercard</div>
            <div className="text-[8px] font-black border border-gray-300 px-2 py-1 rounded uppercase">Duitku</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
