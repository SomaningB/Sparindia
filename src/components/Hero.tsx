import { motion } from 'motion/react';
import { ArrowRight, ShoppingBag } from 'lucide-react';

interface HeroProps {
  onShopNow?: () => void;
}

export default function Hero({ onShopNow }: HeroProps) {
  return (
    <div id="hero" className="relative h-[400px] sm:h-[500px] flex items-center overflow-hidden bg-gray-900">
      {/* Background Image Wrapper */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200"
          alt="Fresh Groceries"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-green-600 text-white text-xs font-bold uppercase tracking-wider rounded-full mb-6">
              Harvest Festival 2026
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white leading-tight mb-6">
              Get Up to <span className="text-green-400">50% Off</span> on Monthly Essentials
            </h1>
            <p className="text-lg text-gray-200 mb-8 max-w-md">
              From farm-fresh vegetables to top-brand kitchen staples, get everything delivered at your doorstep in 30 minutes.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                id="shop-now-btn" 
                onClick={onShopNow}
                className="flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-green-900/20 group"
              >
                Shop Now
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md font-bold rounded-xl transition-all">
                Download App
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Badge (Visual Interest) */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-[10%] hidden xl:flex flex-col items-center justify-center w-32 h-32 bg-yellow-400 rounded-full shadow-2xl rotate-12 z-20"
      >
        <ShoppingBag size={32} className="text-gray-900 mb-1" />
        <span className="text-xs font-bold text-gray-900 uppercase">Flash Sales</span>
        <span className="text-xl font-black text-gray-900">Live</span>
      </motion.div>
    </div>
  );
}
