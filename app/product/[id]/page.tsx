'use client';

import React, { useEffect, useState, use } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  Heart, 
  Share2, 
  Star, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  Loader2,
  CheckCircle2,
  ArrowRight,
  Zap
} from 'lucide-react';
import { fetchProductByGroupId, Product, Variant } from '@/lib/data';
import { useCart } from '@/hooks/use-cart';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { addItem, toggleCart, items } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const loadProduct = async () => {
      const data = await fetchProductByGroupId(id);
      if (data) {
        setProduct(data);
        // Set initial selections
        const firstVariant = data.variants[0];
        setSelectedColor(firstVariant.color);
        setSelectedSize(firstVariant.size);
      }
      setLoading(false);
    };
    loadProduct();
  }, [id]);

  // Derive current variant
  const currentVariant = product?.variants.find(
    v => v.color === selectedColor && v.size === selectedSize
  ) || product?.variants[0] || null;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  if (!product || !currentVariant) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 gap-4 bg-background">
        <p className="text-gray-500 font-medium">Product not found</p>
        <Link href="/" className="px-8 py-3 premium-gradient text-white rounded-xl text-sm font-bold uppercase tracking-widest">
          Go Home
        </Link>
      </div>
    );
  }

  const allImages = [currentVariant.image, ...currentVariant.additional_images].filter(Boolean);
  const colors = Array.from(new Set(product.variants.map(v => v.color)));
  const sizes = Array.from(new Set(product.variants.filter(v => v.color === selectedColor).map(v => v.size)));

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Mobile Header Actions */}
      <div className="md:hidden fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center pointer-events-none">
        <button 
          onClick={() => router.back()}
          className="p-3 rounded-2xl glass text-white shadow-sm pointer-events-auto"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex gap-3 pointer-events-auto">
          <button 
            onClick={toggleCart}
            className="p-3 rounded-2xl glass text-white shadow-sm relative"
          >
            <ShoppingBag size={20} />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 premium-gradient text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-background">
                {items.length}
              </span>
            )}
          </button>
        </div>
      </div>

      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Image Gallery */}
          <section className="flex flex-col gap-6">
            <div className="relative aspect-square w-full rounded-[2.5rem] overflow-hidden bg-secondary/30 border border-white/5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${currentVariant.id}-${activeImageIndex}`}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={allImages[activeImageIndex]}
                    alt={product.title}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
              
              {/* Badges */}
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                <div className="px-4 py-1.5 rounded-full glass text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20 flex items-center gap-2">
                  <Zap size={12} fill="currentColor" /> Flash Sale
                </div>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {allImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImageIndex(i)}
                  className={`relative w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    activeImageIndex === i ? 'border-primary' : 'border-white/5 opacity-50 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`Thumb ${i}`} fill className="object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </section>

          {/* Right: Product Info */}
          <section className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-lg bg-secondary text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] border border-white/5">
                  {product.brand}
                </span>
                <span className="text-gray-600">•</span>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 ml-auto">
                  <div className="flex items-center text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} fill={i < 4 ? "currentColor" : "none"} />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-white ml-1">4.9 (1.2k Reviews)</span>
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tighter">
                {product.title}
              </h1>

              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <span className="text-3xl md:text-4xl font-black text-primary">
                    Rp{currentVariant.sale_price ? currentVariant.sale_price.toLocaleString() : currentVariant.price.toLocaleString()}
                  </span>
                  {currentVariant.sale_price && currentVariant.sale_price < currentVariant.price && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 line-through">
                        Rp{currentVariant.price.toLocaleString()}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-500 uppercase">
                        Save Rp{(currentVariant.price - currentVariant.sale_price).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="h-px bg-white/5" />

            {/* Selections */}
            <div className="flex flex-col gap-8">
              {/* Color Selection */}
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">Select Color</h3>
                  <span className="text-xs text-white font-bold">{selectedColor}</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => {
                        setSelectedColor(color);
                        setActiveImageIndex(0);
                      }}
                      className={`px-6 py-3 rounded-2xl text-xs font-bold transition-all border ${
                        selectedColor === color
                          ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                          : 'bg-secondary/50 text-gray-400 border-white/5 hover:border-white/20'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">Select Variant</h3>
                  <span className="text-xs text-white font-bold">{selectedSize}</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSize(size);
                        setActiveImageIndex(0);
                      }}
                      className={`px-6 py-3 rounded-2xl text-xs font-bold transition-all border ${
                        selectedSize === size
                          ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                          : 'bg-secondary/50 text-gray-400 border-white/5 hover:border-white/20'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button 
                onClick={() => addItem(product, currentVariant)}
                className="flex-1 flex items-center justify-center gap-3 py-5 rounded-2xl premium-gradient text-white font-black text-sm uppercase tracking-widest hover:shadow-2xl hover:shadow-primary/40 transition-all group"
              >
                <ShoppingBag size={20} />
                Add to Cart
              </button>
              <button className="p-5 rounded-2xl bg-secondary border border-white/5 text-white hover:bg-white/10 transition-all">
                <Heart size={20} />
              </button>
              <button className="p-5 rounded-2xl bg-secondary border border-white/5 text-white hover:bg-white/10 transition-all">
                <Share2 size={20} />
              </button>
            </div>

            {/* Features & Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="p-6 rounded-3xl bg-secondary/30 border border-white/5 flex flex-col gap-4">
                <div className="flex items-center gap-3 text-primary">
                  <Truck size={20} />
                  <h4 className="text-xs font-black uppercase tracking-widest text-white">Shipping Info</h4>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Free express shipping on all orders over Rp10.000.000. Estimated delivery: 2-3 business days.
                </p>
              </div>
              <div className="p-6 rounded-3xl bg-secondary/30 border border-white/5 flex flex-col gap-4">
                <div className="flex items-center gap-3 text-primary">
                  <ShieldCheck size={20} />
                  <h4 className="text-xs font-black uppercase tracking-widest text-white">Authenticity</h4>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  100% genuine products with official manufacturer warranty. Secure checkout with end-to-end encryption.
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-4 mt-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">Product Overview</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {product.description}
              </p>
              <ul className="grid grid-cols-1 gap-3 mt-2">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs text-gray-500">
                    <CheckCircle2 size={14} className="text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
