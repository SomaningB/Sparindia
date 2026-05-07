import React from 'react';
import { Product } from '../types';
import { Plus, ShoppingCart } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductCardProps {
  key?: React.Key;
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart, onViewDetails }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 transition-all group flex flex-col h-full"
    >
      <div 
        className="relative aspect-square overflow-hidden bg-gray-50 cursor-pointer"
        onClick={() => onViewDetails(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.isOffer && (
          <div className="absolute top-3 left-3 px-2 py-1 bg-red-500 text-white text-[10px] font-bold rounded-lg uppercase shadow-sm">
            Special Offer
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex-1 cursor-pointer" onClick={() => onViewDetails(product)}>
          <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider mb-1 block">
            {product.category}
          </span>
          <h3 className="text-sm sm:text-base font-bold text-gray-900 line-clamp-1 mb-1 leading-tight group-hover:text-green-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 mb-3 line-clamp-1">
            {product.unit} • {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
          <div className="flex flex-col">
            <span className="text-lg font-black text-gray-900">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-[10px] text-gray-400 line-through">₹{product.originalPrice}</span>
            )}
          </div>
          <button
            onClick={() => onAddToCart(product)}
            className="p-2.5 bg-green-50 text-green-600 hover:bg-green-600 hover:text-white rounded-xl transition-all active:scale-95"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
