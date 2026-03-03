'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Heart, Plus } from 'lucide-react';
import { Product } from '@/lib/data';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const price = product.displayPrice;
  const salePrice = product.displaySalePrice;

  return (
    <Link href={`/product/${product.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
        className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100/50 shadow-sm hover:shadow-xl hover:shadow-black/5 transition-all duration-300 h-full flex flex-col"
      >
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <Image
            src={product.displayImage}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <button 
            onClick={(e) => {
              e.preventDefault();
              // Wishlist logic
            }}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-md text-gray-400 hover:text-red-500 transition-colors z-10"
          >
            <Heart size={18} />
          </button>
        </div>
        
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
              {product.category}
            </span>
            <div className="flex flex-col items-end">
              {salePrice && salePrice < price ? (
                <>
                  <span className="text-sm font-bold text-red-500">
                    Rp{salePrice.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-gray-400 line-through">
                    Rp{price.toLocaleString()}
                  </span>
                </>
              ) : (
                <span className="text-sm font-bold text-black">
                  Rp{price.toLocaleString()}
                </span>
              )}
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
            {product.title}
          </h3>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;
