"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/providers/CartProvider";
import { ShoppingCart, Filter } from "lucide-react";

function ProductList() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const searchParam = searchParams.get("search");

  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    // Fetch Categories for the sidebar
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = "/api/products";
        const params = new URLSearchParams();
        if (categoryParam) params.append("category", categoryParam);
        if (searchParam) params.append("search", searchParam);
        
        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        const res = await fetch(url);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryParam, searchParam]);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
          <div className="flex items-center gap-2 font-semibold text-lg border-b pb-4 mb-4">
            <Filter className="w-5 h-5" /> Filters
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/products" 
                    className={`block text-sm transition-colors ${!categoryParam ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-black'}`}
                  >
                    All Categories
                  </Link>
                </li>
                {categories.map((cat) => (
                  <li key={cat._id}>
                    <Link 
                      href={`/products?category=${cat.slug}`} 
                      className={`block text-sm transition-colors ${categoryParam === cat.slug ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-black'}`}
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </aside>

      {/* Product Grid */}
      <div className="flex-1">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {categoryParam 
              ? categories.find(c => c.slug === categoryParam)?.name || "Products" 
              : "All Products"}
          </h1>
          <p className="text-gray-500 mt-2">Showing {products.length} results</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse bg-gray-200 h-80 rounded-2xl"></div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-gray-100">
            <h3 className="text-xl font-medium text-gray-900">No products found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your filters or search terms.</p>
            <Link href="/products" className="mt-6 inline-block px-6 py-2 bg-black text-white rounded-full">
              Clear Filters
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        )}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Suspense fallback={<div className="text-center py-20">Loading products...</div>}>
        <ProductList />
      </Suspense>
    </div>
  );
}
