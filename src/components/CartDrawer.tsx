import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, q: number) => void;
  onRemove: (id: string) => void;
  total: number;
  onCheckout: () => void;
}

export default function CartDrawer({ isOpen, onClose, items, onUpdateQuantity, onRemove, total, onCheckout }: CartDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 z-[70] w-full max-w-md bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                  <ShoppingBag size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-gray-900 leading-none">Your Cart</h2>
                  <p className="text-xs text-gray-500 mt-1">{items.length} items to checkout</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-900"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag size={40} className="text-gray-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Cart is empty</h3>
                  <p className="text-gray-500 max-w-[200px]">Looks like you haven't added anything yet.</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <h4 className="text-sm font-bold text-gray-900 line-clamp-1 leading-tight">{item.name}</h4>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mb-3">{item.unit}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:text-green-600 transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:text-green-600 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="font-black text-gray-900">₹{item.price * item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {items.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Subtotal</span>
                    <span>₹{total}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Delivery Fee</span>
                    <span className="text-green-600 font-medium">FREE</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-lg font-black text-gray-900">Total</span>
                    <span className="text-lg font-black text-green-600">₹{total}</span>
                  </div>
                </div>
                <button 
                  onClick={onCheckout}
                  className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-black rounded-2xl shadow-xl shadow-green-900/10 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  Proceed to Checkout
                  <Plus size={20} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
