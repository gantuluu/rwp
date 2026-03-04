'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Mail, Phone, ShieldCheck, FileText, HelpCircle, Truck, RefreshCw, Facebook, Instagram, Twitter, Youtube, ShoppingCart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary/30 pt-20 pb-32 md:pb-12 px-4 md:px-6 border-t border-white/5">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Store Info */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-12 h-12">
                <Image 
                  src="https://uploads.onecompiler.io/43ruvewfy/44fbppx27/generated-image%20(2).png" 
                  alt="RWP Store Logo" 
                  fill 
                  className="object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white uppercase">
                RWP<span className="text-primary">STORE</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              Penyedia perangkat teknologi modern dan aksesoris berkualitas tinggi dengan layanan terbaik. Kami menghadirkan inovasi terbaru langsung ke tangan Anda.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="p-2 rounded-lg bg-secondary hover:bg-primary transition-all text-gray-400 hover:text-white">
                <Instagram size={18} />
              </Link>
              <Link href="#" className="p-2 rounded-lg bg-secondary hover:bg-primary transition-all text-gray-400 hover:text-white">
                <Facebook size={18} />
              </Link>
              <Link href="#" className="p-2 rounded-lg bg-secondary hover:bg-primary transition-all text-gray-400 hover:text-white">
                <Twitter size={18} />
              </Link>
              <Link href="#" className="p-2 rounded-lg bg-secondary hover:bg-primary transition-all text-gray-400 hover:text-white">
                <Youtube size={18} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white">Customer Service</h3>
            <nav className="flex flex-col gap-4">
              <Link href="/help" className="text-sm text-gray-500 hover:text-primary transition-colors">Help Centre</Link>
              <Link href="/shipping" className="text-sm text-gray-500 hover:text-primary transition-colors">Shipping Info</Link>
              <Link href="/refund" className="text-sm text-gray-500 hover:text-primary transition-colors">Return & Refund</Link>
              <Link href="/contact" className="text-sm text-gray-500 hover:text-primary transition-colors">Contact Us</Link>
              <Link href="/warranty" className="text-sm text-gray-500 hover:text-primary transition-colors">Warranty Policy</Link>
            </nav>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-6">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white">About RWP Store</h3>
            <nav className="flex flex-col gap-4">
              <Link href="/about" className="text-sm text-gray-500 hover:text-primary transition-colors">About Us</Link>
              <Link href="/careers" className="text-sm text-gray-500 hover:text-primary transition-colors">Careers</Link>
              <Link href="/privacy" className="text-sm text-gray-500 hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-sm text-gray-500 hover:text-primary transition-colors">Terms & Conditions</Link>
              <Link href="/seller" className="text-sm text-gray-500 hover:text-primary transition-colors">Seller Centre</Link>
            </nav>
          </div>

          {/* Contact & Payment */}
          <div className="flex flex-col gap-6">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white">Contact Us</h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3 text-gray-500">
                <MapPin size={18} className="mt-0.5 flex-shrink-0 text-primary" />
                <span className="text-sm">Kepung, Kediri, Jawa Timur, Indonesia 64293</span>
              </div>
              <div className="flex items-center gap-3 text-gray-500">
                <Mail size={18} className="flex-shrink-0 text-primary" />
                <span className="text-sm">support@rwpratama.store</span>
              </div>
              <div className="flex items-center gap-3 text-gray-500">
                <Phone size={18} className="flex-shrink-0 text-primary" />
                <span className="text-sm">+62 812-3456-7890</span>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-4">Secure Payment</h3>
              <div className="flex flex-wrap gap-2">
                {['Visa', 'Mastercard', 'Xendit', 'QRIS', 'DANA', 'OVO'].map((p) => (
                  <div key={p} className="px-3 py-1 rounded bg-secondary border border-white/5 text-[8px] font-black text-gray-400 uppercase tracking-widest">
                    {p}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em]">
            © 2026 RWP Store. Premium Tech Experience.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-[10px] font-bold text-gray-600 hover:text-white transition-colors uppercase tracking-widest">Privacy</Link>
            <Link href="/terms" className="text-[10px] font-bold text-gray-600 hover:text-white transition-colors uppercase tracking-widest">Terms</Link>
            <Link href="/cookies" className="text-[10px] font-bold text-gray-600 hover:text-white transition-colors uppercase tracking-widest">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
