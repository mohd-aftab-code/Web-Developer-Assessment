import Link from "next/link";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import { ArrowRight, Truck, ShieldCheck, Clock, CreditCard } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Editorial Hero Section */}
      <section className="relative w-full h-[85vh] flex items-center bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between z-10 relative">
          <div className="w-full md:w-1/2 md:pr-12 text-center md:text-left mb-12 md:mb-0">
            <div className="inline-block px-4 py-1.5 rounded-full bg-black text-white text-xs font-bold tracking-widest uppercase mb-6">
              New Collection 2026
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-gray-900 leading-[0.9] tracking-tighter mb-6">
              DEFINE<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500">YOUR</span><br />
              STYLE.
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-md mx-auto md:mx-0 font-light leading-relaxed">
              Discover a curated collection of premium fashion, electronics, and lifestyle essentials crafted for the modern individual.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <Link 
                href="/products" 
                className="px-8 py-4 bg-black text-white font-semibold rounded-full hover:bg-blue-600 transition-all duration-300 flex items-center gap-2 group w-full sm:w-auto justify-center"
              >
                Shop Now <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/products?category=fashion" 
                className="px-8 py-4 bg-white border border-gray-200 text-black font-semibold rounded-full hover:bg-gray-50 transition-all duration-300 w-full sm:w-auto justify-center flex"
              >
                Explore Fashion
              </Link>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 relative h-[50vh] md:h-[70vh]">
            <div className="absolute inset-0 bg-gradient-to-tr from-gray-200 to-gray-50 rounded-[40px] transform rotate-3"></div>
            <img
              src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="Fashion Editorial"
              className="absolute inset-0 w-full h-full object-cover rounded-[40px] shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-700"
            />
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-black py-10 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <Truck className="w-8 h-8 text-white mb-3" />
              <h4 className="text-white font-semibold mb-1">Free Shipping</h4>
              <p className="text-gray-400 text-sm">On orders over $100</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <ShieldCheck className="w-8 h-8 text-white mb-3" />
              <h4 className="text-white font-semibold mb-1">Secure Checkout</h4>
              <p className="text-gray-400 text-sm">100% protected payments</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Clock className="w-8 h-8 text-white mb-3" />
              <h4 className="text-white font-semibold mb-1">24/7 Support</h4>
              <p className="text-gray-400 text-sm">Dedicated customer service</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <CreditCard className="w-8 h-8 text-white mb-3" />
              <h4 className="text-white font-semibold mb-1">Easy Returns</h4>
              <p className="text-gray-400 text-sm">30-day money-back guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Showcase - Masonry Style */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Shop by Category</h2>
              <p className="text-gray-500 mt-2 text-lg">Curated essentials for every aspect of your life.</p>
            </div>
            <Link href="/products" className="hidden md:flex items-center text-black font-semibold hover:text-blue-600 transition-colors group">
              View All <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[600px]">
            <Link href="/products?category=fashion" className="group relative rounded-3xl overflow-hidden md:col-span-2 md:row-span-2 h-80 md:h-full">
              <img 
                src="https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Fashion" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-3xl font-bold text-white mb-2">Fashion</h3>
                <span className="inline-flex items-center text-white/80 group-hover:text-white transition-colors">
                  Explore <ArrowRight className="w-4 h-4 ml-2" />
                </span>
              </div>
            </Link>
            
            <Link href="/products?category=electronics" className="group relative rounded-3xl overflow-hidden h-80 md:h-[288px]">
              <img 
                src="https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Electronics" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-2xl font-bold text-white mb-2">Electronics</h3>
              </div>
            </Link>

            <Link href="/products?category=home-living" className="group relative rounded-3xl overflow-hidden h-80 md:h-[288px]">
              <img 
                src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Home & Living" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-2xl font-bold text-white mb-2">Home & Living</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Trending Now</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">Discover the most sought-after pieces of the season, handpicked for you.</p>
          </div>
          <FeaturedProducts />
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/5 transform -skew-y-3"></div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Join the Slekco Club</h2>
          <p className="text-gray-500 mb-8 text-lg">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 w-full sm:w-96 text-lg"
              required
            />
            <button 
              type="button" 
              className="px-8 py-4 bg-black text-white font-semibold rounded-full hover:bg-blue-600 transition-colors whitespace-nowrap text-lg"
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
