'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, CreditCard, MapPin, User, Mail, Phone, Loader2, CheckCircle2, ShieldCheck, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const CheckoutPage = () => {
  const router = useRouter();
  const { items, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  useEffect(() => {
    if (items.length === 0) {
      router.push('/');
    }
  }, [items, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      const orderId = `ORDER-${Date.now()}`;
      const response = await fetch('/api/pay/init', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: subtotal,
          orderId,
          email: formData.email,
          customerName: formData.name,
          items: items,
        }),
      });

      const contentType = response.headers.get('content-type');
      let data;

      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.error('Server returned non-JSON response:', text);
        throw new Error('Server returned an unexpected response format. Please check server logs.');
      }

      if (data.success && data.invoiceUrl) {
        setPaymentUrl(data.invoiceUrl);
        window.location.assign(data.invoiceUrl);
      } else {
        const errorMsg = data.error || 'Failed to initialize payment';
        console.error('Payment Error Details:', data);
        alert(errorMsg);
        setLoading(false);
      }
    } catch (error: any) {
      console.error('Payment Error:', error);
      alert(error.message || 'An error occurred. Please try again.');
      setLoading(false);
    }
  };

  if (items.length === 0) return null;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-white/5 px-6 py-6">
        <div className="container mx-auto flex items-center gap-6">
          <button onClick={() => router.back()} className="p-3 rounded-2xl bg-secondary text-white hover:bg-white/10 transition-all border border-white/5">
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-black text-white tracking-tight uppercase">CHECKOUT</h1>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">COMPLETE YOUR PREMIUM ORDER</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-12">
        <form onSubmit={handlePayment} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Shipping Details */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            <section className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                  <MapPin size={20} />
                </div>
                <h2 className="text-lg font-black text-white uppercase tracking-tight">Shipping Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 rounded-[2rem] bg-secondary/30 border border-white/5">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      className="w-full pl-12 pr-4 py-4 bg-secondary/50 border border-white/5 rounded-2xl text-sm text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className="w-full pl-12 pr-4 py-4 bg-secondary/50 border border-white/5 rounded-2xl text-sm text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+62 812..."
                      className="w-full pl-12 pr-4 py-4 bg-secondary/50 border border-white/5 rounded-2xl text-sm text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Shipping Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 text-gray-600" size={18} />
                    <textarea
                      required
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter your full shipping address"
                      rows={4}
                      className="w-full pl-12 pr-4 py-4 bg-secondary/50 border border-white/5 rounded-2xl text-sm text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none resize-none"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                  <CreditCard size={20} />
                </div>
                <h2 className="text-lg font-black text-white uppercase tracking-tight">Payment Method</h2>
              </div>
              <div className="p-8 rounded-[2rem] bg-secondary/30 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                    <Image src="https://picsum.photos/seed/xendit/100/100" alt="Xendit" width={32} height={32} className="grayscale brightness-200" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Xendit Secure Gateway</h4>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Virtual Account, E-Wallet, QRIS</p>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                </div>
              </div>
            </section>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 flex flex-col gap-8">
              <section className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                    <ShoppingBag size={20} />
                  </div>
                  <h2 className="text-lg font-black text-white uppercase tracking-tight">Order Summary</h2>
                </div>
                
                <div className="p-8 rounded-[2rem] bg-secondary/30 border border-white/5 flex flex-col gap-6">
                  <div className="flex flex-col gap-6 max-h-[400px] overflow-y-auto no-scrollbar pr-2">
                    {items.map((item) => (
                      <div key={item.variantId} className="flex gap-4">
                        <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-secondary border border-white/5 flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-center gap-1">
                          <h3 className="text-xs font-bold text-white line-clamp-1">{item.title}</h3>
                          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                            {item.color} • {item.size} • x{item.quantity}
                          </p>
                          <span className="text-xs font-black text-primary">
                            Rp{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="h-px bg-white/5" />

                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Subtotal</span>
                      <span className="text-sm font-bold text-white">Rp{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Shipping</span>
                      <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">FREE</span>
                    </div>
                    <div className="h-px bg-white/5 my-2" />
                    <div className="flex justify-between items-end">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Total Amount</span>
                        <span className="text-3xl font-black text-white tracking-tighter">Rp{subtotal.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-4 py-5 rounded-[1.5rem] premium-gradient text-white text-sm font-black uppercase tracking-[0.2em] hover:shadow-2xl hover:shadow-primary/40 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        PROCESSING...
                      </>
                    ) : (
                      <>
                        PAY NOW
                        <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    <ShieldCheck size={14} className="text-emerald-500" />
                    SECURE SSL ENCRYPTED PAYMENT
                  </div>
                </div>
              </section>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CheckoutPage;
