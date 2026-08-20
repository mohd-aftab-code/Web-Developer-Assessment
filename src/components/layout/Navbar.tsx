"use client";

import Link from "next/link";
import { useCart } from "@/providers/CartProvider";
import { ShoppingCart, Search, Menu, User } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { cartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tighter">
          SLEKCO<span className="text-blue-600">.</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/products" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
            All Products
          </Link>
          <Link href="/products?category=electronics" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
            Electronics
          </Link>
          <Link href="/products?category=fashion" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
            Fashion
          </Link>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-600 hover:text-black transition-colors hidden sm:block">
            <Search className="w-5 h-5" />
          </button>
          
          <Link href="/cart" className="relative p-2 text-gray-600 hover:text-black transition-colors">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-blue-600 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          <Link href="/register" className="p-2 text-gray-600 hover:text-black transition-colors hidden sm:block">
            <User className="w-5 h-5" />
          </Link>

          <button 
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white py-4 px-4 space-y-4">
          <Link href="/products" className="block text-sm font-medium text-gray-600" onClick={() => setIsMenuOpen(false)}>
            All Products
          </Link>
          <Link href="/products?category=electronics" className="block text-sm font-medium text-gray-600" onClick={() => setIsMenuOpen(false)}>
            Electronics
          </Link>
          <Link href="/products?category=fashion" className="block text-sm font-medium text-gray-600" onClick={() => setIsMenuOpen(false)}>
            Fashion
          </Link>
          <Link href="/register" className="block text-sm font-medium text-gray-600" onClick={() => setIsMenuOpen(false)}>
            Register / Login
          </Link>
        </div>
      )}
    </nav>
  );
}
