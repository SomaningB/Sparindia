import ProductCard from './ProductCard';
import { Product } from '../types';
import { SearchX } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductGrid({ products, activeTab, setActiveTab, onAddToCart }: ProductGridProps) {
  return (
    <section id="popular-products" className="py-12 sm:py-16 bg-gray-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
              {activeTab === 'Offers' ? 'Hot Offers' : activeTab === 'Essential' ? 'Daily Essentials' : 'Bestsellers'}
            </h2>
            <p className="text-gray-500">Popular items from your neighborhood stores</p>
          </div>
          <div className="flex gap-2 bg-white p-1 rounded-xl shadow-sm border border-gray-100">
            {['All', 'Essential', 'Offers'].map(tab => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === tab ? 'bg-green-600 text-white shadow-lg shadow-green-900/10' : 'text-gray-500 hover:text-green-600'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {products.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-gray-300 mb-4 shadow-sm">
              <SearchX size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500 mb-8">Try adjusting your filters or search keywords.</p>
            <button 
              onClick={() => setActiveTab('All')}
              className="px-8 py-3 bg-green-600 text-white font-bold rounded-xl"
            >
              Show All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={onAddToCart} 
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
