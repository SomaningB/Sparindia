import { Product } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, ShieldCheck, Truck, Clock } from 'lucide-react';
import { useState } from 'react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function ProductDetailModal({ product, onClose, onAddToCart }: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[160] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-20 p-2 bg-white/80 backdrop-blur-md text-gray-900 rounded-full shadow-lg hover:bg-white transition-colors"
          >
            <X size={20} />
          </button>

          {/* Product Image */}
          <div className="w-full md:w-1/2 h-64 md:h-auto bg-gray-50 relative overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
            {product.isOffer && (
              <div className="absolute top-6 left-6 px-4 py-2 bg-red-500 text-white text-xs font-black rounded-xl uppercase tracking-widest shadow-lg">
                Save Big
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1 p-8 md:p-12 overflow-y-auto">
            <div className="mb-8">
              <span className="inline-block px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-widest rounded-lg mb-4">
                {product.category}
              </span>
              <h2 className="text-3xl font-black text-gray-900 mb-2 leading-tight">{product.name}</h2>
              <p className="text-gray-500 font-medium">{product.unit}</p>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex flex-col">
                <span className="text-3xl font-black text-gray-900">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through font-bold">₹{product.originalPrice}</span>
                )}
              </div>
              {product.originalPrice && (
                <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-black rounded-lg">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </div>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed mb-8">
              {product.description} Fresh from our trusted partners. We ensure the highest quality standards for every item delivered to your doorstep.
            </p>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              <div className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-2xl">
                <ShieldCheck size={20} className="text-green-600 mb-2" />
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Quality Check</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-2xl">
                <Clock size={20} className="text-green-600 mb-2" />
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">30 Min Delivery</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-2xl">
                <Truck size={20} className="text-green-600 mb-2" />
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Free Shipping</span>
              </div>
            </div>

            {/* Add to Cart Footer */}
            <div className="flex items-center gap-4 pt-8 border-t border-gray-100">
              <div className="flex items-center border-2 border-gray-100 rounded-2xl p-1 bg-gray-50">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:text-green-600 transition-colors"
                >
                  <Minus size={18} />
                </button>
                <span className="w-8 text-center font-black">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:text-green-600 transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
              <button 
                onClick={() => {
                  onAddToCart(product, quantity);
                  onClose();
                }}
                className="flex-1 py-4 bg-green-600 hover:bg-green-700 text-white font-black rounded-2xl shadow-xl shadow-green-900/10 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                Add to Cart
                <Plus size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
