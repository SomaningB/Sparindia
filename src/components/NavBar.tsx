import { useState } from 'react';
import { Search, ShoppingCart, User, Menu, MapPin, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavBarProps {
  itemCount: number;
  onCartClick: () => void;
  onToggleSidebar: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenLogin: () => void;
  onOpenLocation: () => void;
  onOffersClick: () => void;
  location: string;
}

export default function NavBar({ 
  itemCount, 
  onCartClick, 
  onToggleSidebar, 
  searchQuery, 
  onSearchChange,
  onOpenLogin,
  onOpenLocation,
  onOffersClick,
  location
}: NavBarProps) {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  return (
    <nav id="navbar" className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo & Menu */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              id="menu-toggle"
              onClick={onToggleSidebar}
              className="p-2 lg:hidden text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>
            <div 
              id="logo" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-600 rounded-xl flex items-center justify-center text-white font-bold text-lg sm:text-xl group-hover:scale-105 transition-transform">
                IM
              </div>
              <span className="hidden lg:block text-lg sm:text-xl font-extrabold text-gray-900 tracking-tight">
                Indian<span className="text-green-600">Market</span>
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center flex-1 max-w-2xl px-8 gap-4">
            <button 
              onClick={onOpenLocation}
              className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors whitespace-nowrap min-w-[170px] border border-transparent hover:border-gray-200"
            >
              <MapPin size={16} className="text-green-600 shrink-0" />
              <div className="text-left overflow-hidden">
                <p className="text-[10px] uppercase font-bold text-gray-400 leading-none mb-1">Deliver to</p>
                <div className="flex items-center gap-1">
                  <span className="text-gray-900 font-bold truncate">{location}</span>
                  <ChevronDown size={14} className="text-gray-400" />
                </div>
              </div>
            </button>

            {/* Search Bar */}
            <div className="relative flex-1">
              <input
                id="search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search for groceries..."
                className="w-full h-11 pl-11 pr-4 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-green-500 transition-all outline-none"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-4">
            <button 
              onClick={onOffersClick}
              className="hidden xl:flex items-center gap-2 px-4 py-2 text-sm font-bold text-orange-600 hover:bg-orange-50 rounded-xl transition-all"
            >
              <div className="w-2 h-2 bg-orange-600 rounded-full animate-pulse" />
              Offers
            </button>

            <button 
              onClick={() => setIsMobileSearchOpen(true)}
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-full lg:hidden"
            >
              <Search size={22} />
            </button>

            <button 
              id="user-login" 
              onClick={onOpenLogin}
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all"
            >
              <User size={20} />
              Account
            </button>
            <button 
              id="cart-toggle"
              onClick={onCartClick}
              className="relative p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ShoppingCart size={24} />
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1 bg-green-600 text-white text-[10px] font-bold rounded-full border-2 border-white"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute inset-0 z-[60] bg-white px-4 flex items-center gap-3 lg:hidden"
          >
            <div className="relative flex-1">
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search IndianMarket..."
                className="w-full h-11 pl-11 pr-4 bg-gray-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>
            <button 
              onClick={() => {
                setIsMobileSearchOpen(false);
                onSearchChange('');
              }}
              className="p-2 text-gray-500 font-bold text-sm"
            >
              Cancel
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
