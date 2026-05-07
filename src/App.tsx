/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import CategorySection from './components/CategorySection';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ProductDetailModal from './components/ProductDetailModal';
import { useCart } from './hooks/useCart';
import { Product } from './types';
import { PRODUCTS } from './data/mockData';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, X, User, MapPin, SearchX, ArrowRight } from 'lucide-react';

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [location, setLocation] = useState('Mumbai - 400001');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('All');
  const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false);
  
  const { 
    items, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    total, 
    itemCount 
  } = useCart();

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesTab = activeTab === 'All' || 
                        (activeTab === 'Essential' && !product.isOffer) ||
                        (activeTab === 'Offers' && product.isOffer);
      
      return matchesSearch && matchesCategory && matchesTab;
    });
  }, [searchQuery, selectedCategory, activeTab]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const handleAddToCartWithQuantity = (product: Product, quantity: number) => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setShowCheckoutSuccess(true);
    clearCart();
    setTimeout(() => setShowCheckoutSuccess(false), 5000);
  };

  const handleSidebarNav = (action: string) => {
    setIsSidebarOpen(false);
    if (action === 'Home') {
      setSelectedCategory(null);
      setActiveTab('All');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (action === 'Offers') {
      setActiveTab('Offers');
      document.getElementById('popular-products')?.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'Categories') {
      document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-green-100 selection:text-green-900">
      <NavBar 
        itemCount={itemCount} 
        onCartClick={() => setIsCartOpen(true)} 
        onToggleSidebar={() => setIsSidebarOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onOpenLocation={() => setIsLocationModalOpen(true)}
        onOffersClick={() => {
          setActiveTab('Offers');
          document.getElementById('popular-products')?.scrollIntoView({ behavior: 'smooth' });
        }}
        location={location}
      />
      
      <main>
        <Hero onShopNow={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })} />
        
        <CategorySection 
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat === selectedCategory ? null : cat);
            document.getElementById('popular-products')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        <ProductGrid 
          products={filteredProducts}
          onAddToCart={handleAddToCart} 
          onViewDetails={setDetailProduct}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        
        {/* Newsletter/CTA Section */}
        <section className="py-16 bg-green-600 overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="max-w-xl text-center lg:text-left">
                <h2 className="text-3xl sm:text-5xl font-black text-white mb-6 leading-tight">
                  Join IndianMarket for early deals & extra discounts
                </h2>
                <p className="text-green-100 text-lg mb-8">
                  Subscribe to our newsletter and get ₹100 off on your first order of ₹500 or more.
                </p>
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert('Subscribed successfully!');
                  }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <input 
                    type="email" 
                    required
                    placeholder="Enter your email address" 
                    className="flex-1 px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-green-200 outline-none focus:bg-white/20 transition-all font-medium"
                  />
                  <button type="submit" className="px-8 py-4 bg-white text-green-600 font-black rounded-2xl hover:bg-green-50 transition-colors shadow-xl shadow-green-900/20">
                    Subscribe
                  </button>
                </form>
              </div>
              <div className="relative">
                <div className="w-64 h-64 sm:w-80 sm:h-80 bg-green-500/30 rounded-full blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                <img 
                  src="https://images.unsplash.com/photo-1601599561213-832382fd07ba?auto=format&fit=crop&q=80&w=600" 
                  alt="Subscription" 
                  className="relative z-10 w-full max-w-sm rounded-[2.5rem] shadow-2xl rotate-3"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Login Modal */}
      <AnimatePresence>
        {isLoginModalOpen && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLoginModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-8 overflow-hidden"
            >
              <button 
                onClick={() => setIsLoginModalOpen(false)}
                className="absolute top-6 right-6 p-2 text-gray-300 hover:text-gray-900 transition-colors"
              >
                <X size={24} />
              </button>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mx-auto mb-4">
                  <User size={32} />
                </div>
                <h2 className="text-2xl font-black text-gray-900">Welcome Back</h2>
                <p className="text-gray-500">Log in to your IndianMarket account</p>
              </div>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">Phone Number</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">+91</span>
                    <input type="tel" className="w-full pl-14 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-green-500 outline-none transition-all font-bold" placeholder="98765 43210" />
                  </div>
                </div>
                <button className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-black rounded-2xl shadow-xl shadow-green-900/10 transition-all active:scale-95">
                  Get OTP
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Location Modal */}
      <AnimatePresence>
        {isLocationModalOpen && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLocationModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl p-8"
            >
              <button 
                onClick={() => setIsLocationModalOpen(false)}
                className="absolute top-6 right-6 p-2 text-gray-300 hover:text-gray-900 transition-colors"
              >
                <X size={24} />
              </button>
              <h2 className="text-2xl font-black text-gray-900 mb-6">Select Delivery Location</h2>
              <div className="space-y-3">
                {['Mumbai - 400001', 'Delhi - 110001', 'Bangalore - 560001', 'Hyderabad - 500001', 'Chennai - 600001'].map((city) => (
                  <button
                    key={city}
                    onClick={() => {
                      setLocation(city);
                      setIsLocationModalOpen(false);
                    }}
                    className={`w-full text-left px-6 py-4 rounded-2xl border transition-all flex items-center justify-between group ${location === city ? 'bg-green-50 border-green-200' : 'bg-white border-gray-100 hover:border-green-200'}`}
                  >
                    <div className="flex items-center gap-3">
                      <MapPin size={20} className={location === city ? 'text-green-600' : 'text-gray-400'} />
                      <span className={`font-bold ${location === city ? 'text-green-900' : 'text-gray-700'}`}>{city}</span>
                    </div>
                    {location === city && <div className="w-2 h-2 bg-green-600 rounded-full" />}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={items}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        total={total}
        onCheckout={handleCheckout}
      />

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="fixed left-0 top-0 bottom-0 z-[110] w-72 bg-white p-6 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold">IM</div>
                  <span className="font-bold">IndianMarket</span>
                </div>
                <button onClick={() => setIsSidebarOpen(false)} className="p-2 bg-gray-50 rounded-lg">
                  <X size={20} />
                </button>
              </div>
              <div className="flex flex-col gap-4">
                {['Home', 'Categories', 'My Orders', 'Offers', 'Help Center'].map(item => (
                  <button 
                    key={item} 
                    onClick={() => handleSidebarNav(item)}
                    className="text-left py-3 px-4 rounded-xl hover:bg-gray-50 font-bold transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <ProductDetailModal 
        product={detailProduct}
        onClose={() => setDetailProduct(null)}
        onAddToCart={handleAddToCartWithQuantity}
      />

      {/* Checkout Success Notification */}
      <AnimatePresence>
        {showCheckoutSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] bg-white border border-green-100 p-4 rounded-2xl shadow-2xl flex items-center gap-4 min-w-[320px]"
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="font-bold text-gray-900">Order Placed!</p>
              <p className="text-xs text-gray-500">Your groceries are on the way.</p>
            </div>
            <button onClick={() => setShowCheckoutSuccess(false)} className="ml-auto p-2 text-gray-300 hover:text-gray-900">
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
