'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, CreditCard, MapPin, User, Mail, Phone, Loader2, CheckCircle2 } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { useRouter } from 'next/navigation';

declare global {
  interface Window {
    checkout: {
      process: (reference: string, options: any) => void;
    };
  }
}

const paymentGroups = [
  {
    group: "Virtual Account",
    type: "virtual_account",
    methods: [
      { code: "B1", name: "BCA Virtual Account", bank: "BCA" },
      { code: "M2", name: "Mandiri Virtual Account", bank: "Mandiri" },
      { code: "BR", name: "BRI Virtual Account", bank: "BRI" },
      { code: "I1", name: "BNI Virtual Account", bank: "BNI" },
      { code: "BT", name: "Permata Virtual Account", bank: "Permata" },
      { code: "NC", name: "CIMB Niaga Virtual Account", bank: "CIMB Niaga" },
      { code: "BV", name: "Danamon Virtual Account", bank: "Danamon" },
      { code: "A1", name: "ATM Bersama", bank: "ATM Bersama" },
      { code: "FT", name: "Other Bank Transfer", bank: "Other Bank" }
    ]
  },
  {
    group: "E-Wallet",
    type: "ewallet",
    methods: [
      { code: "OV", name: "OVO" },
      { code: "SP", name: "ShopeePay" },
      { code: "SL", name: "ShopeePay Link" },
      { code: "DA", name: "DANA" },
      { code: "LA", name: "LinkAja" }
    ]
  },
  {
    group: "QRIS",
    type: "qris",
    methods: [
      { code: "QR", name: "QRIS (All Payment Apps)" }
    ]
  },
  {
    group: "Credit / Debit Card",
    type: "credit_card",
    methods: [
      { code: "VC", name: "Visa / Mastercard" },
      { code: "CC", name: "Credit Card (3D Secure)" },
      { code: "JCB", name: "JCB" },
      { code: "AMEX", name: "American Express" }
    ]
  },
  {
    group: "Retail Outlet",
    type: "retail",
    methods: [
      { code: "IR", name: "Indomaret" },
      { code: "AM", name: "Alfamart" }
    ]
  },
  {
    group: "Paylater / Installment",
    type: "paylater",
    methods: [
      { code: "PL", name: "Kredivo" },
      { code: "KK", name: "Kredivo Installment" },
      { code: "DN", name: "Akulaku" },
      { code: "AL", name: "Akulaku Installment" }
    ]
  },
  {
    group: "Direct Debit",
    type: "direct_debit",
    methods: [
      { code: "DB", name: "BRI Direct Debit" },
      { code: "DM", name: "Mandiri Direct Debit" },
      { code: "DY", name: "BCA OneKlik" }
    ]
  }
];

const CheckoutPage = () => {
  const router = useRouter();
  const { items, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState('VC');
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
      // eslint-disable-next-line react-hooks/purity
      const orderId = `ORDER-${Date.now()}`;
      const response = await fetch('/api/checkout/duitku', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: subtotal,
          orderId,
          productDetails: `Payment for ${items.length} items at MobiShop`,
          email: formData.email,
          customerName: formData.name,
          items: items,
          paymentMethod: selectedMethod,
        }),
      });

      const data = await response.json();
      console.log('Duitku API Response:', data);

      if (data.reference && typeof window.checkout !== 'undefined') {
        // Use Duitku Pop if script is loaded
        window.checkout.process(data.reference, {
          onSuccess: function (result: any) {
            console.log('Payment Success:', result);
            clearCart();
            router.push('/checkout/success');
          },
          onPending: function (result: any) {
            console.log('Payment Pending:', result);
            clearCart();
            router.push('/checkout/success?status=pending');
          },
          onError: function (result: any) {
            console.error('Payment Error:', result);
            alert('Payment failed. Please try again.');
            setLoading(false);
          },
          onCanceled: function (result: any) {
            console.log('Payment Canceled:', result);
            setLoading(false);
          },
        });
      } else if (data.paymentUrl) {
        // Fallback to Redirect if Pop script is not available
        setPaymentUrl(data.paymentUrl);
        window.location.assign(data.paymentUrl);
      } else {
        alert(data.error || 'Failed to initialize payment');
        setLoading(false);
      }
    } catch (error) {
      console.error('Payment Error:', error);
      alert('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  if (items.length === 0) return null;

  const duitkuScriptUrl = process.env.NEXT_PUBLIC_DUITKU_ENV === 'production' 
    ? 'https://passport.duitku.com/checkout/js/duitku.js' 
    : 'https://sandbox.duitku.com/2021/js/duitku.js';

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-32">
      <Script 
        src={duitkuScriptUrl}
        strategy="afterInteractive"
        onLoad={() => setScriptLoaded(true)}
      />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center gap-4">
        <Link href="/" className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
          <ChevronLeft size={20} />
        </Link>
        <h1 className="text-lg font-bold text-black">Checkout</h1>
      </header>

      <main className="px-6 py-8">
        <form onSubmit={handlePayment} className="flex flex-col gap-8">
          {/* Order Summary */}
          <section className="flex flex-col gap-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">Order Summary</h2>
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4">
              {items.map((item) => (
                <div key={item.variantId} className="flex gap-4">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-center gap-0.5">
                    <h3 className="text-xs font-bold text-black line-clamp-1">{item.title}</h3>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                      {item.color} • {item.size} • x{item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs font-bold text-black">
                      Rp{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
              <div className="h-px bg-gray-100 my-2" />
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-black">Total Amount</span>
                <span className="text-lg font-bold text-black">Rp{subtotal.toLocaleString()}</span>
              </div>
            </div>
          </section>

          {/* Shipping Details */}
          <section className="flex flex-col gap-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">Shipping Details</h2>
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-black transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-black transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <input
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="0812xxxx"
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-black transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Shipping Address</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 text-gray-300" size={18} />
                  <textarea
                    required
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your full address"
                    rows={3}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-black transition-all resize-none"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Payment Method */}
          <section className="flex flex-col gap-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">Payment Method</h2>
            <div className="flex flex-col gap-6">
              {paymentGroups.map((group) => (
                <div key={group.type} className="flex flex-col gap-3">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">{group.group}</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {group.methods.map((method) => (
                      <button
                        key={method.code}
                        type="button"
                        onClick={() => setSelectedMethod(method.code)}
                        className={`flex flex-col items-start gap-3 p-4 rounded-2xl border transition-all relative overflow-hidden ${
                          selectedMethod === method.code
                            ? 'bg-black border-black text-white shadow-lg shadow-black/10'
                            : 'bg-white border-gray-100 text-black hover:border-gray-300'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-[10px] ${
                          selectedMethod === method.code ? 'bg-white/20' : 'bg-gray-50'
                        }`}>
                          {'bank' in method ? method.bank : method.code}
                        </div>
                        <span className="text-[10px] font-bold leading-tight text-left">{method.name}</span>
                        {selectedMethod === method.code && (
                          <div className="absolute top-2 right-2">
                            <CheckCircle2 size={14} className="text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Payment Button */}
          <div className="flex flex-col gap-4 mt-4">
            {paymentUrl && (
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 flex flex-col gap-3">
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Pembayaran Siap</p>
                <p className="text-xs text-blue-500 leading-relaxed">
                  Jika Anda tidak diarahkan secara otomatis, silakan klik tombol di bawah untuk membuka halaman pembayaran.
                </p>
                <a 
                  href={paymentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-500 text-white text-xs font-bold hover:bg-blue-600 transition-colors"
                >
                  Buka Halaman Pembayaran
                </a>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-black text-white text-sm font-bold hover:bg-gray-800 transition-all shadow-xl shadow-black/10 disabled:bg-gray-400"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard size={20} />
                  Pay Rp{subtotal.toLocaleString()}
                </>
              )}
            </button>
          </div>
        </form>
      </main>

      {/* Trust Info */}
      <div className="px-6 py-4 flex items-center justify-center gap-2 text-[10px] text-gray-400 font-medium">
        <CheckCircle2 size={12} className="text-emerald-500" />
        Secure SSL Encrypted Payment
      </div>
    </div>
  );
};

export default CheckoutPage;
