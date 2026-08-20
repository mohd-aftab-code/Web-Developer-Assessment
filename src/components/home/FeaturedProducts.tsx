"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/providers/CartProvider";
import { ShoppingCart } from "lucide-react";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data.filter((p: any) => p.featured));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="animate-pulse bg-gray-200 h-80 rounded-2xl"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <div key={product._id} className="group flex flex-col bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-2xl hover:border-transparent transition-all duration-500 overflow-hidden">
          <Link href={`/products/${product.slug}`} className="relative aspect-[4/5] overflow-hidden bg-gray-50">
            <img 
              src={product.images[0] || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
              alt={product.name}
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110 mix-blend-multiply"
            />
            {/* Quick Add overlay */}
            <div className="absolute inset-x-4 bottom-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <button 
                onClick={(e) => { e.preventDefault(); addToCart(product); }}
                className="w-full py-3 bg-black/90 backdrop-blur text-white font-medium rounded-2xl flex items-center justify-center gap-2 hover:bg-black transition-colors"
              >
                <ShoppingCart className="w-4 h-4" /> Quick Add
              </button>
            </div>
          </Link>
          <div className="p-6 flex flex-col flex-grow">
            <div className="flex justify-between items-start gap-4 mb-2">
              <Link href={`/products/${product.slug}`}>
                <h3 className="font-semibold text-lg text-gray-900 leading-tight line-clamp-2 hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
              </Link>
              <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
            </div>
            <p className="text-sm text-gray-500 mt-auto line-clamp-2">{product.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
