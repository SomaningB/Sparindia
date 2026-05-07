export default function Footer() {
  return (
    <footer id="footer" className="bg-gray-900 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                IM
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                Indian<span className="text-green-500">Market</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your trusted partner for fresh groceries and daily essentials in Mumbai. Delivering quality and freshness since 2024.
            </p>
            <div className="flex gap-4">
              {['FB', 'TW', 'IG', 'LI'].map((social) => (
                <div key={social} className="w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center text-[10px] font-bold text-gray-400 hover:border-green-500 hover:text-green-500 cursor-pointer transition-all">
                  {social}
                </div>
              ))}
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase text-xs tracking-widest text-green-500">Quick Links</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-green-500 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Our Partner Stores</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Contact Support</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Join as Rider</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase text-xs tracking-widest text-green-500">Top Categories</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-green-500 transition-colors">Fruits & Vegetables</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Dairy & Bakery</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Personal Care</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Household Supplies</a></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase text-xs tracking-widest text-green-500">Policies</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-green-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs text-center sm:text-left">
            © 2026 IndianMarket Private Limited. All rights reserved.
          </p>
          <div className="flex gap-4">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/Google_Play_Store_badge_EN.svg" alt="Play Store" className="h-8 grayscale hover:grayscale-0 transition-all cursor-pointer" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-8 grayscale hover:grayscale-0 transition-all cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
}
