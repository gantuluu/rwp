'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '@/lib/data';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const price = product.displayPrice;
  const salePrice = product.displaySalePrice;
  const discount = salePrice ? Math.round(((price - salePrice) / price) * 100) : 0;

  return (
    <Link href={`/product/${product.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="dark-card group relative rounded-2xl overflow-hidden flex flex-col h-full"
      >
        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-0 right-0 z-10 bg-primary text-white text-[10px] font-black px-2 py-1 rounded-bl-xl shadow-lg">
            -{discount}%
          </div>
        )}

        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-secondary/30">
          <Image
            src={product.displayImage}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          
          {/* Hover Actions */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            <button className="p-3 rounded-full glass text-white hover:bg-primary transition-colors">
              <Heart size={18} />
            </button>
            <button className="p-3 rounded-full glass text-white hover:bg-primary transition-colors">
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-3 md:p-4 flex flex-col flex-grow gap-2">
          <div className="flex items-center gap-1">
            <div className="flex items-center text-yellow-500">
              <Star size={10} fill="currentColor" />
              <span className="text-[10px] font-bold ml-1 text-white">4.9</span>
            </div>
            <span className="text-[10px] text-gray-500">|</span>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest">Sold 1.2k</span>
          </div>

          <h3 className="text-xs md:text-sm font-medium text-gray-200 line-clamp-2 group-hover:text-primary transition-colors">
            {product.title}
          </h3>

          <div className="mt-auto pt-2 flex flex-col">
            {salePrice && salePrice < price ? (
              <div className="flex items-baseline gap-2">
                <span className="text-sm md:text-base font-black text-primary">
                  Rp{salePrice.toLocaleString()}
                </span>
                <span className="text-[10px] text-gray-600 line-through">
                  Rp{price.toLocaleString()}
                </span>
              </div>
            ) : (
              <span className="text-sm md:text-base font-black text-white">
                Rp{price.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;
