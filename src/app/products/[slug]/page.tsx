"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCart } from "@/providers/CartProvider";
import { ShoppingCart, ArrowLeft, Check, Truck, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function ProductDetail() {
  const { slug } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${slug}`);
        if (!res.ok) {
          router.push('/products');
          return;
        }
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    if (slug) {
      fetchProduct();
    }
  }, [slug, router]);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 animate-pulse">
        <div className="h-4 w-24 bg-gray-200 rounded mb-8"></div>
        <div className="flex flex-col md:flex-row gap-12">
          <div className="w-full md:w-1/2 h-96 bg-gray-200 rounded-2xl"></div>
          <div className="w-full md:w-1/2 space-y-6">
            <div className="h-10 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="h-24 bg-gray-200 rounded w-full"></div>
            <div className="h-12 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/products" className="inline-flex items-center text-sm text-gray-500 hover:text-black mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Products
      </Link>
      
      <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
        {/* Product Image */}
        <div className="w-full md:w-1/2">
          <div className="aspect-square rounded-3xl overflow-hidden bg-gray-100 relative group">
            <img 
              src={product.images[0] || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="mb-2 text-sm font-medium text-blue-600 uppercase tracking-wider">
            {product.category?.name || "Category"}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            {product.name}
          </h1>
          <div className="text-3xl font-light text-gray-900 mb-8">
            ${product.price.toFixed(2)}
          </div>
          
          <div className="prose prose-gray mb-10">
            <p className="text-gray-600 leading-relaxed text-lg">{product.description}</p>
          </div>

          <div className="space-y-4 mb-10">
            <div className="flex items-center text-gray-600">
              <Check className="w-5 h-5 mr-3 text-green-500" /> In stock ({product.stock} available)
            </div>
            <div className="flex items-center text-gray-600">
              <Truck className="w-5 h-5 mr-3 text-gray-400" /> Free shipping on orders over $100
            </div>
            <div className="flex items-center text-gray-600">
              <ShieldCheck className="w-5 h-5 mr-3 text-gray-400" /> 1 Year Warranty
            </div>
          </div>

          <div className="mt-auto pt-8 border-t border-gray-100 flex gap-4">
            <button 
              onClick={handleAddToCart}
              className={`flex-1 py-4 px-8 rounded-full font-semibold flex items-center justify-center transition-all duration-300 ${
                added ? 'bg-green-500 text-white' : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              {added ? (
                <>Added to Cart <Check className="ml-2 w-5 h-5" /></>
              ) : (
                <>Add to Cart <ShoppingCart className="ml-2 w-5 h-5" /></>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
