import { CATEGORIES } from '../data/mockData';
import { motion } from 'motion/react';

interface CategorySectionProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string) => void;
}

export default function CategorySection({ selectedCategory, onSelectCategory }: CategorySectionProps) {
  return (
    <section id="categories" className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">Shop by Category</h2>
            <p className="text-gray-500">Explore our wide range of fresh and quality products</p>
          </div>
          <button 
            onClick={() => onSelectCategory('')}
            className="text-green-600 font-bold hover:underline"
          >
            {selectedCategory ? 'Clear Filter' : 'View All'}
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {CATEGORIES.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              onClick={() => onSelectCategory(category)}
              className={`flex flex-col items-center group cursor-pointer transition-all ${selectedCategory === category ? 'scale-105' : 'opacity-70 hover:opacity-100'}`}
            >
              <div className={`w-full aspect-square rounded-2xl mb-3 flex items-center justify-center p-4 transition-colors border ${selectedCategory === category ? 'bg-green-600 border-green-600 text-white' : 'bg-gray-50 border-transparent group-hover:bg-green-50 group-hover:border-green-100'}`}>
                <span className="text-4xl">
                  {/* Mock icons using emojis for simplicity in this demo */}
                  {index === 0 && '🍎'}
                  {index === 1 && '🥛'}
                  {index === 2 && '🌾'}
                  {index === 3 && '🥤'}
                  {index === 4 && '🍪'}
                  {index === 5 && '🧼'}
                  {index === 6 && '🧴'}
                  {index === 7 && '🍜'}
                </span>
              </div>
              <span className={`text-xs sm:text-sm font-semibold text-center transition-colors ${selectedCategory === category ? 'text-green-600 font-bold' : 'text-gray-700 group-hover:text-green-600'}`}>{category}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
