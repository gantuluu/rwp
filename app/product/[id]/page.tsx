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
  Loader2 
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
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin text-black" size={32} />
      </div>
    );
  }

  if (!product || !currentVariant) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 gap-4">
        <p className="text-gray-500 font-medium">Product not found</p>
        <Link href="/" className="px-6 py-2 bg-black text-white rounded-xl text-sm font-bold">
          Go Home
        </Link>
      </div>
    );
  }

  const allImages = [currentVariant.image, ...currentVariant.additional_images].filter(Boolean);
  const colors = Array.from(new Set(product.variants.map(v => v.color)));
  const sizes = Array.from(new Set(product.variants.filter(v => v.color === selectedColor).map(v => v.size)));

  return (
    <div className="flex flex-col pb-32">
      {/* Header Actions */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[500px] z-50 px-6 py-6 flex justify-between items-center pointer-events-none">
        <button 
          onClick={() => router.back()}
          className="p-3 rounded-2xl bg-white/80 backdrop-blur-md text-gray-900 shadow-sm pointer-events-auto hover:bg-white transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex gap-3 pointer-events-auto">
          <button 
            onClick={toggleCart}
            className="p-3 rounded-2xl bg-white/80 backdrop-blur-md text-gray-900 shadow-sm hover:bg-white transition-colors relative"
          >
            <ShoppingBag size={20} />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                {items.length}
              </span>
            )}
          </button>
          <button className="p-3 rounded-2xl bg-white/80 backdrop-blur-md text-gray-900 shadow-sm hover:bg-white transition-colors">
            <Share2 size={20} />
          </button>
        </div>
      </div>

      {/* Image Gallery */}
      <section className="relative aspect-[4/5] w-full bg-gray-50 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentVariant.id}-${activeImageIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
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

        {/* Image Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {allImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveImageIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeImageIndex === i ? 'w-8 bg-black' : 'w-1.5 bg-black/20'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Product Info */}
      <section className="px-6 pt-8 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
              {product.brand} • {product.category}
            </span>
            <div className="flex items-center gap-1 px-2 py-1 bg-yellow-50 text-yellow-600 rounded-lg">
              <Star size={12} fill="currentColor" />
              <span className="text-[10px] font-bold">4.8</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">
            {product.title}
          </h1>
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-bold text-black">
              Rp{currentVariant.sale_price ? currentVariant.sale_price.toLocaleString() : currentVariant.price.toLocaleString()}
            </span>
            {currentVariant.sale_price && currentVariant.sale_price < currentVariant.price && (
              <span className="text-sm text-gray-400 line-through">
                Rp{currentVariant.price.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Color Selection */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Color</h3>
          <div className="flex flex-wrap gap-3">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => {
                  setSelectedColor(color);
                  setActiveImageIndex(0);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  selectedColor === color
                    ? 'bg-black text-white border-black shadow-lg shadow-black/10'
                    : 'bg-white text-gray-600 border-gray-100 hover:border-gray-300'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* Size Selection */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Storage / Size</h3>
          <div className="flex flex-wrap gap-3">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => {
                  setSelectedSize(size);
                  setActiveImageIndex(0);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  selectedSize === size
                    ? 'bg-black text-white border-black shadow-lg shadow-black/10'
                    : 'bg-white text-gray-600 border-gray-100 hover:border-gray-300'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-3 mt-2">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Description</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Features */}
        {product.features.length > 0 && (
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Key Features</h3>
            <ul className="grid grid-cols-1 gap-2">
              {product.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-black/20" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Trust Badges */}
        <div className="grid grid-cols-2 gap-4 mt-4 p-4 rounded-3xl bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white text-black">
              <Truck size={16} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-gray-900">Free Shipping</span>
              <span className="text-[8px] text-gray-400">On orders over Rp10jt</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white text-black">
              <ShieldCheck size={16} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-gray-900">Official Warranty</span>
              <span className="text-[8px] text-gray-400">1 Year Apple Indonesia</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Bottom Action */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[500px] bg-white/80 backdrop-blur-md border-t border-gray-100 px-6 py-6 z-50">
        <div className="flex gap-4">
          <div className="flex flex-col justify-center">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Price</span>
            <span className="text-lg font-bold text-black">
              Rp{currentVariant.sale_price ? currentVariant.sale_price.toLocaleString() : currentVariant.price.toLocaleString()}
            </span>
          </div>
          <button 
            onClick={() => addItem(product, currentVariant)}
            className="flex-1 flex items-center justify-center gap-3 bg-black text-white rounded-2xl font-bold text-sm hover:bg-gray-800 transition-colors shadow-xl shadow-black/10"
          >
            <ShoppingBag size={20} />
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
}
